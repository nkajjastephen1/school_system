export function fmtMoney(n, currency='UGX') {
  return `${currency} ${Number(n||0).toLocaleString()}`
}
export function uid() { return Date.now() + Math.floor(Math.random()*1000) }
export function gradeFor(mark, ranges) {
  const r = ranges.find(r => mark >= r.min && mark <= r.max)
  return r || { grade:'-', remark:'-' }
}
