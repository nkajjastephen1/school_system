import React, { useState } from 'react'
import { useSchool } from '../context/SchoolContext'
import { useToast } from '../components/Toast'
import DataTable from '../components/DataTable'
import { uid } from '../utils/formatters'

export default function Attendance() {
  const { data, update } = useSchool(); const toast = useToast()
  const [classId,setClassId]=useState(data.classes[0]?.id||'')
  const [date,setDate]=useState(new Date().toISOString().slice(0,10))
  const [marks,setMarks]=useState({})
  const students = data.students.filter(s=>s.classId===Number(classId))
  const save = () => {
    update(d=>{
      students.forEach(s=>{
        const existing = d.attendance.find(a=>a.studentId===s.id && a.date===date)
        if(existing) existing.status = marks[s.id]||existing.status
        else d.attendance.push({id:uid(),studentId:s.id,classId:Number(classId),date,status:marks[s.id]||'Present'})
      })
      return {...d}
    }); toast('Attendance saved')
  }
  const history = data.attendance.filter(a=>a.classId===Number(classId))
  const cols=[{key:'studentId',label:'Student',render:r=>{const s=data.students.find(x=>x.id===r.studentId);return s?`${s.firstName} ${s.lastName}`:r.studentId}},{key:'date',label:'Date'},{key:'status',label:'Status'}]
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#173B67]">Attendance</h1>
      <div className="flex gap-2 flex-wrap">
        <select value={classId} onChange={e=>setClassId(e.target.value)} className="border p-2 rounded">{data.classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border p-2 rounded"/>
      </div>
      <div className="bg-white p-4 rounded shadow">
        {students.map(s=>(
          <div key={s.id} className="flex items-center justify-between py-2 border-b">
            <span>{s.firstName} {s.lastName}</span>
            <select value={marks[s.id]||'Present'} onChange={e=>setMarks({...marks,[s.id]:e.target.value})} className="border p-1 rounded">
              <option>Present</option><option>Absent</option><option>Late</option>
            </select>
          </div>
        ))}
        <button onClick={save} className="mt-3 bg-[#2563EB] text-white px-4 py-2 rounded">Save Attendance</button>
      </div>
      <h2 className="font-semibold">History</h2>
      <DataTable columns={cols} data={history}/>
    </div>
  )
}
