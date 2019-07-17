 /*
description or something
*/


// person entity
class Person {
  constructor(id, firstName, lastName, image, likes = 0, dislikes = 0){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image;
    this.likes = likes;
    this.dislikes = dislikes;
  }
  getFullName() {
    return this.id + ' ' + this.firstName + ' ' + this.lastName;
  }
}


function getListOfContacts(){
  let array = [];
  var id;
  var person;

  id = generateUniqueID();
  person = new Person(id, 'Alin', 'Ionescu', 'images/profile-pics/pic1.jfif');
  array.push(person);
  id = generateUniqueID();
  person = new Person(id, 'Leona', 'Sherman', 'images/profile-pics/pic2.jfif');
  array.push(person);
  id = generateUniqueID();
  person = new Person(id, 'Annette', 'Carlson', 'images/profile-pics/pic3.jfif');
  array.push(person);

  return array;
}

function populateContactsList(){
  let arr = getListOfContacts();
  for(let i=0; i<arr.length; i++){
    console.log(arr[i].getFullName());
    addToHTMLNewPerson(arr[i]);
    attachConections(arr[i]);
  }
}
//-----------------------------actions----------------------------------
// function that hgas multiple actions
function deleteAllButtonAction() {
  // delete selected contacts
  deleteSelectedContacts();
  // refresh the favs list -> make function
}
//----------------------------------------------------------------------

// function that deletes all checked contacts
function deleteSelectedContacts() {
  let contacts = document.getElementsByClassName('person-field');
  for (let i = 0; i<contacts.length; ++i){
      let input = contacts[i].getElementsByTagName('input')[0];
      if (input.type.toLowerCase() == 'checkbox'){
        if(input.checked == true){
            input.parentNode.remove();
            i--;
        }
      }
  }
}

///////////////////////validation functions///////////////////////
//to do

/////////////////////////////////////////////////////////////////
function getFirstNameInput(){
  //get the input
  // validate it
  // if ok -> return it
  // else throw error
  let firstName = document.getElementById('first-name').value;
  // validate TODO
  return firstName;
}
function getLastNameInput(){
  let lastName = document.getElementById('last-name').value;
  // validate TODO
  return lastName;
}
function getImageProfileInput(){
  let image = document.getElementById('profile-image').value;
  // validate TODO
  return image;
}

function generateUniqueID() {
  let finalArray = [];

  let getRandChar = () => {
    let numbers = [];
    for (let i=97; i<123; i++){
      numbers.push(i);
    }
    let rand = Math.floor(Math.random()*100) % 26;
    return String.fromCharCode(numbers[rand]);
  }

  // suffle may be implemented -> TODO

  for (let i=0;i<3;i++){
    let number = (Math.floor(Math.random() * 10)).toString(10);
    let char = getRandChar();
    finalArray.push(number);
    finalArray.push(char);
  }

  let arr = '';
  for (let i=0;i<finalArray.length; i++){
    arr += finalArray[i];
  }

  return arr;
}

function addToHTMLNewPerson(newPerson) {
  let ul = document.getElementsByClassName('contacts')[0].getElementsByTagName('ul')[0];

  let newLi = document.createElement('li');
  newLi.className = 'person-field';
  newLi.id = 'li-' + newPerson.id;

  let plusButton = document.createElement('button');
  plusButton.id = 'plus-button-' + newPerson.id;
  plusButton.innerHTML = '+';
  newLi.appendChild(plusButton);

  let fav_count = document.createElement('div');
  fav_count.id = 'count-' + newPerson.id;
  fav_count.className = 'favs-count'
  fav_count.innerHTML = newPerson.likes;
  newLi.appendChild(fav_count);

  let minusButton = document.createElement('button');
  minusButton.id = 'minus-button-' + newPerson.id;
  minusButton.innerHTML = '-';
  newLi.appendChild(minusButton);

  let image = document.createElement('img');
  image.src = newPerson.image;
  image.alt = 'pic';
  image.className = 'avatar';
  newLi.appendChild(image);

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
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
  trash.src = 'images/trash-1.png';
  trash.alt = 'trash';
  trash.className = 'trash';
  newLi.appendChild(trash);

  ul.appendChild(newLi);
}

function attachConections(newPerson){
  let personHTMLEntity = document.getElementById('li-'+newPerson.id);
  // for trash
  personHTMLEntity.getElementsByClassName('trash')[0].onclick = () => {
    personHTMLEntity.remove();
    //refresh the favs list
  }
  document.getElementById('plus-button-' + newPerson.id).onclick = () => {
    newPerson.likes+=1;
    document.getElementById('count-'+newPerson.id).innerHTML = newPerson.likes;
    //refresh the favs list
  }
  document.getElementById('minus-button-' + newPerson.id).onclick = () => {
    if (newPerson.likes > 0) {
      newPerson.likes-=1;
      document.getElementById('count-'+newPerson.id).innerHTML = newPerson.likes;
    }
    //refresh the favs list
  }
}

function addNewPerson() {
  // get the data from the form
  let id = generateUniqueID();
  let firstName = getFirstNameInput();
  let lastName = getLastNameInput();
  let image = getImageProfileInput();
  // create a new person
  let newPerson = new Person(id, firstName, lastName, image);
  console.log( 'created -> ' + newPerson.getFullName());
  addToHTMLNewPerson(newPerson);
  console.log( 'added -> ' + newPerson.getFullName());
  attachConections(newPerson);
}

function makeAllConections(){
  document.getElementById('delete-all-button').onclick = deleteAllButtonAction;
  //connectionsTrashImgDeleteCurrent();
  document.getElementById('add-button').onclick = addNewPerson;
}

function main(){
  // fill the contact list
  populateContactsList();
  makeAllConections();
  // handle exceptions somewhere -> TODO
}

main();

////////////////////////////////try/////////////////////////

// function f1(){
//   console.log('f1');
// }
// function f2(){
//   console.log('f2');
// }
// function f3(){
//   console.log('f3');
// }

// function run(){
//   let arrayOfFunctions = [];

//   arrayOfFunctions.push(f1);
//   arrayOfFunctions.push(f2);
//   arrayOfFunctions.push(f3);
//   arrayOfFunctions.push(f2);

//   for (let i=0; i<arrayOfFunctions.length; i++){
//     arrayOfFunctions[i]();
//   }
// }


// run();