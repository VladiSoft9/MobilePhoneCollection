// VM Collection

const phoneName = document.getElementById('phoneName')
const phoneYear = document.getElementById('phoneYear')
const os = document.getElementById('OS')
const listContainer = document.getElementById('listContainer')
const btnAdd = document.getElementById('btnAdd')
let li

// Function to save collection to localStorage
function saveToLocalStorage() {
  const items = []
  const phoneItems = document.querySelectorAll('.phone-item')
  phoneItems.forEach(item => {
    const phoneDetails = item.querySelector('span').textContent
    items.push(phoneDetails)
  })
  localStorage.setItem('phoneCollection', JSON.stringify(items))
}

// Function to load collection from localStorage
function loadFromLocalStorage() {
  const savedItems = JSON.parse(localStorage.getItem('phoneCollection'))
  if (savedItems && savedItems.length > 0) {
    savedItems.forEach(item => {
      const li = document.createElement('li')
      li.className = 'phone-item'
      li.innerHTML = `
        <span>${item}</span>
        <button class="delete-btn" id="delBtn" type="button">Delete</button>
      `
      listContainer.appendChild(li)

      const deleteBtn = li.querySelector('#delBtn')
      deleteBtn.addEventListener('click', (e) => {
        li.remove()
        saveToLocalStorage() 
      })
    })
  }
}

// Function to add a new phone to the collection
function addToCollection() {
  // To check are all inputs entered
  if (phoneName.value === '' || phoneYear.value === '' || os.value === '') {
    alert('You must enter all needed data!')
    return
  }

  li = document.createElement('li')
  li.className = 'phone-item'
  li.innerHTML = `
    <span>${phoneName.value} (${phoneYear.value}) - ${os.value}</span>
    <button class="delete-btn" id="delBtn" type="button">Delete</button>
  `
  listContainer.appendChild(li)

  phoneName.value = ''
  phoneYear.value = ''
  os.value = ''

  // Add delete functionality
  const deleteBtn = li.querySelector('#delBtn')
  deleteBtn.addEventListener('click', (e) => {
    li.remove()
    saveToLocalStorage() 
  })

  saveToLocalStorage() 
}

window.onload = loadFromLocalStorage

btnAdd.addEventListener('click', addToCollection)



