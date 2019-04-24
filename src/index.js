let BREED = []

function fetchData() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(json => {
      console.log(json)
      displayDogs(json.message)
    })

  fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(json => {
      console.log(json)
      displayBreeds(json.message)
      BREEDS = Object.keys(json.message)
    })

  function displayDogs(dogs) {
    dogs.forEach(dog => {
      addDog(dog)
    })
  }
}

function addEventListeners() {
  let selection = document.getElementById('breed-dropdown')
  selection.addEventListener('change',filterBreeds)
}

function addDog(dog) {

  let dogContainer = document.getElementById("dog-image-container")
  let dogPicture = document.createElement("img")
  dogPicture.src = dog
  dogContainer.appendChild(dogPicture)

}

function displayBreeds(breeds) {
  for (let key in breeds) {
    addBreed(key)
  }
}

function addBreed(breed) {
  let breedContainer = document.getElementById('dog-breeds')
  let dogBreed = document.createElement('li')
  dogBreed.textContent = breed
  dogBreed.addEventListener('click', ev => {
    let target = ev.target
    target.classList.add('color-on-click')
  })
  breedContainer.appendChild(dogBreed)
}

function displayBreedsArray(breeds) {
  breeds.forEach(breed => addBreed(breed))
}

function filterBreeds(event) {
  let eventLetter = event.target.value
  let filteredBreeds = BREEDS.filter(breed => breed[0] === eventLetter)
  let breedContainer = document.getElementById('dog-breeds')
  while(breedContainer.firstChild) {
    breedContainer.firstChild.remove()
  }
  displayBreedsArray(filteredBreeds)
}

function main() {
  fetchData()
  addEventListeners()
}

document.addEventListener('DOMContentLoaded', main)
