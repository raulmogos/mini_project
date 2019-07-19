let contactsList;


// person entity
class Person {
  constructor(person) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.image = person.image;
    this.likes = person.likes;
  }
  getFullNameAndLikes() {
    return `${this.id} ${this.firstName} ${this.lastName} ${this.likes}`;
  }
}

function getListOfContacts() {
  let array = [];
  var id;
  var person;
  var obj;

  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Alin',
    lastName: 'Ionescu',
    image: 'images/profile-pics/pic1.jfif',
    likes: 0
  };
  person = new Person(obj);
  array.push(person);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Leona',
    lastName: 'Sherman',
    image: 'images/profile-pics/pic2.jfif',
    likes: 0
  };
  person = new Person(obj);
  array.push(person);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Annette',
    lastName: 'Carlson',
    image: 'images/profile-pics/pic3.jfif',
    likes: 0
  };
  person = new Person(obj);
  array.push(person);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Ervin',
    lastName: 'Watkins',
    image: 'images/profile-pics/pic4.jfif',
    likes: 0
  };
  person = new Person(obj);
  array.push(person);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Philip',
    lastName: 'Pope',
    image: 'images/profile-pics/pic5.jfif',
    likes: 0
  };
  person = new Person(obj);
  array.push(person);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Viorel',
    lastName: 'Popescu',
    image: 'images/profile-pics/pic6.jfif',
    likes: 0
  };
  person = new Person(obj);
  array.push(person);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Elon',
    lastName: 'Musk',
    image: 'images/profile-pics/pic7.jfif',
    likes: 0
  };
  person = new Person(obj);
  array.push(person);

  return array;
}

function saveDataToLocalStorage(){
  localStorage.setItem('contacts', JSON.stringify(contactsList));
}
function getContactsFromLocalStorage(){
  return JSON.parse( localStorage.getItem('contacts'));
}

function populateContactsListHTML() {
  for (let i = 0; i < contactsList.length; i++) {
    addToHTMLNewPerson(contactsList[i]);
  }
}

function consoleLogContactsList() {
  console.log('-----------------------------------------------------');
  for (let i = 0; i < contactsList.length; i++) {
    console.log(contactsList[i].getFullNameAndLikes());
  }
}

function refreshFavsList() {
  // clear list
  document.getElementById('favs-list').innerHTML = '';
  // calculate the new list 
  let favsMap = calculateFavsList();
  // rerender the new list
  rerenderFavsListHTML(favsMap);
}

function calculateFavsList() {
  // returns a map
  let mp = {};
  // we deep copy it
  let arr = [...contactsList];
  // we sort it by likes
  sortArrayByLikes(arr);
  // we create the map of arrays
  mp = createMapOfFavs(arr);
  // sort each of them
  Object.keys(mp).forEach((key) => {
    sortArrayAlphabetically(mp[key]);
  })
  return mp;
}

function sortArrayByLikes(arrayOfContacts) {
  // arrayOfContacts - array of objects person
  arrayOfContacts.sort((p1, p2) => {
    return p2.likes - p1.likes;
  })
}

function createMapOfFavs(arrayOfContacts) {
  let myMap = {};
  for (let i = 0; i < arrayOfContacts.length; i++) {
    let maxim = arrayOfContacts[i].likes;
    if (typeof myMap[maxim] === 'undefined') {
      // we create a new one
      myMap[maxim] = [];
      myMap[maxim].push(arrayOfContacts[i]);
    } else {
      myMap[maxim].push(arrayOfContacts[i]);
    }
  }
  return myMap;
}

function sortArrayAlphabetically(arrayOfContacts) {
  arrayOfContacts.sort((p1, p2) => {
    let p1FullName = p1.firstName + ' ' + p1.lastName;
    let p2FullName = p2.firstName + ' ' + p2.lastName;
    if (p1FullName > p2FullName) return 1;
    if (p1FullName < p2FullName) return -1;
    return 0;
  })
}

function rerenderFavsListHTML(mapOfContacts) {

  let ol = document.getElementById('favs-list');
  ol.innerHTML = '';

  let numbers = Object.keys(mapOfContacts).sort();
  numbers.reverse();

  for (let i = 0; i < numbers.length; i++) {
    if (i === 3) break;

    let p = document.createElement('p');
    p.innerHTML = numbers[i];
    p.className = 'align-center';
    ol.appendChild(p);

    mapOfContacts[numbers[i]].forEach((item) => {

      let newLi = document.createElement('li');
      newLi.classList.add('person-field');

      let fav_count = document.createElement('div');
      fav_count.className = 'favs-count'
      fav_count.innerHTML = item.likes;
      newLi.appendChild(fav_count);

      let image = document.createElement('img');
      image.src = item.image;
      image.alt = 'pic';
      image.className = 'avatar';
      newLi.appendChild(image);

      let full_name = document.createElement('span');
      full_name.className = 'full-name';
      let first_name = document.createElement('span');
      first_name.innerHTML = item.firstName;
      first_name.style.marginRight = '10px';
      full_name.appendChild(first_name);
      let last_name = document.createElement('span');
      last_name.innerHTML = item.lastName;
      full_name.appendChild(last_name);
      newLi.appendChild(full_name);

      ol.appendChild(newLi);
    })
  }
}
//-----------------------------actions----------------------------------
function deleteAllButtonAction() {
  if (confirm('ARE YOU SURE YOU WANT TO DO THIS ?')) {
    deleteSelectedContacts();
    refreshFavsList();
    rerenderContacts();
    resetDeleteAllButtonValueAndState();
  }else{
    clearSelectedBoxes();
    resetDeleteAllButtonValueAndState();
  }
}
//----------------------------------------------------------------------

function deleteSelectedContacts() {
  let personsToDelete = getSelectedContactsIDs();
  for (let i = 0; i < personsToDelete.length; i++) {
    deletePerson(personsToDelete[i]);
  }
}

function getSelectedContactsIDs() {
  // returns an array of ids
  let returnArrayOfIDs = [];
  let arr = document.getElementById('contacts-list').
  getElementsByClassName('person-field');
  for (let i = 0; i < arr.length; i++) {
    let input = arr[i].getElementsByTagName('input')[0];
    if (input.type === 'checkbox' && input.checked) {
      // compute the id -> last 6 characters
      let personId = input.id.slice(input.id.length - 6);
      returnArrayOfIDs.push(personId);
    }
  }
  return returnArrayOfIDs;
}

function clearSelectedBoxes() {
  let ch = getSelectedContactsIDs();
  ch.forEach((id)=>{
    let buttonId = 'checkbox-'+ id;
    document.getElementById(buttonId).checked = false;
  })
}

///////////////////////validation functions///////////////////////
function validateFirstNameInput(firstName) {
  var regex = /^[A-Za-z0-9 ]+$/;
  var isValid = regex.test(firstName);
  if (!isValid)
    throw new EvalError('Your first name contains special characters');
}
function validaetLastNameInput(lastName) {
  let regex = /^[A-Za-z0-9 ]+$/;
  let isValid = regex.test(lastName);
  if (!isValid)
    throw new EvalError('Your last name contains special characters');
}
function validateImageUrl(imageUrl) {
  let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  let isValid = pattern.test(imageUrl);
  if (!isValid)
    throw new EvalError('Your image is not an url');
}
/////////////////////////////////////////////////////////////////
function getFirstNameInput() {
  let firstName = document.getElementById('first-name').value;
  document.getElementById('first-name').value = '';
  validateFirstNameInput(firstName);
  return firstName;
}
function getLastNameInput() {
  let lastName = document.getElementById('last-name').value;
  document.getElementById('last-name').value = '';
  validaetLastNameInput(lastName);
  return lastName;
}
function getImageProfileInput() {
  let image = document.getElementById('profile-image').value;
  document.getElementById('profile-image').value = '';
  validateImageUrl(image);
  return image;
}
//////////////////////////////helper/////////////////////////////
function generateUniqueID() {
  let finalArray = [];

  let getRandChar = () => {
    let numbers = [];
    for (let i = 97; i < 123; i++) {
      numbers.push(i);
    }
    let rand = Math.floor(Math.random() * 100) % 26;
    return String.fromCharCode(numbers[rand]);
  }

  // suffle may be implemented -> TODO

  for (let i = 0; i < 3; i++) {
    let number = (Math.floor(Math.random() * 10)).toString(10);
    let char = getRandChar();
    finalArray.push(number);
    finalArray.push(char);
  }

  let arr = '';
  for (let i = 0; i < finalArray.length; i++) {
    arr += finalArray[i];
  }

  return arr;
}
////////////////////////////////////////////////////////////////
function rerenderContacts() {
  // contactsList - array of person objects
  document.getElementById('contacts-list').innerHTML = '';
  populateContactsListHTML();
}
// function that adds a new single person to contacts
function addToHTMLNewPerson(newPerson) {
  let ul = document.getElementsByClassName('contacts')[0].getElementsByTagName('ul')[0];

  let newLi = document.createElement('li');
  newLi.className = 'person-field';
  newLi.id = 'li-' + newPerson.id;

  let plusButton = document.createElement('button');
  plusButton.id = 'plus-button-' + newPerson.id;
  plusButton.innerHTML = '+';
  plusButton.custom = 'plus-button-custom';
  newLi.appendChild(plusButton);

  let fav_count = document.createElement('div');
  fav_count.id = 'count-' + newPerson.id;
  fav_count.className = 'favs-count'
  fav_count.innerHTML = newPerson.likes;
  newLi.appendChild(fav_count);

  let minusButton = document.createElement('button');
  minusButton.id = 'minus-button-' + newPerson.id;
  minusButton.innerHTML = '-';
  minusButton.custom = 'minus-button-custom';
  newLi.appendChild(minusButton);

  let image = document.createElement('img');
  image.src = newPerson.image;
  image.alt = 'pic';
  image.className = 'avatar';
  newLi.appendChild(image);

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.custom = 'checkbox-custom';
  checkbox.id = 'checkbox-' + newPerson.id;
  newLi.appendChild(checkbox);

  let full_name = document.createElement('span');
  full_name.className = 'full-name';
  let first_name = document.createElement('span');
  first_name.innerHTML = newPerson.firstName;
  first_name.style.marginRight = '10px';
  full_name.appendChild(first_name);
  let last_name = document.createElement('span');
  last_name.innerHTML = newPerson.lastName;
  full_name.appendChild(last_name);
  newLi.appendChild(full_name);

  let trash = document.createElement('img');
  trash.id = 'trash-' + newPerson.id;
  trash.src = 'images/trash-1.png';
  trash.alt = 'trash';
  trash.custom = 'trash-custom';
  trash.className = 'trash';
  newLi.appendChild(trash);

  ul.appendChild(newLi);
}

/////////////////////handle for the contacts list///////////////////
function eventsHandlerContacts(event) {
  let target_id = event.target.id;
  let personId = target_id.slice(target_id.length - 6);

  switch (event.target.custom) {
    case 'minus-button-custom':
      decrementLikes(personId);
      refreshFavsList();
      rerenderContacts();
      break;
    case 'plus-button-custom':
      incrementLikes(personId);
      refreshFavsList();
      rerenderContacts();
      break;
    case 'trash-custom':
      if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS CONTACT')) {
        deletePerson(personId);
        refreshFavsList();
        rerenderContacts();
      }
      break;
    case 'checkbox-custom':
      changeDeleteAllButtonValueAndState();
      break;
  }
}
///////////////////////////////////////////////////////////////////

function changeDeleteAllButtonValueAndState() {
  let button = document.getElementById('delete-all-button');
  let numberOfCheckedContacts = 0;
  numberOfCheckedContacts = getSelectedContactsIDs().length;
  if (numberOfCheckedContacts != 0) {
    button.innerHTML = 'Delete All ' + numberOfCheckedContacts.toString();
    button.disabled = false;
  }
  else{
    button.innerHTML = 'Delete All';
    button.disabled = true;
  }
}


function resetDeleteAllButtonValueAndState() {
  document.getElementById('delete-all-button').innerHTML = 'Delete All';
  document.getElementById('delete-all-button').disabled = true;
}

function deletePerson(personId) {
  for (let i = 0; i < contactsList.length; i++)
    if (contactsList[i].id === personId) {
      contactsList.splice(i, 1);
      break;
    }
}
function incrementLikes(personId) {
  for (let i = 0; i < contactsList.length; i++)
    if (contactsList[i].id === personId) {
      if (contactsList[i].likes < 99) {
        contactsList[i].likes += 1;
        break;
      }
    }
}
function decrementLikes(personId) {
  for (let i = 0; i < contactsList.length; i++)
    if (contactsList[i].id === personId) {
      if (contactsList[i].likes > 0) {
        contactsList[i].likes -= 1;
        break;
      }
    }
}
function addNewPerson() {
  try{
    let newPerson = getTheNewPerson();
    contactsList.push(newPerson);
    rerenderContacts(contactsList);
    changeAddButtonState();
  }
  catch(err){
    alert(err.message);
  }
}
function getTheNewPerson(){
  const id = generateUniqueID();
  const firstName = getFirstNameInput();
  const lastName = getLastNameInput();
  const image = getImageProfileInput();
  let likes = 0;
  let obj = { id: id, firstName: firstName, lastName: lastName, image: image, likes: likes};
  let newPerson = new Person(obj);
  return newPerson;
}



function clearButtonAction() {
  clearContactsLikes();
  rerenderContacts();
  clearFavsListHTML();
}
function clearContactsLikes() {
  contactsList.forEach((item) => {
    item.likes = 0;
  })
}
function clearFavsListHTML() {
  document.getElementById('favs-list').innerHTML = '';
}


function changeAddButtonState() {
  let first_name = document.getElementById('first-name').value;
  let last_name = document.getElementById('last-name').value;
  let image = document.getElementById('profile-image').value;
  if (first_name != '' && last_name != '' && image != '')
    document.getElementById('add-button').disabled = false;
  else
    document.getElementById('add-button').disabled = true;
}



function makeAllConections() {
  document.getElementById('add-button').onclick = addNewPerson;
  document.getElementById('delete-all-button').onclick = deleteAllButtonAction;
  document.getElementById('clear-button').onclick = clearButtonAction;

  document.getElementById('first-name').oninput = changeAddButtonState;
  document.getElementById('last-name').oninput = changeAddButtonState;
  document.getElementById('profile-image').oninput = changeAddButtonState;

  window.onbeforeunload = saveDataToLocalStorage;
}

function initAll(){
  document.getElementById('add-button').disabled = true;
  document.getElementById('delete-all-button').disabled = true;
}

function main() {
  contactsList = getContactsFromLocalStorage();
  populateContactsListHTML();
  initAll();
  makeAllConections();
  refreshFavsList();
}

main();