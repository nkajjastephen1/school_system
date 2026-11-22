import React from 'react'
import { useSchool } from '../context/SchoolContext'
import StatCard from '../components/StatCard'
import { Users, UserCheck, School, Wallet } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { totalFeesExpected, totalPaid } from '../utils/calculations'
import { fmtMoney } from '../utils/formatters'

export default function Dashboard() {
  const { data } = useSchool()
  const { students, teachers, classes, payments, fees } = data
  const expected = totalFeesExpected(students, fees)
  const collected = payments.reduce((s,p)=>s+p.amount,0)
  const outstanding = expected - collected
  const attendanceRate = data.attendance.length ? Math.round(data.attendance.filter(a=>a.status==='Present').length/data.attendance.length*100) : 0

  const enrollment = classes.slice(0,8).map(c=>({ name:c.name, students: students.filter(s=>s.classId===c.id).length }))
  const feesChart = [{ name:'Collected', value: collected }, { name:'Outstanding', value: outstanding }]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#173B67]">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard title="Students" value={students.length} icon={<Users/>}/>
        <StatCard title="Teachers" value={teachers.length} icon={<UserCheck/>}/>
        <StatCard title="Classes" value={classes.length} icon={<School/>}/>
        <StatCard title="Fees Collected" value={fmtMoney(collected)} icon={<Wallet/>}/>
        <StatCard title="Outstanding" value={fmtMoney(outstanding)} icon={<Wallet/>}/>
        <StatCard title="Attendance Rate" value={attendanceRate+'%'} icon={<Users/>}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Enrollment by Class</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={enrollment}><XAxis dataKey="name" tick={{fontSize:10}}/><YAxis/><Tooltip/><Bar dataKey="students" fill="#2563EB"/></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Fees</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={feesChart}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#F59E0B"/></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Recent Registrations</h3>
          <ul className="text-sm space-y-1">
            {students.slice(-5).reverse().map(s=><li key={s.id}>{s.admissionNo} - {s.firstName} {s.lastName}</li>)}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Recent Payments</h3>
          <ul className="text-sm space-y-1">
            {payments.slice(-5).reverse().map(p=>{
              const s=students.find(x=>x.id===p.studentId)
              return <li key={p.id}>{p.receiptNo} - {s?.firstName} {fmtMoney(p.amount)}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
