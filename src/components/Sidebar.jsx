import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, UserCheck, School, BookOpen, ClipboardList, Wallet, FileText, BarChart3, Settings } from 'lucide-react'

const items = [
  {to:'/',label:'Dashboard',icon:LayoutDashboard},
  {to:'/students',label:'Students',icon:Users},
  {to:'/teachers',label:'Teachers',icon:UserCheck},
  {to:'/classes',label:'Classes',icon:School},
  {to:'/subjects',label:'Subjects',icon:BookOpen},
  {to:'/attendance',label:'Attendance',icon:ClipboardList},
  {to:'/fees',label:'Fees & Payments',icon:Wallet},
  {to:'/exams',label:'Examinations',icon:FileText},
  {to:'/reports',label:'Reports',icon:BarChart3},
  {to:'/settings',label:'Settings',icon:Settings},
]

export default function Sidebar({ open }) {
  return (
    <aside className={`${open?'translate-x-0':'-translate-x-full'} md:translate-x-0 fixed md:static z-40 w-64 h-full bg-[#173B67] text-white transition-transform`}>
      <div className="p-4 text-xl font-bold border-b border-white/20">School MS</div>
      <nav className="p-2 space-y-1">
        {items.map(i=>(
          <NavLink key={i.to} to={i.to} end={i.to==='/'} className={({isActive})=>`flex items-center gap-3 px-3 py-2 rounded ${isActive?'bg-white/20':'hover:bg-white/10'}`}>
            <i.icon size={18}/>{i.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}