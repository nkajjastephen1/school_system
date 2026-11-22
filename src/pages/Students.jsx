import React, { useState } from 'react'
import { useSchool } from '../context/SchoolContext'
import { useToast } from '../components/Toast'
import Modal from '../components/Modal'
import DataTable from '../components/DataTable'
import { uid } from '../utils/formatters'

export default function Students() {
  const { data, update } = useSchool()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [search, setSearch] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [filterGender, setFilterGender] = useState('')

  const classes = data.classes
  const students = data.students.filter(s => {
    const q = (s.firstName+' '+s.lastName+' '+s.admissionNo).toLowerCase().includes(search.toLowerCase())
    const c = !filterClass || s.classId===Number(filterClass)
    const g = !filterGender || s.gender===filterGender
    return q && c && g
  })

  const save = () => {
    if (!form.firstName || !form.lastName) { toast('Required fields missing','error'); return }
    update(d => {
      if (editing) {
        d.students = d.students.map(s => s.id===editing.id ? { ...s, ...form } : s)
      } else {
        const adm = 'ADM'+(1000+d.students.length)
        d.students.push({ id: uid(), admissionNo: adm, admissionDate: new Date().toISOString().slice(0,10), ...form })
      }
      return { ...d }
    })
    toast('Saved')
    setOpen(false); setEditing(null); setForm({})
  }

  const del = (id) => { if(!confirm('Delete student?')) return; update(d=>({...d, students:d.students.filter(s=>s.id!==id)})); toast('Deleted') }

  const cols = [
    {key:'admissionNo',label:'Adm No'},
    {key:'firstName',label:'First'},
    {key:'lastName',label:'Last'},
    {key:'gender',label:'Gender'},
    {key:'classId',label:'Class',render:r=>classes.find(c=>c.id===r.classId)?.name},
    {key:'actions',label:'Actions',render:r=>(
      <div className="space-x-2">
        <button onClick={()=>{setEditing(r);setForm(r);setOpen(true)}} className="text-blue-600">Edit</button>
        <button onClick={()=>del(r.id)} className="text-red-600">Delete</button>
      </div>
    )}
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#173B67]">Students</h1>
        <button onClick={()=>{setEditing(null);setForm({});setOpen(true)}} className="bg-[#2563EB] text-white px-4 py-2 rounded">Add Student</button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="border p-2 rounded"/>
        <select value={filterClass} onChange={e=>setFilterClass(e.target.value)} className="border p-2 rounded">
          <option value="">All Classes</option>
          {classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={filterGender} onChange={e=>setFilterGender(e.target.value)} className="border p-2 rounded">
          <option value="">All Genders</option>
          <option>Male</option><option>Female</option>
        </select>
      </div>
      <DataTable columns={cols} data={students}/>
      <Modal open={open} title={editing?'Edit Student':'Add Student'} onClose={()=>setOpen(false)}>
        <div className="grid grid-cols-2 gap-3">
          {['firstName','lastName','gender','dob','phone','address','parentName','parentPhone'].map(f=>(
            <input key={f} placeholder={f} value={form[f]||''} onChange={e=>setForm({...form,[f]:e.target.value})} className="border p-2 rounded"/>
          ))}
          <select value={form.classId||''} onChange={e=>setForm({...form,classId:Number(e.target.value)})} className="border p-2 rounded col-span-2">
            <option value="">Select Class</option>
            {classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="mt-3 flex justify-end">
          <button onClick={save} className="bg-[#2563EB] text-white px-4 py-2 rounded">Save</button>
        </div>
      </Modal>
    </div>
  )
}
