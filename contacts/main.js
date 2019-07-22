// the main list of contacts- person objects
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
/////////////////////////////////////////////////////////////////////////
function getInitialListOfContacts() {
  let array = [];
  var id;
  var obj;

  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Alin',
    lastName: 'Ionescu',
    image: 'images/profile-pics/pic1.jfif',
    likes: 0
  };
  array.push(obj);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Leona',
    lastName: 'Sherman',
    image: 'images/profile-pics/pic2.jfif',
    likes: 0
  };
  array.push(obj);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Annette',
    lastName: 'Carlson',
    image: 'images/profile-pics/pic3.jfif',
    likes: 0
  };
  array.push(obj);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Ervin',
    lastName: 'Watkins',
    image: 'images/profile-pics/pic4.jfif',
    likes: 0
  };
  array.push(obj);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Philip',
    lastName: 'Pope',
    image: 'images/profile-pics/pic5.jfif',
    likes: 0
  };
  array.push(obj);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Viorel',
    lastName: 'Popescu',
    image: 'images/profile-pics/pic6.jfif',
    likes: 0
  };
  array.push(obj);
  id = generateUniqueID();
  obj = {
    id: id,
    firstName: 'Elon',
    lastName: 'Musk',
    image: 'images/profile-pics/pic7.jfif',
    likes: 0
  };
  array.push(obj);
  let retunrArray = [];
  array.forEach((item) => {
    let person = new Person(item);
    retunrArray.push(person);
  })
  return retunrArray;
}

function saveDataToLocalStorage() {
  localStorage.setItem('contacts', JSON.stringify(contactsList));
}

function getContactsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('contacts'));
}

function getContactsAccordingly() {
  let array = getContactsFromLocalStorage();
  // if we have nothing in the local storage we get the initial list
  if (array === null || array.length === 0)
    array = getInitialListOfContacts()
  return array;
}

/////////////////////////////////////////////////////////////////////////

function getNumberOfNonZeroLikes() {
  let nonZeros = 0;
  contactsList.forEach((person) => {
    if (person.likes !== 0)
      nonZeros += 1;
  })
  return nonZeros;
}

function refreshFavsList() {
  // calculate the new list 
  let favsMap = calculateFavsList();
  // clear
  clearFavsListHTML();
  // rerender the new list if there is at least one nonzero elem
  if (getNumberOfNonZeroLikes() !== 0)
    rerenderFavsListHTML(favsMap);
}

function calculateFavsList() {
  // returns a map
  let maap = {};
  // we deep copy it
  let arr = [...contactsList];
  // we sort it by likes
  sortArrayByLikes(arr);
  // we create the map of arrays
  maap = createMapOfFavs(arr);
  // sort each of them
  Object.keys(maap).forEach((key) => {
    sortArrayAlphabetically(maap[key]);
  })
  return maap;
}

function sortArrayByLikes(arrayOfContacts) {
  // arrayOfContacts - array of objects person
  arrayOfContacts.sort((p1, p2) => {
    return p2.likes - p1.likes;
  })
}

function createMapOfFavs(arrayOfContacts) {
  let myMap = {};
  arrayOfContacts.forEach((person) => {
    let maximNoOfLikes = person.likes;
    if (typeof myMap[maximNoOfLikes] === 'undefined') {
      // we create a new one
      myMap[maximNoOfLikes] = [];
      myMap[maximNoOfLikes].push(person);
    } else {
      myMap[maximNoOfLikes].push(person);
    }
  })
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

function clearFavsListHTML() {
  document.getElementById('favs-list').innerHTML = '';
}

function rerenderFavsListHTML(mapOfContacts) {
  let ol = document.getElementById('favs-list');
  let numbers = Object.keys(mapOfContacts).sort();
  numbers.reverse();
  const NUMBER_OF_FAVS = 3;

  numbers.forEach((number, i) => {
    if (i >= NUMBER_OF_FAVS) return;

    let p = document.createElement('p');
    p.innerHTML = number;
    p.className = 'align-center';
    ol.appendChild(p);

    mapOfContacts[number].forEach((item) => {
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
  })


}
//-----------------------------actions----------------------------------
function deleteAllButtonAction() {
  if (confirm('ARE YOU SURE YOU WANT TO DO THIS ?')) {
    deleteSelectedContacts();
    refreshFavsList();
    rerenderContacts();
    resetDeleteAllButtonValueAndState();
  } else {
    clearSelectedBoxes();
    resetDeleteAllButtonValueAndState();
  }
}
//----------------------------------------------------------------------

function deleteSelectedContacts() {
  getSelectedContactsIDs().forEach((person) => deletePerson(person));
}

function getSelectedContactsIDs() {
  // returns an array of ids
  let returnArrayOfIDs = [];
  contactsList.forEach((person) => {
    let checkboxId = "checkbox-" + person.id;
    let checkbox = document.getElementById(checkboxId);
    if (checkbox.checked)
      returnArrayOfIDs.push(person.id);
  })
  return returnArrayOfIDs;
}

function clearSelectedBoxes() {
  getSelectedContactsIDs().forEach((id) => {
    let buttonId = 'checkbox-' + id;
    document.getElementById(buttonId).checked = false;
  })
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
  const MAX_NUMBER = 3;
  for (let i = 0; i < MAX_NUMBER; i++) {
    let number = (Math.floor(Math.random() * 10)).toString(10);
    let char = getRandChar();
    finalArray.push(number);
    finalArray.push(char);
  }
  let arr = '';
  finalArray.forEach((item) => {
    arr += item;
  })
  return arr;
}

function getIdOfPerson(elementId) {
  // input: id of an element wich has the input
  // of the person at the end
  // const MAX_LENGTH_ID = 2*MAX_NUMBER;
  // MAX_NUMBER - defined in generateUniqueID()
  const MAX_LENGTH_ID = 6;
  return elementId.slice(elementId.length - MAX_LENGTH_ID);
}

////////////////////////////////////////////////////////////////

function rerenderContacts() {
  // contactsList - array of person objects
  document.getElementById('contacts-list').innerHTML = '';
  populateContactsListHTML();
}

function populateContactsListHTML() {
  contactsList.forEach((person) => {
    addToHTMLNewPerson(person);
  })
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
  if (newPerson.likes === 99)
    plusButton.disabled = true;
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
  if (newPerson.likes === 0)
    minusButton.disabled = true;
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
  let personId = getIdOfPerson(target_id);
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
  } else {
    button.innerHTML = 'Delete All';
    button.disabled = true;
  }
}

function resetDeleteAllButtonValueAndState() {
  document.getElementById('delete-all-button').innerHTML = 'Delete All';
  document.getElementById('delete-all-button').disabled = true;
}

//////////////////////////////////////////////////////////////////

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

///////////////////////validation functions///////////////////////

function validateName(name) {
  var regex = /^[A-Za-z0-9 ]+$/;
  var isValid = regex.test(name);
  if (!isValid)
    throw new EvalError('Your name contains special characters');
}

function validateImageUrl(imageUrl) {
  let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  let isValid = pattern.test(imageUrl);
  if (!isValid)
    throw new EvalError('Your image is not an url');
}

/////////////////////////////////////////////////////////////////

function getInput(id) {
  return document.getElementById(id).value;
}

function addNewPerson() {
  try {
    let newPerson = getTheNewPerson();
    contactsList.unshift(newPerson);
    rerenderContacts(contactsList);
    clearFormInputs();
    changeAddButtonState();
    addedSuccessfullyPerson(newPerson);
  } catch (err) {
    alert(err.message);
    clearFormInputs();
  }
}

function addedSuccessfullyPerson(newPerson) {
  alert(newPerson.firstName + ' ' + newPerson.lastName + ' was added successfully');
}

function clearFormInputs() {
  document.getElementById('first-name').value = '';
  document.getElementById('last-name').value = '';
  document.getElementById('profile-image').value = '';
}

function getTheNewPerson() {
  const id = generateUniqueID();
  const firstName = getInput('first-name');
  validateName(firstName);
  const lastName = getInput('last-name');
  validateName(lastName);
  const image = getInput('profile-image');
  validateImageUrl(image);
  let likes = 0;
  let obj = {
    id,
    firstName,
    lastName,
    image,
    likes
  };
  return new Person(obj);
}

//////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////

function changeAddButtonState() {
  let first_name = document.getElementById('first-name').value;
  let last_name = document.getElementById('last-name').value;
  let image = document.getElementById('profile-image').value;
  if (first_name != '' && last_name != '' && image != '')
    document.getElementById('add-button').disabled = false;
  else
    document.getElementById('add-button').disabled = true;
}

//////////////////////////////////////////////////////////////////////////

function initAll() {
  document.getElementById('add-button').disabled = true;
  document.getElementById('delete-all-button').disabled = true;
}

function main() {
  contactsList = getContactsAccordingly();
  populateContactsListHTML();
  initAll();
  refreshFavsList();
  window.onbeforeunload = saveDataToLocalStorage;
}

main();