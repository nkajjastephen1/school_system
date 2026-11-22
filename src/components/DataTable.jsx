import React, { useState } from 'react'
export default function DataTable({ columns, data, pageSize=8 }) {
  const [page, setPage] = useState(0)
  const total = Math.ceil(data.length/pageSize)||1
  const slice = data.slice(page*pageSize,(page+1)*pageSize)
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>{columns.map(c=><th key={c.key} className="px-3 py-2 text-left">{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {slice.length===0 && <tr><td colSpan={columns.length} className="px-3 py-4 text-center text-gray-400">No records</td></tr>}
            {slice.map((row,i)=>(
              <tr key={i} className="border-b">
                {columns.map(c=><td key={c.key} className="px-3 py-2">{c.render?c.render(row):row[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-3 text-sm">
        <span>Page {page+1} of {total}</span>
        <div className="space-x-2">
          <button disabled={page===0} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
          <button disabled={page>=total-1} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  )
}
