import React, { useState } from 'react'
import { useSchool } from '../context/SchoolContext'
import { useToast } from '../components/Toast'
import Modal from '../components/Modal'
import DataTable from '../components/DataTable'
import { uid } from '../utils/formatters'
import { fmtMoney } from '../utils/formatters'

export default function Fees() {
  const { data, update } = useSchool(); const toast = useToast()
  const [open,setOpen]=useState(false); const [form,setForm]=useState({studentId:'',amount:'',method:'Cash',reference:''})
  const recordPayment = () => {
    if(!form.studentId||!form.amount){toast('Required','error');return}
    update(d=>{
      d.payments.push({id:uid(),studentId:Number(form.studentId),amount:Number(form.amount),date:new Date().toISOString().slice(0,10),method:form.method,reference:form.reference,receiptNo:'RCP'+(1000+d.payments.length)})
      return {...d}
    }); toast('Payment recorded'); setOpen(false); setForm({studentId:'',amount:'',method:'Cash',reference:''})
  }
  const setFee = (classId, amount) => {
    update(d=>{
      const f=d.fees.find(x=>x.classId===classId)
      if(f) f.amount=Number(amount); else d.fees.push({classId,amount:Number(amount)})
      return {...d}
    }); toast('Fee set')
  }
  const cols=[
    {key:'receiptNo',label:'Receipt'},
    {key:'studentId',label:'Student',render:r=>{const s=data.students.find(x=>x.id===r.studentId);return s?`${s.firstName} ${s.lastName}`:r.studentId}},
    {key:'amount',label:'Amount',render:r=>fmtMoney(r.amount)},
    {key:'method',label:'Method'},{key:'date',label:'Date'}
  ]
  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold text-[#173B67]">Fees & Payments</h1><button onClick={()=>setOpen(true)} className="bg-[#2563EB] text-white px-4 py-2 rounded">Record Payment</button></div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Set Class Fees</h3>
        {data.classes.map(c=>{
          const f=data.fees.find(x=>x.classId===c.id)
          return (
            <div key={c.id} className="flex items-center gap-2 py-1">
              <span className="w-32">{c.name}</span>
              <input defaultValue={f?.amount||0} onBlur={e=>setFee(c.id,e.target.value)} className="border p-1 rounded w-32"/>
            </div>
          )
        })}
      </div>
      <DataTable columns={cols} data={data.payments}/>
      <Modal open={open} title="Record Payment" onClose={()=>setOpen(false)}>
        <select value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})} className="border p-2 rounded w-full">
          <option value="">Select Student</option>{data.students.map(s=><option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.admissionNo})</option>)}
        </select>
        <input placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} className="border p-2 rounded w-full mt-2"/>
        <select value={form.method} onChange={e=>setForm({...form,method:e.target.value})} className="border p-2 rounded w-full mt-2">
          <option>Cash</option><option>Bank</option><option>Mobile Money</option>
        </select>
        <input placeholder="Reference" value={form.reference} onChange={e=>setForm({...form,reference:e.target.value})} className="border p-2 rounded w-full mt-2"/>
        <div className="mt-3 flex justify-end"><button onClick={recordPayment} className="bg-[#2563EB] text-white px-4 py-2 rounded">Save</button></div>
      </Modal>
    </div>
  )
}
