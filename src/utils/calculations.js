export function classStudents(students, classId) { return students.filter(s=>s.classId===classId) }
export function totalFeesExpected(students, fees) {
  return students.reduce((sum,s)=>{ const f=fees.find(x=>x.classId===s.classId); return sum+(f?.amount||0)},0)
}
export function totalPaid(payments, studentId) {
  return payments.filter(p=>p.studentId===studentId).reduce((s,p)=>s+p.amount,0)
}
