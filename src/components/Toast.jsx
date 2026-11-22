import React, { createContext, useContext, useState, useCallback } from 'react'
const Ctx = createContext(null)
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const show = useCallback((msg, type='success') => {
    const id = Date.now()
    setToasts(t=>[...t,{id,msg,type}])
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3000)
  },[])
  return (
    <Ctx.Provider value={show}>
      {children}
      <div className="fixed top-4 right-4 z-[60] space-y-2">
        {toasts.map(t=>(
          <div key={t.id} className={`px-4 py-2 rounded shadow text-white ${t.type==='error'?'bg-red-600':'bg-green-600'}`}>{t.msg}</div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
export function useToast() { return useContext(Ctx) }
