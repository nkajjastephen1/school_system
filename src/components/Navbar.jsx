import React from 'react'
import { Menu, Bell, User } from 'lucide-react'
export default function Navbar({ onToggle }) {
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <button className="md:hidden" onClick={onToggle}><Menu/></button>
      <div className="font-semibold text-[#173B67]">School Management System</div>
      <div className="flex items-center gap-4">
        <Bell size={20}/>
        <div className="flex items-center gap-2"><User size={20}/> Admin</div>
      </div>
    </header>
  )
}
