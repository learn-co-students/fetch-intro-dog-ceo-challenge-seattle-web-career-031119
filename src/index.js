//global dogPic array to pass into
DOGPICS = []
DOGBREEDS =[]

console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const dogPic= document.getElementById("dog-pic")
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function loadImage(){
	fetch("https://dog.ceo/api/breeds/image/random/4")
		.then(response => {return response.json() })
		.then(json => {
			DOGPICS = json.message
			for (let i =0; i < json.message.length; i++) {
			addDog(json.message[i])
			}
		})
}
function addDog(url){
	let dogsList = document.getElementById('dog-image-container')
	let img= document.createElement('img')
	img.src = url
	dogsList.appendChild(img)
}

function fetchBreeds(){
	fetch('https://dog.ceo/api/breeds/list/all')
	.then(response => {return response.json() })
	.then(json => {
		console.log('fetch response', json)

	// 	for (let i =0; i < json.message.length; i++) {
	// 	displayBreeds(json.message[i])
	// }
	for (let dog in json.message){
		// console.log(dog + '	hello there dog')
		DOGBREEDS.push(dog)
	//console log to check here
		displayBreeds(dog)
	}
	})
}
function displayBreeds(breed){
	let breedList= document.getElementById('dog-breeds')
	let li = document.createElement('li')
	li.textContent = breed

	//append to li bc the event has to be on every individual
	//list item
	li.addEventListener('click', () => {
		li.classList.add("clicked-on")
	})
	breedList.appendChild(li)
}

function clearBreedsList(){
	while (breedList.firstChild) {
		breedList.firstChild.remove()
	}
}

function filterBreeds(){
let breedsList = document.getElementById('breed-dropdown').value
clearBreeds()


	DOGBREEDS.forEach(breed => {
		if(breed[0]== breedList){
			const li = document.createElement('li')
			li.textContent = breed
			breedList.appendChild(li)
			li.addEventListener('click')
		}
	})
}


loadImage()
fetchBreeds()
