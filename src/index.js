//global dogPic array to pass into
DOGPICS = []
DOGBREEDS = []
console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const dogPic = document.getElementById("dog-pic")
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function loadImage() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => {
      return response.json()
    })
    .then(json => {
      DOGPICS = json.message
      for (let i = 0; i < json.message.length; i++) {
        addDog(json.message[i])
      }
    })
}

function addDog(url) {
  let dogsList = document.getElementById('dog-image-container')
  let img = document.createElement('img')
  img.src = url
  dogsList.appendChild(img)
}

function fetchBreeds() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log('fetch response', json)
      for (let dog in json.message) {
        DOGBREEDS.push(dog)
        displayBreeds(dog)
      }
    })
}

function displayBreeds(breed) {
  let breedList = document.getElementById('dog-breeds')
  let li = document.createElement('li')
  li.textContent = breed
  //append to li bc the event has to be on every individual
  //list item
  li.addEventListener('click', () => {
    li.classList.add("clicked-on")
  })
  breedList.appendChild(li)
}

function clearBreedsList() {
  let breedList = document.getElementById('dog-breeds')
  while (breedList.firstChild) {
    breedList.firstChild.remove()
  }
}


function filterBreeds() {
  let list = document.getElementById('breed-dropdown')
  list.addEventListener('change', () => {
    let letter = list.value
    clearBreedsList();
    DOGBREEDS.forEach(breed => {
      if (breed[0] === letter) {
        displayBreeds(breed)
      }
    })
  })
}

loadImage()
fetchBreeds()
filterBreeds()
