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
}

const generateUniqueID = () => {
  const finalArray = [];
  const getRandChar = () => {
    const numbers = [];
    for (let i = 97; i < 123; i++) {
      numbers.push(i);
    }
    const rand = Math.floor(Math.random() * 100) % 26;
    return String.fromCharCode(numbers[rand]);
  };
  // suffle may be implemented -> TODO
  const MAX_NUMBER = 3;
  for (let i = 0; i < MAX_NUMBER; i++) {
    const number = (Math.floor(Math.random() * 10)).toString(10);
    const char = getRandChar();
    finalArray.push(number);
    finalArray.push(char);
  }
  let arr = '';
  finalArray.forEach((item) => {
    arr += item;
  });
  return arr;
};


function getInitialListOfContacts() {
  const auxiliarArray = [];
  let id;
  let obj;
  id = generateUniqueID();
  obj = {
    id,
    firstName: 'Alin',
    lastName: 'Bla Bla Bla',
    image: 'images/profile-pics/pic1.jfif',
    likes: 0
  };
  auxiliarArray.push(obj);
  id = generateUniqueID();
  obj = {
    id,
    firstName: 'Leona',
    lastName: 'Sherman',
    image: 'images/profile-pics/pic2.jfif',
    likes: 0
  };
  auxiliarArray.push(obj);
  id = generateUniqueID();
  obj = {
    id,
    firstName: 'Annette',
    lastName: 'Carlson',
    image: 'images/profile-pics/pic3.jfif',
    likes: 0
  };
  auxiliarArray.push(obj);
  id = generateUniqueID();
  obj = {
    id,
    firstName: 'Ervin',
    lastName: 'Watkins',
    image: 'images/profile-pics/pic4.jfif',
    likes: 0
  };
  auxiliarArray.push(obj);
  id = generateUniqueID();
  obj = {
    id,
    firstName: 'Philip',
    lastName: 'Pope',
    image: 'images/profile-pics/pic5.jfif',
    likes: 0
  };
  auxiliarArray.push(obj);
  id = generateUniqueID();
  obj = {
    id,
    firstName: 'Viorel',
    lastName: 'Popescu',
    image: 'images/profile-pics/pic6.jfif',
    likes: 0
  };
  auxiliarArray.push(obj);
  id = generateUniqueID();
  obj = {
    id,
    firstName: 'Elon',
    lastName: 'Musk',
    image: 'images/profile-pics/pic7.jfif',
    likes: 0
  };
  auxiliarArray.push(obj);
  const retunrArray = [];
  auxiliarArray.forEach((item) => {
    const person = new Person(item);
    retunrArray.push(person);
  });
  return retunrArray;
}

function saveDataToLocalStorage() {
  localStorage.setItem('contacts', JSON.stringify(contactsList));
}

function getContactsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('contacts'));
}

function getContactsAccordingly() {
  const array = getContactsFromLocalStorage();
  // if we have nothing in the local storage we get the initial list
  if (array === null || array.length === 0) {
    return getInitialListOfContacts();
  }
  return array;
}

function areContactsWithLikes() {
  for (let i = 0; i < contactsList.length; i++) {
    if (contactsList[i].likes !== 0) {
      return true;
    }
  }
  return false;
}

function sortArrayByLikes(arrayOfContacts) {
  // arrayOfContacts - array of objects person
  arrayOfContacts.sort((p1, p2) => p2.likes - p1.likes);
}

function createMapOfFavs(arrayOfContacts) {
  const myMap = {};
  arrayOfContacts.forEach((person) => {
    const maximNoOfLikes = person.likes;
    if (myMap[maximNoOfLikes] === undefined) {
      // we create a new one
      myMap[maximNoOfLikes] = [];
    }
    myMap[maximNoOfLikes].push(person);
  });
  return myMap;
}

function sortArrayAlphabetically(arrayOfContacts) {
  arrayOfContacts.sort((p1, p2) => {
    const p1FullName = `${p1.firstName} ${p1.lastName}`;
    const p2FullName = `${p2.firstName} ${p2.lastName}`;
    if (p1FullName > p2FullName) return 1;
    if (p1FullName < p2FullName) return -1;
    return 0;
  });
}

function calculateFavsList() {
  // returns a map
  // we deep copy contactsList
  const cloneContactsList = [...contactsList];
  // we sort it by likes
  sortArrayByLikes(cloneContactsList);
  // we create the map of arrays
  const favsMap = createMapOfFavs(cloneContactsList);
  // sort each of them
  Object.keys(favsMap).forEach((key) => {
    sortArrayAlphabetically(favsMap[key]);
  });
  return favsMap;
}

function clearFavsListHTML() {
  document.getElementById('favs-list').innerHTML = '';
}

function rerenderFavsListHTML(mapOfContacts) {
  const ol = document.getElementById('favs-list');
  const numbers = Object.keys(mapOfContacts).sort();
  numbers.reverse();
  const NUMBER_OF_FAVS = 3;

  numbers.forEach((number, i) => {
    if (i >= NUMBER_OF_FAVS) return;

    const p = document.createElement('p');
    p.innerHTML = number;
    p.className = 'align-center';
    ol.appendChild(p);

    mapOfContacts[number].forEach((item) => {
      const newLi = document.createElement('li');
      newLi.classList.add('person-field');

      const favCount = document.createElement('div');
      favCount.className = 'favs-count';
      favCount.innerHTML = item.likes;
      newLi.appendChild(favCount);

      const image = document.createElement('img');
      image.src = item.image;
      image.alt = 'pic';
      image.className = 'avatar';
      newLi.appendChild(image);

      const fullName = document.createElement('span');
      fullName.className = 'full-name';
      const firstName = document.createElement('span');
      firstName.innerHTML = item.firstName;
      firstName.style.marginRight = '10px';
      fullName.appendChild(firstName);
      const lastName = document.createElement('span');
      lastName.innerHTML = item.lastName;
      fullName.appendChild(lastName);
      newLi.appendChild(fullName);

      ol.appendChild(newLi);
    });
  });
}

function refreshFavsList() {
  // calculate the new list
  const favsMap = calculateFavsList();
  // clear
  clearFavsListHTML();
  // rerender the new list if there is at least one nonzero elem
  if (areContactsWithLikes()) {
    rerenderFavsListHTML(favsMap);
  }
}

function getSelectedContactsIDs() {
  // returns an array of ids
  const returnArrayOfIDs = [];
  contactsList.forEach((person) => {
    const checkboxId = `checkbox-${person.id}`;
    const checkbox = document.getElementById(checkboxId);
    if (checkbox.checked) {
      returnArrayOfIDs.push(person.id);
    }
  });
  return returnArrayOfIDs;
}

function deletePerson(personId) {
  for (let i = 0; i < contactsList.length; i++) {
    if (contactsList[i].id === personId) {
      contactsList.splice(i, 1);
      break;
    }
  }
}

function deleteSelectedContacts() {
  getSelectedContactsIDs().forEach(person => deletePerson(person));
}

function addToHTMLNewPerson(newPerson) {
  const ul = document.getElementsByClassName('contacts')[0].getElementsByTagName('ul')[0];

  const newLi = document.createElement('li');
  newLi.className = 'person-field';
  newLi.id = `li-${newPerson.id}`;

  const plusButton = document.createElement('button');
  plusButton.id = `plus-button-${newPerson.id}`;
  plusButton.innerHTML = '+';
  plusButton.custom = 'plus-button-custom';
  if (newPerson.likes === 99) {
    plusButton.disabled = true;
  }
  newLi.appendChild(plusButton);

  const favCount = document.createElement('div');
  favCount.id = `count-${newPerson.id}`;
  favCount.className = 'favs-count';
  favCount.innerHTML = newPerson.likes;
  newLi.appendChild(favCount);

  const minusButton = document.createElement('button');
  minusButton.id = `minus-button-${newPerson.id}`;
  minusButton.innerHTML = '-';
  minusButton.custom = 'minus-button-custom';
  if (newPerson.likes === 0) {
    minusButton.disabled = true;
  }
  newLi.appendChild(minusButton);

  const image = document.createElement('img');
  image.src = newPerson.image;
  image.alt = 'pic';
  image.className = 'avatar';
  newLi.appendChild(image);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.custom = 'checkbox-custom';
  checkbox.id = `checkbox-${newPerson.id}`;
  newLi.appendChild(checkbox);

  const fullName = document.createElement('span');
  fullName.className = 'full-name';
  const firstName = document.createElement('span');
  firstName.innerHTML = newPerson.firstName;
  firstName.style.marginRight = '10px';
  fullName.appendChild(firstName);
  const lastName = document.createElement('span');
  lastName.innerHTML = newPerson.lastName;
  fullName.appendChild(lastName);
  newLi.appendChild(fullName);

  const trash = document.createElement('img');
  trash.id = `trash-${newPerson.id}`;
  trash.src = 'images/trash-1.png';
  trash.alt = 'trash';
  trash.custom = 'trash-custom';
  trash.className = 'trash';
  newLi.appendChild(trash);

  ul.appendChild(newLi);
}

function populateContactsListHTML() {
  contactsList.forEach((person) => {
    addToHTMLNewPerson(person);
  });
}

function rerenderContacts() {
  // contactsList - array of person objects
  document.getElementById('contacts-list').innerHTML = '';
  populateContactsListHTML();
}

function resetDeleteAllButtonValueAndState() {
  document.getElementById('delete-all-button').innerHTML = 'Delete All';
  document.getElementById('delete-all-button').disabled = true;
}

function clearSelectedBoxes() {
  getSelectedContactsIDs().forEach((id) => {
    const buttonId = `checkbox-${id}`;
    document.getElementById(buttonId).checked = false;
  });
}

function deleteAllButtonAction() {
  if (confirm('ARE YOU SURE YOU WANT TO DO THIS ?')) { // eslint-disable-line
    deleteSelectedContacts();
    refreshFavsList();
    rerenderContacts();
    resetDeleteAllButtonValueAndState();
  } else {
    clearSelectedBoxes();
    resetDeleteAllButtonValueAndState();
  }
}

function getIdOfPerson(elementId) {
  // input: id of an element wich has the input
  // of the person at the end
  // const MAX_LENGTH_ID = 2*MAX_NUMBER;
  // MAX_NUMBER - defined in generateUniqueID()
  const MAX_LENGTH_ID = 6;
  return elementId.slice(elementId.length - MAX_LENGTH_ID);
}

function changeDeleteAllButtonValueAndState() {
  const button = document.getElementById('delete-all-button');
  let numberOfCheckedContacts = 0;
  numberOfCheckedContacts = getSelectedContactsIDs().length;
  if (numberOfCheckedContacts !== 0) {
    button.innerHTML = `Delete All ${numberOfCheckedContacts.toString()}`;
    button.disabled = false;
  } else {
    button.innerHTML = 'Delete All';
    button.disabled = true;
  }
}

function incrementLikes(personId) {
  for (let i = 0; i < contactsList.length; i++) {
    if (contactsList[i].id === personId) {
      if (contactsList[i].likes < 99) {
        contactsList[i].likes += 1;
        break;
      }
    }
  }
}

function decrementLikes(personId) {
  for (let i = 0; i < contactsList.length; i++) {
    if (contactsList[i].id === personId) {
      if (contactsList[i].likes > 0) {
        contactsList[i].likes -= 1;
        break;
      }
    }
  }
}

function eventsHandlerContacts(event) {
  const targetId = event.target.id;
  const personId = getIdOfPerson(targetId);
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
      if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS CONTACT')) { // eslint-disable-line
        deletePerson(personId);
        refreshFavsList();
        rerenderContacts();
      }
      break;
    case 'checkbox-custom':
      changeDeleteAllButtonValueAndState();
      break;
    default:
      break;
  }
}

function validateName(name) {
  const regex = /^[A-Za-z0-9 ]+$/;
  if (!regex.test(name)) {
    throw new EvalError('Your name contains special characters');
  }
}

function validateImageUrl(imageUrl) {
  const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;  // eslint-disable-line
  if (!pattern.test(imageUrl)) {
    throw new EvalError('Your image is not an url');
  }
}

function getInput(id) {
  return document.getElementById(id).value;
}

function addedSuccessfullyPerson(newPerson) {
  alert(`${newPerson.firstName} ${newPerson.lastName} was added successfully`); // eslint-disable-line
}

function clearFormInputs() {
  document.getElementById('add-form').reset();
}

function getTheNewPerson() {
  const id = generateUniqueID();
  const firstName = getInput('first-name');
  validateName(firstName);
  const lastName = getInput('last-name');
  validateName(lastName);
  const image = getInput('profile-image');
  validateImageUrl(image);
  const likes = 0;
  const obj = {
    id,
    firstName,
    lastName,
    image,
    likes
  };
  return new Person(obj);
}

function clearContactsLikes() {
  contactsList.forEach((item) => {
    item.likes = 0; // eslint-disable-line
  });
}
function clearButtonAction() {
  clearContactsLikes();
  rerenderContacts();
  clearFavsListHTML();
}

function changeAddButtonState() {
  const firstName = getInput('first-name');
  const lastName = getInput('last-name');
  const image = getInput('profile-image');
  if (firstName !== '' && lastName !== '' && image !== '') {
    document.getElementById('add-button').disabled = false;
  } else {
    document.getElementById('add-button').disabled = true;
  }
}

function addNewPerson() {
  try {
    const newPerson = getTheNewPerson();
    contactsList.unshift(newPerson);
    rerenderContacts(contactsList);
    clearFormInputs();
    changeAddButtonState();
    addedSuccessfullyPerson(newPerson);
  } catch (err) {
    alert(err.message); // eslint-disable-line
    clearFormInputs();
  }
}

function initAll() {
  document.getElementById('add-button').disabled = true;
  document.getElementById('delete-all-button').disabled = true;
}

const main = () => {
  contactsList = getContactsAccordingly();
  populateContactsListHTML();
  initAll();
  refreshFavsList();
  window.onbeforeunload = saveDataToLocalStorage;
};

main();

window.ui = {
  eventsHandlerContacts,
  deleteAllButtonAction,
  clearButtonAction,
  changeAddButtonState,
  addNewPerson
};
