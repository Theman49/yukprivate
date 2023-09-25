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
		name: "Adi Wahyu Arifin",
		image: "https://rural-hardhat-28e.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6bf3ae0e-ba8c-462b-9032-b2ddfefd2529%2FIMG-20220217-WA0008.jpg?table=block&id=8377a23f-1676-45ea-af34-787b0138e491&spaceId=1f8f1f8b-390d-4f1c-9862-eacfa2c2e924&width=2000&userId=&cache=v2"
	},
	{
		name: "Desy Wijayanti",
		image: "https://rural-hardhat-28e.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F861b9f3c-36c4-4cbb-983c-077e68dde85b%2Fdesi.jpg?table=block&id=2faa09bb-47c5-48c7-bd7c-f97ff099bc0a&spaceId=1f8f1f8b-390d-4f1c-9862-eacfa2c2e924&width=2000&userId=&cache=v2"
	},
	{
		name: "Difla Sanaya",
		image: "https://rural-hardhat-28e.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc111f4a2-4175-422c-827c-4ff2c72aba64%2Fdifla.jpg?table=block&id=46ec10c3-2bc6-43c6-9328-10d48dbb64a2&spaceId=1f8f1f8b-390d-4f1c-9862-eacfa2c2e924&width=2000&userId=&cache=v2"
	},
	{
		name: "Fahruddi",
		image: "https://rural-hardhat-28e.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8f3c3eaa-b466-435c-a2bf-f88b341dba37%2FWhatsApp_Image_2021-11-19_at_13.50.12.jpeg?table=block&id=5350e222-4b10-4804-9a5c-ba32f93a8150&spaceId=1f8f1f8b-390d-4f1c-9862-eacfa2c2e924&width=2000&userId=&cache=v2"
	},
	{
		name: "Khoirul Achmad",
		image: "https://rural-hardhat-28e.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe34e5567-3f29-40b0-9bc6-038b5c1ebbd8%2FAchmad_MC.png?table=block&id=f3dea37f-524c-493a-a34d-166f80089cc3&spaceId=1f8f1f8b-390d-4f1c-9862-eacfa2c2e924&width=2000&userId=&cache=v2"
	},
	{
		name: "Mohammad Lutfi Nur Anas",
		image: "https://rural-hardhat-28e.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb47e94e3-1b56-4227-a442-7ef9b39b2d86%2Fa156c1cb-39e9-4031-9c2f-3f58b9abe4ee.jpg?table=block&id=80b5e6e1-f384-4210-8aeb-a0f0f7e2f692&spaceId=1f8f1f8b-390d-4f1c-9862-eacfa2c2e924&width=2000&userId=&cache=v2"
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

for(let i=0; i<users.length; i++){
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
			// image: users[i].image,
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

exports.dataDummy = () => JSON.stringify(data)
