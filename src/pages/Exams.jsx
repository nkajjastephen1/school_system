import React, { useState } from 'react'
import { useSchool } from '../context/SchoolContext'
import { useToast } from '../components/Toast'
import Modal from '../components/Modal'
import DataTable from '../components/DataTable'
import { uid } from '../utils/formatters'

export default function Exams() {
  const { data, update } = useSchool(); const toast = useToast()
  const [open,setOpen]=useState(false); const [form,setForm]=useState({name:'',classId:'',subjects:[]})
  const create = () => {
    if(!form.name||!form.classId){toast('Required','error');return}
    update(d=>{d.exams.push({id:uid(),name:form.name,classId:Number(form.classId),subjects:form.subjects});return {...d}}); toast('Created'); setOpen(false)
  }
  const enterMarks = (exam, studentId, subjectId, mark) => {
    update(d=>{
      const m=d.marks.find(x=>x.examId===exam.id&&x.studentId===studentId&&x.subjectId===subjectId)
      if(m) m.mark=Number(mark); else d.marks.push({id:uid(),examId:exam.id,studentId,subjectId,mark:Number(mark)})
      return {...d}
    })
  }
  const cols=[{key:'name',label:'Exam'},{key:'classId',label:'Class',render:r=>data.classes.find(c=>c.id===r.classId)?.name}]
  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold text-[#173B67]">Examinations</h1><button onClick={()=>setOpen(true)} className="bg-[#2563EB] text-white px-4 py-2 rounded">Create Exam</button></div>
      <DataTable columns={cols} data={data.exams}/>
      {data.exams.map(exam=>(
        <div key={exam.id} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">{exam.name}</h3>
          {data.students.filter(s=>s.classId===exam.classId).map(s=>(
            <div key={s.id} className="flex items-center gap-2 py-1 flex-wrap">
              <span className="w-40">{s.firstName} {s.lastName}</span>
              {exam.subjects.map(sub=>{
                const m=data.marks.find(x=>x.examId===exam.id&&x.studentId===s.id&&x.subjectId===sub)
                return <input key={sub} placeholder={data.subjects.find(x=>x.id===sub)?.name} defaultValue={m?.mark||''} onBlur={e=>enterMarks(exam,s.id,sub,e.target.value)} className="border p-1 rounded w-20"/>
              })}
            </div>
          ))}
        </div>
      ))}
      <Modal open={open} title="Create Exam" onClose={()=>setOpen(false)}>
        <input placeholder="Exam name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 rounded w-full"/>
        <select value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})} className="border p-2 rounded w-full mt-2">
          <option value="">Class</option>{data.classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="mt-2">
          {data.subjects.map(s=>(
            <label key={s.id} className="block"><input type="checkbox" checked={form.subjects.includes(s.id)} onChange={e=>{const subs=e.target.checked?[...form.subjects,s.id]:form.subjects.filter(x=>x!==s.id);setForm({...form,subjects:subs})}}/> {s.name}</label>
          ))}
        </div>
        <div className="mt-3 flex justify-end"><button onClick={create} className="bg-[#2563EB] text-white px-4 py-2 rounded">Create</button></div>
      </Modal>
    </div>
  )
}
