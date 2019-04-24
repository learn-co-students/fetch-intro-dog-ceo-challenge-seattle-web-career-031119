console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const imgContainer = document.getElementById('dog-image-container')
const breedsContainer = document.getElementById('dog-breeds')
const selectionTag = document.getElementById('breed-dropdown')
let breedChoice = document.getElementById('breed-dropdown').value

let BREEDS = []

fetch(imgUrl)
  .then(resp => {return resp.json()})
  .then(json => {addImage(json)})

function addImage(json) {
  for (i = 0; i < json.message.length; i++) {
    const img = document.createElement('img')
    img.setAttribute('src', json.message[i]);
    imgContainer.appendChild(img)
  }
}


fetch(breedUrl)
.then(resp => {return resp.json()})
.then(json => {addBreeds(json)})

// function addBreeds(json) {
//   for (i = 0; i < (Object.keys(json.message).length); i++) {
//     if (breedChoice) {
//       if (Object.keys(json.message)[i][0] === breedChoice) {
//         const li = document.createElement('li')
//         li.textContent = Object.keys(json.message)[i]
//         breedsContainer.appendChild(li)
//         li.addEventListener('click', breedClick)
//       }
//     } else {
//       const li = document.createElement('li')
//       li.textContent = Object.keys(json.message)[i]
//       breedsContainer.appendChild(li)
//       li.addEventListener('click', breedClick)
//     }
//   }
// }

function addBreeds(json) {
  BREEDS = json
  for (i = 0; i < (Object.keys(json.message).length); i++) {
    const li = document.createElement('li')
    li.textContent = Object.keys(json.message)[i]
    breedsContainer.appendChild(li)
    li.addEventListener('click', breedClick)
  }
}

function breedClick(ev) {
  ev.target.classList.add('breed-click')
}

 selectionTag.addEventListener('change', filterBreed)

function clearBreeds () {
  while(breedsContainer.firstChild) {
    breedsContainer.firstChild.remove()
  }
}
function filterBreed () {
  breedChoice = document.getElementById('breed-dropdown').value
  clearBreeds()
  Object.keys(BREEDS.message).forEach(breed => {
    if (breed[0] === breedChoice) {
      const li = document.createElement('li')
      li.textContent = breed
      breedsContainer.appendChild(li)
      li.addEventListener('click', breedClick)
    }
  })
}
