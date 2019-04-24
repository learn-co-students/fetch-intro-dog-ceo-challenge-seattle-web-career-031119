//global dogPic array to pass into
DOGPICS = []


console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const dogPic= document.getElementById("dog-pic")

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

//
// function displayDogPics(dogs){
// 	DOGPICS = dogs
// 	for (let i =0; i < dogs.length; i++){
// 		let dog = dogs[i]
		// addDog(dog)
// 	}
//
// }

// function addDog(dog){
// 	let message = dog.message
// }
//
// function handleSubmit
loadImage()
