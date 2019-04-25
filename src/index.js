console.log('%c HI', 'color: firebrick')
let BREEDS = []

function getImages() {
  let imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
  .then(response => { return response.json() } )
  .then(json => {
    // console.log(json)
    displayImages(json) } )
}

function displayImages(images) {
  // console.log(images.message)
  images.message.forEach( (imageUrl) => {
    addImage(imageUrl)
  })
}

function addImage(imageUrl) {
  // console.log(imageUrl)
  const dogAreaDiv = document.getElementById('dog-image-container')

  let imgDiv = document.createElement("div")
  let imgTag = document.createElement("img")

  imgTag.src = imageUrl
  imgDiv.appendChild(imgTag)
  dogAreaDiv.appendChild(imgDiv)
}

function getBreeds() {
  let breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then(response => { return response.json() } )
  .then(json => {
    let breedsHash = json.message
    BREEDS = breedsHash
    displayBreeds(breedsHash)
  })
}

function displayBreeds(breedsHash) {
  let breedsUl = document.getElementById('dog-breeds')
  let breedKeys =  Object.keys(breedsHash)
  let hashLength = breedKeys.length

  for (let i=0; i < hashLength; i++) {
    let breedValue = breedsHash[breedKeys[i]]
    let li = document.createElement('li')

    li.textContent = breedKeys[i]
    li.addEventListener("click", changeColor)
    li.className = "undefined"

    breedsUl.appendChild(li)
    if (breedValue.length !== 0) {
      ul = document.createElement('ul')
      breedValue.forEach( subBreed => {
        let innerLi = document.createElement('li')
        innerLi.textContent = subBreed
        ul.appendChild(innerLi)
      })
      li.appendChild(ul)
    }
  }
}

function changeColor() {
  // console.log(this)
  if (this.className === "undefined") {
    this.className = "blue"
  }
  else {
    this.className = "undefined"
  }
}

function makeBreedsDropDown() {
  let selectBreed = document.getElementById("breed-dropdown")
  selectBreed.addEventListener("change", filterDogs)
  const letters = "abcdefghijklmnopqrstuvwxyz"
  for (i=0; i<letters.length; i++) {
    let option = document.createElement('option')
    option.textContent = letters[i]
    option.value = letters[i]
    // console.log(option)
    selectBreed.appendChild(option)
  }
}

function filterDogs() {
  clearBreeds()
  let query = this.value
  let breedsFullHash = BREEDS
  let keys = Object.keys(breedsFullHash)
  let filteredBreeds = []
  let breedsHash = {}

  // console.log(keys)
  keys.forEach( key => {
    if (key[0] === query) {
      filteredBreeds.push(key)
    }
  })
  if (filteredBreeds !== []) {
  filteredBreeds.forEach( breed => {
      breedsHash[breed] = breedsFullHash[breed]
  })} else {
    breedsHash["Nothing for this letter"] = []
  }
  // console.log(breedsHash)

  displayBreeds(breedsHash)
}

function clearBreeds() {
  let breedsList = document.getElementById('dog-breeds')
  while (breedsList.firstChild) {
    breedsList.firstChild.remove()
  }
}

function main() {
  getImages()
  getBreeds()
  makeBreedsDropDown()
}

main()
