const KEY = 'school_system_data'

const defaultData = () => ({
  settings: {
    schoolName: 'Green Valley Primary School',
    logo: '',
    address: 'Kampala, Uganda',
    phone: '+256 700 000000',
    email: 'info@greenvalley.ac.ug',
    academicYear: '2026',
    term: 'Term 1',
    currency: 'UGX',
  },
  students: [],
  teachers: [],
  classes: [],
  subjects: [],
  attendance: [],
  fees: [],
  exams: [],
  marks: [],
  payments: [],
})

export function loadData() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function resetData() {
  localStorage.removeItem(KEY)
}

export function initData() {
  let data = loadData()
  if (!data) {
    data = seedData()
    saveData(data)
  }
  return data
}

function seedData() {
  const classes = [
    'Primary 1','Primary 2','Primary 3','Primary 4','Primary 5','Primary 6',
    'Primary 7','Senior 1','Senior 2','Senior 3','Senior 4','Senior 5','Senior 6',
  ].map((name, i) => ({ id: i+1, name, teacherId: null }))
  // only 6 classes sample? spec says 6 classes sample. We'll include all 13 but maybe mark. Keep all.
  const subjects = ['Mathematics','English','Science','Social Studies','Religious Education','Physical Education','Art','Computer Studies'].map((n,i)=>({id:i+1,name:n}))
  const teachers = []
  for (let i=1;i<=8;i++){
    teachers.push({ id:i, staffId:'STF'+String(i).padStart(3,'0'), fullName:`Teacher ${i}`, gender: i%2?'Male':'Female', phone:'070000000'+i, email:`teacher${i}@school.ug`, address:'Kampala', subject: subjects[(i-1)%subjects.length].name, classId: (i%classes.length)+1 })
  }
  const students = []
  const first = ['John','Mary','Peter','Sarah','David','Grace','James','Ruth','Brian','Esther','Paul','Joy','Daniel','Faith','Michael','Hope','Andrew','Mercy','Joseph','Peace','Samuel','Blessing','Emmanuel','Charity','Isaac','Patience','Moses','Comfort','Joshua','Annet']
  const last = ['Okello','Nakato','Ssempijja','Auma','Mugisha','Nantongo','Ochola','Akello','Kato','Nambozo','Tumwine','Nabwire','Otim','Adong','Ssekandi','Namutebi','Byaruhanga','Nabirye','Ojok','Atim','Kaggwa','Nassozi','Mwesigwa','Nakabugo','Ssenyonga','Apio','Okot','Nakimuli','Twinomujuni','Namuli']
  for (let i=0;i<30;i++){
    const cls = classes[i % 6] // first 6 classes
    students.push({
      id: i+1,
      admissionNo: 'ADM'+String(1000+i),
      firstName: first[i],
      lastName: last[i],
      gender: i%2?'Male':'Female',
      dob: '2012-01-01',
      phone: '07'+Math.floor(Math.random()*1e8),
      address: 'Kampala',
      parentName: 'Parent '+first[i],
      parentPhone: '07'+Math.floor(Math.random()*1e8),
      classId: cls.id,
      admissionDate: '2026-01-15',
    })
  }
  // attendance sample
  const attendance = []
  const today = new Date().toISOString().slice(0,10)
  students.slice(0,10).forEach(s=>{
    attendance.push({ id: attendance.length+1, studentId:s.id, classId:s.classId, date:today, status: Math.random()>0.2?'Present':'Absent' })
  })
  // fees sample
  const fees = classes.slice(0,6).map(c=>({ classId:c.id, amount: 500000 }))
  const payments = []
  students.slice(0,5).forEach((s,i)=>{
    payments.push({ id:i+1, studentId:s.id, amount: 200000, date: today, method:'Cash', reference:'REF'+(i+1), receiptNo:'RCP'+String(1000+i) })
  })
  // exams
  const exams = [{ id:1, name:'Mid Term', classId: classes[0].id, subjects:[1,2,3] }]
  const marks = []
  students.filter(s=>s.classId===classes[0].id).forEach(s=>{
    exams[0].subjects.forEach(sub=>{
      marks.push({ id: marks.length+1, examId:1, studentId:s.id, subjectId:sub, mark: Math.floor(50+Math.random()*50) })
    })
  })
  return { settings: defaultData().settings, students, teachers, classes, subjects, attendance, fees, exams, marks, payments }
}

export const GRADE_RANGES = [
  { min:80, max:100, grade:'D1', remark:'Distinction' },
  { min:70, max:79, grade:'D2', remark:'Distinction' },
  { min:60, max:69, grade:'C3', remark:'Credit' },
  { min:50, max:59, grade:'C4', remark:'Credit' },
  { min:40, max:49, grade:'P7', remark:'Pass' },
  { min:0, max:39, grade:'F9', remark:'Fail' },
]
