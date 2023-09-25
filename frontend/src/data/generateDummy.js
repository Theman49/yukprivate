const data = {tentor: []}

const institution = [
	"Universitas Negeri Semarang",
	"Universitas Negeri Solo",
	"Universitas Diponegoro",
	"Universitas Negeri Yogyakarta",
	"Universitas Sumatra Utara",
	"Universitas Negeri Surabaya",
	"Universitas Brawijaya",
	"Universitas Gadjah Mada",
	"Universitas Indonesia",
	"Institut Teknologi Bandung",
	"Universitas Veteran Jakarta",
	"Universitas Negeri Waluyo",
	"Universitas Kristen Satya Wacana",
	"IAIN Salatiga",
]

const courses = [
	"Matematika",
	"Fisika",
	"Kimia",
	"Bahasa Inggris"
]

const lastEducation = [
	"S1",
	"S2",
	"D3",
	"D4"
]

const address = [
	"Gunungpati, Semarang",
	"Patemon, Semarang",
	"Sekaran, Semarang",
	"Pedurungan, Semarang",
	"Tembalang, Semarang",
	"Banyumanik, Semarang",
	"Candisari, Semarang",
	"Ngaliyan, Semarang",
	"Bringin, Semarang",
]

const users = [
	{
		name: "Andi Susanto",
		image: "https://minimaltoolkit.com/images/randomdata/male/98.jpg"
	},
	{
		name: "Abdul Prasetyo",
		image: "https://minimaltoolkit.com/images/randomdata/male/47.jpg"
	},
	{
		name: "Rendi Prasojo",
		image: "https://minimaltoolkit.com/images/randomdata/male/83.jpg"
	},
	{
		name: "Alex Roy",
		image: "https://minimaltoolkit.com/images/randomdata/male/66.jpg"
	},
	{
		name: "Siti Fadilah",
		image: "https://minimaltoolkit.com/images/randomdata/female/61.jpg"
	},
	{
		name: "Reina Dewi",
		image: "https://minimaltoolkit.com/images/randomdata/female/86.jpg"
	},
	{
		name: "Tutik Handayani",
		image: "https://minimaltoolkit.com/images/randomdata/female/102.jpg"
	},
	{
		name: "Kirei Andini",
		image: "https://minimaltoolkit.com/images/randomdata/female/97.jpg"
	},
	{
		name: "Dedi Kusnandar",
		image: "https://minimaltoolkit.com/images/randomdata/male/16.jpg"
	},
	{
		name: "Hari Prayoga",
		image: "https://minimaltoolkit.com/images/randomdata/male/52.jpg"
	},
	{
		name: "Eko Wahyudi",
		image: "https://minimaltoolkit.com/images/randomdata/male/67.jpg"
	},
	{
		name: "Riki Pangestu",
		image: "https://minimaltoolkit.com/images/randomdata/male/28.jpg"
	},
]

const experiences = [
	{
		place: "SMA N 1 Semarang",
		time: "Nov 2015 - Jan 2016",
	},
	{
		place: "SMA N 3 Salatiga",
		time: "Jul 2017 - Des 2017",
	},
	{
		place: "MAN 1 Semarang",
		time: "Des 2018 - Mei 2019",
	},
	{
		place: "SMA 8 Semarang",
		time: "Feb 2020 - Nov 2020",
	},
]

const achievements = [
	{
		place: "FMPA UNNES",
		time: "Agustus 2017",
	},
	{
		place: "Fakultas Bahasa & Seni UNS",
		time: "Januari 2020",
	},
	{
		place: "UGM",
		time: "Mei 2019",
	},
	{
		place: "ITB",
		time: "Juli 2019",
	},
]

const aboutMe = (getInstitution, getCourses) => `Saya mahasiswa di ${getInstitution} yang memiliki pengalaman mengajar privat SD SMP & SMA selama 4 tahun serta mengajar di sekolah 1 tahun. Saya berpengalaman dalam mengajar mata pelajaran ${getCourses}. Saya memiliki keahlian di bidang karya ilmiah. Saya selalu berusaha membuat kelas belajar yang menyenangkan dan nyaman agar siswa dapat menerima ilmu yang disampaikan dengan baik.`

const generateGetCourse = (amount) => {
	let result = []
	let x = [];
	for(let i=0; i<amount; i++){
		let y = Math.round(Math.random() * 3)
		const check = x.find(item => item == y)
		if(!check){
			x.push(y)
			result.push(courses[y])
		}
	}
	return result
}

const generateExperiences = (amount, courses) => {
	const listCourse = courses
	let result = []
	let x = [];
	for(let i=0; i<amount; i++){
		let y = Math.round(Math.random() * 3)
		const check = x.find(item => item == y)
		if(!check){
			x.push(y)
			result.push({
				role: `Guru ${listCourse[i]}`,
				place: experiences[y].place,
				time: experiences[y].time,
			})
		}
	}
	return result
}

const generateAchievement = (amount, courses) => {
	const listCourse = courses
	let result = []
	let x = [];
	for(let i=0; i<amount; i++){
		let y = Math.round(Math.random() * 2)
		const check = x.find(item => item == y)
		if(!check){
			x.push(y)
			result.push({
				name: `Juara ${y+1} Lomba ${!listCourse[i] ? listCourse[0] : listCourse[i] }`,
				place: achievements[y].place,
				time: achievements[y].time,
			})
		}
	}
	return result
}

for(let i=0; i<12; i++){
	const amountCourse = Math.round(Math.floor((Math.random() * 3) + 1))
	const amountExperiences = Math.round((Math.random() * 3) + 1)
	const amountAchievement = Math.round((Math.random() * 2) + 1)
	const getInstitution = institution[Math.round(Math.random() * 13)]
	const getCourses = generateGetCourse(amountCourse)
	const getExperiences = generateExperiences(amountCourse, getCourses)
	const getAchievement = generateAchievement(amountCourse, getCourses)
	data.tentor.push({
		id: i,
		card: {
			name: users[i].name,
			image: users[i].image,
			institution: getInstitution,
			courses: getCourses,
			address: address[Math.round(Math.random() * 8)],
		},
		booking: {
			about_me: aboutMe(getInstitution, getCourses),
			courses: getCourses,
			experiences: getExperiences,
			achievements: getAchievement
		}
	})
}

// console.log(data.tentor[0].booking)

export const dataDummy = JSON.stringify(data)