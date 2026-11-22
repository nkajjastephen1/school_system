import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { SchoolProvider } from './context/SchoolContext'
import { ToastProvider } from './components/Toast'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Classes from './pages/Classes'
import Subjects from './pages/Subjects'
import Attendance from './pages/Attendance'
import Fees from './pages/Fees'
import Exams from './pages/Exams'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <SchoolProvider>
      <ToastProvider>
        <div className="flex min-h-screen">
          <Sidebar open={open}/>
          <div className="flex-1 flex flex-col">
            <Navbar onToggle={()=>setOpen(o=>!o)}/>
            <main className="p-4 flex-1">
              <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/students" element={<Students/>}/>
                <Route path="/teachers" element={<Teachers/>}/>
                <Route path="/classes" element={<Classes/>}/>
                <Route path="/subjects" element={<Subjects/>}/>
                <Route path="/attendance" element={<Attendance/>}/>
                <Route path="/fees" element={<Fees/>}/>
                <Route path="/exams" element={<Exams/>}/>
                <Route path="/reports" element={<Reports/>}/>
                <Route path="/settings" element={<Settings/>}/>
              </Routes>
            </main>
          </div>
        </div>
      </ToastProvider>
    </SchoolProvider>
  )
}
