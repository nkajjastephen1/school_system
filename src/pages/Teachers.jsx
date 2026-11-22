import React, { useState } from 'react'
import { useSchool } from '../context/SchoolContext'
import { useToast } from '../components/Toast'
import Modal from '../components/Modal'
import DataTable from '../components/DataTable'
import { uid } from '../utils/formatters'

export default function Teachers() {
  const { data, update } = useSchool(); const toast = useToast()
  const [open,setOpen]=useState(false); const [editing,setEditing]=useState(null); const [form,setForm]=useState({}); const [search,setSearch]=useState('')
  const teachers = data.teachers.filter(t=>(t.fullName+t.staffId).toLowerCase().includes(search.toLowerCase()))
  const save = () => {
    if(!form.fullName){toast('Name required','error');return}
    update(d=>{
      if(editing) d.teachers=d.teachers.map(t=>t.id===editing.id?{...t,...form}:t)
      else d.teachers.push({id:uid(),staffId:'STF'+(100+d.teachers.length),...form})
      return {...d}
    }); toast('Saved'); setOpen(false); setEditing(null); setForm({})
  }
  const del = id => { if(!confirm('Delete?'))return; update(d=>({...d,teachers:d.teachers.filter(t=>t.id!==id)})); toast('Deleted') }
  const cols=[
    {key:'staffId',label:'Staff ID'},{key:'fullName',label:'Name'},{key:'gender',label:'Gender'},
    {key:'subject',label:'Subject'},{key:'classId',label:'Class',render:r=>data.classes.find(c=>c.id===r.classId)?.name},
    {key:'actions',label:'Actions',render:r=>(<div className="space-x-2"><button onClick={()=>{setEditing(r);setForm(r);setOpen(true)}} className="text-blue-600">Edit</button><button onClick={()=>del(r.id)} className="text-red-600">Delete</button></div>)}
  ]
  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold text-[#173B67]">Teachers</h1><button onClick={()=>{setEditing(null);setForm({});setOpen(true)}} className="bg-[#2563EB] text-white px-4 py-2 rounded">Add Teacher</button></div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="border p-2 rounded"/>
      <DataTable columns={cols} data={teachers}/>
      <Modal open={open} title={editing?'Edit Teacher':'Add Teacher'} onClose={()=>setOpen(false)}>
        <div className="grid grid-cols-2 gap-3">
          {['fullName','gender','phone','email','address','subject'].map(f=><input key={f} placeholder={f} value={form[f]||''} onChange={e=>setForm({...form,[f]:e.target.value})} className="border p-2 rounded"/>)}
          <select value={form.classId||''} onChange={e=>setForm({...form,classId:Number(e.target.value)})} className="border p-2 rounded col-span-2">
            <option value="">Assign Class</option>{data.classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="mt-3 flex justify-end"><button onClick={save} className="bg-[#2563EB] text-white px-4 py-2 rounded">Save</button></div>
      </Modal>
    </div>
  )
}
