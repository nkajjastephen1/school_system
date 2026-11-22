import React, { useState } from 'react'
import { useSchool } from '../context/SchoolContext'
import { useToast } from '../components/Toast'

export default function Settings() {
  const { data, update, reset } = useSchool(); const toast = useToast()
  const [form,setForm]=useState(data.settings)
  const save = () => { update(d=>({...d,settings:form})); toast('Saved') }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#173B67]">Settings</h1>
      <div className="bg-white p-4 rounded shadow space-y-2">
        {['schoolName','address','phone','email','academicYear','term','currency'].map(f=>(
          <input key={f} placeholder={f} value={form[f]||''} onChange={e=>setForm({...form,[f]:e.target.value})} className="border p-2 rounded w-full"/>
        ))}
        <div className="flex gap-2">
          <button onClick={save} className="bg-[#2563EB] text-white px-4 py-2 rounded">Save</button>
          <button onClick={()=>{reset();setForm(data.settings);toast('Reset')}} className="bg-red-600 text-white px-4 py-2 rounded">Reset Data</button>
        </div>
      </div>
    </div>
  )
}
