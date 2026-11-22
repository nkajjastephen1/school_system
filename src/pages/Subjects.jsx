import React, { useState } from 'react'
import { useSchool } from '../context/SchoolContext'
import { useToast } from '../components/Toast'
import Modal from '../components/Modal'
import DataTable from '../components/DataTable'
import { uid } from '../utils/formatters'

export default function Subjects() {
  const { data, update } = useSchool(); const toast = useToast()
  const [open,setOpen]=useState(false); const [editing,setEditing]=useState(null); const [form,setForm]=useState({name:''})
  const save = () => {
    if(!form.name){toast('Name required','error');return}
    update(d=>{
      if(editing) d.subjects=d.subjects.map(s=>s.id===editing.id?{...s,...form}:s)
      else d.subjects.push({id:uid(),name:form.name})
      return {...d}
    }); toast('Saved'); setOpen(false); setEditing(null); setForm({name:''})
  }
  const del = id => { if(!confirm('Delete?'))return; update(d=>({...d,subjects:d.subjects.filter(s=>s.id!==id)})); toast('Deleted') }
  const cols=[
    {key:'name',label:'Subject'},
    {key:'actions',label:'Actions',render:r=>(<div className="space-x-2"><button onClick={()=>{setEditing(r);setForm({name:r.name});setOpen(true)}} className="text-blue-600">Edit</button><button onClick={()=>del(r.id)} className="text-red-600">Delete</button></div>)}
  ]
  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold text-[#173B67]">Subjects</h1><button onClick={()=>{setEditing(null);setForm({name:''});setOpen(true)}} className="bg-[#2563EB] text-white px-4 py-2 rounded">Add Subject</button></div>
      <DataTable columns={cols} data={data.subjects}/>
      <Modal open={open} title="Subject" onClose={()=>setOpen(false)}>
        <input placeholder="Subject name" value={form.name} onChange={e=>setForm({name:e.target.value})} className="border p-2 rounded w-full"/>
        <div className="mt-3 flex justify-end"><button onClick={save} className="bg-[#2563EB] text-white px-4 py-2 rounded">Save</button></div>
      </Modal>
    </div>
  )
}
