import React, { useState } from 'react'
import { useSchool } from '../context/SchoolContext'
import { useToast } from '../components/Toast'
import Modal from '../components/Modal'
import DataTable from '../components/DataTable'
import { uid } from '../utils/formatters'

export default function Classes() {
  const { data, update } = useSchool(); const toast = useToast()
  const [open,setOpen]=useState(false); const [editing,setEditing]=useState(null); const [form,setForm]=useState({name:'',teacherId:''})
  const save = () => {
    if(!form.name){toast('Name required','error');return}
    update(d=>{
      if(editing) d.classes=d.classes.map(c=>c.id===editing.id?{...c,...form,teacherId:form.teacherId?Number(form.teacherId):null}:c)
      else d.classes.push({id:uid(),name:form.name,teacherId:form.teacherId?Number(form.teacherId):null})
      return {...d}
    }); toast('Saved'); setOpen(false); setEditing(null); setForm({name:'',teacherId:''})
  }
  const del = id => { if(!confirm('Delete?'))return; update(d=>({...d,classes:d.classes.filter(c=>c.id!==id)})); toast('Deleted') }
  const cols=[
    {key:'name',label:'Class'},
    {key:'teacherId',label:'Class Teacher',render:r=>data.teachers.find(t=>t.id===r.teacherId)?.fullName||'-'},
    {key:'students',label:'Students',render:r=>data.students.filter(s=>s.classId===r.id).length},
    {key:'actions',label:'Actions',render:r=>(<div className="space-x-2"><button onClick={()=>{setEditing(r);setForm({name:r.name,teacherId:r.teacherId||''});setOpen(true)}} className="text-blue-600">Edit</button><button onClick={()=>del(r.id)} className="text-red-600">Delete</button></div>)}
  ]
  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold text-[#173B67]">Classes</h1><button onClick={()=>{setEditing(null);setForm({name:'',teacherId:''});setOpen(true)}} className="bg-[#2563EB] text-white px-4 py-2 rounded">Add Class</button></div>
      <DataTable columns={cols} data={data.classes}/>
      <Modal open={open} title="Class" onClose={()=>setOpen(false)}>
        <input placeholder="Class name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 rounded w-full"/>
        <select value={form.teacherId} onChange={e=>setForm({...form,teacherId:e.target.value})} className="border p-2 rounded w-full mt-2">
          <option value="">Class Teacher</option>{data.teachers.map(t=><option key={t.id} value={t.id}>{t.fullName}</option>)}
        </select>
        <div className="mt-3 flex justify-end"><button onClick={save} className="bg-[#2563EB] text-white px-4 py-2 rounded">Save</button></div>
      </Modal>
    </div>
  )
}
