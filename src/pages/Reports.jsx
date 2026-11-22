import React from 'react'
import { useSchool } from '../context/SchoolContext'
import { fmtMoney } from '../utils/formatters'

export default function Reports() {
  const { data } = useSchool()
  const print = () => window.print()
  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold text-[#173B67]">Reports</h1><button onClick={print} className="bg-gray-700 text-white px-4 py-2 rounded">Print</button></div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Summary</h3>
        <p>Total Students: {data.students.length}</p>
        <p>Total Teachers: {data.teachers.length}</p>
        <p>Total Classes: {data.classes.length}</p>
        <p>Students by Gender: M {data.students.filter(s=>s.gender==='Male').length} / F {data.students.filter(s=>s.gender==='Female').length}</p>
        <p>Fees Collected: {fmtMoney(data.payments.reduce((s,p)=>s+p.amount,0))}</p>
      </div>
    </div>
  )
}
