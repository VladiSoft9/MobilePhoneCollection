// VM Collection

const phoneName = document.getElementById('phoneName')
const phoneYear = document.getElementById('phoneYear')
const os = document.getElementById('OS')
const phoneImage = document.getElementById('phoneImage')
const imagePreview = document.getElementById('imagePreview')
const listContainer = document.getElementById('listContainer')
const btnAdd = document.getElementById('btnAdd')
const emptyState = document.getElementById('emptyState')
const collectionCount = document.getElementById('collectionCount')

let currentImageData = null

phoneImage.addEventListener('change', e => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = e => {
      currentImageData = e.target.result
      imagePreview.style.display = 'block'
      imagePreview.innerHTML = `<img src="${currentImageData}" alt="Preview">`
    }
  }
})

function saveToLocalStorage() {
  const items = []
  const phoneItems = document.querySelectorAll('.phone-item')
  
  phoneItems.forEach(item => {
    const phoneName = item.querySelector('.phone-name').textContent
    const phoneSpecs = item.querySelector('.phone-specs').textContent
    const phoneImg = item.querySelector('.phone-image').src
    
    items.push({
      name: phoneName,
      specs: phoneSpecs,
      image: phoneImg
    })
  })
  
  localStorage.setItem('phoneCollection', JSON.stringify(items))
}

function loadFromLocalStorage() {
  const savedItems = JSON.parse(localStorage.getItem('phoneCollection'))
  if (savedItems) {
    savedItems.forEach(item => {
      createPhoneItem(item.name, item.specs, item.image)
    })
  }
  updateEmptyState()
  updateCollectionCount()
}

// Function to update empty state visibility
function updateEmptyState() {
  const hasItems = document.querySelectorAll('.phone-item').length > 0
  emptyState.style.display = hasItems ? 'none' : 'block'
}

// Update count whenever items are added or removed 
function updateCollectionCount() {
  const numberOfItems = document.querySelectorAll('.phone-item').length
  if(numberOfItems !== 1) {
    collectionCount.textContent = `(${numberOfItems}) devices`
  }
  else{
    collectionCount.textContent = `(${numberOfItems}) device`
}
}

function createPhoneItem(name, specs, image) {
  const li = document.createElement('li')
  li.className = 'phone-item'
  
  li.innerHTML = `
    <img src="${image || 'https://placehold.co/150x150/EEE/31343C?font=playfair-display&text=No%20Image'}" alt="${name}" class="phone-image">
    <div class="phone-details">
      <div class="phone-name">${name}</div>
      <div class="phone-specs">${specs}</div>
    </div>
    <button class="delete-btn" type="button">
      <i class="fas fa-trash"></i>
      Delete
    </button>
  `
  
  listContainer.appendChild(li)

  // Add delete functionality
  const deleteBtn = li.querySelector('.delete-btn')
  deleteBtn.addEventListener('click', () => {
    li.remove()
    saveToLocalStorage()
    updateEmptyState()
    updateCollectionCount()
  })
}

function resetForm() {
  phoneName.value = ''
  phoneYear.value = ''
  os.value = ''
  phoneImage.value = ''
  currentImageData = null
  imagePreview.style.display = 'none'
  imagePreview.innerHTML = ''
}

function addToCollection() {
  if (phoneName.value === '' || phoneYear.value === '' || os.value === '') {
    alert('Please fill in all required fields!')
    return
  }

  const name = phoneName.value
  const specs = `Released: ${phoneYear.value} | OS: ${os.value}`
  const image = currentImageData || 'https://placehold.co/150x150/EEE/31343C?font=playfair-display&text=No%20Image'

  createPhoneItem(name, specs, image)
  resetForm()
  saveToLocalStorage()
  updateEmptyState()
  updateCollectionCount()
}

window.onload = loadFromLocalStorage

btnAdd.addEventListener('click', addToCollection)

phoneName.addEventListener('keypress', e => {
  if (e.key === 'Enter') addToCollection()
})

phoneYear.addEventListener('keypress', e => {
  if (e.key === 'Enter') addToCollection()
})

