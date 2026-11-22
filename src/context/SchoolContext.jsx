import React, { createContext, useContext, useState, useCallback } from 'react'
import { initData, saveData, resetData } from '../services/storage'

const Ctx = createContext(null)

export function SchoolProvider({ children }) {
  const [data, setData] = useState(() => initData())

  const update = useCallback((fn) => {
    setData(prev => {
      const next = typeof fn === 'function' ? fn(prev) : fn
      saveData(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    resetData()
    const fresh = initData()
    setData(fresh)
    saveData(fresh)
  }, [])

  return <Ctx.Provider value={{ data, update, reset }}>{children}</Ctx.Provider>
}

export function useSchool() {
  return useContext(Ctx)
}
