 /*
description
*/



function getListOfContacts(){
    let array = [];
    return array;
  }
  
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
  
  // function that deletes the contact if you click on the trash icon
  function connectionsTrashImgDeleteCurrent() {
    let contacts = document.getElementsByClassName('person-field');
    for (let i=0 ;i<contacts.length; ++i){
      let trash = contacts[i].getElementsByClassName('trash')[0];
      trash.onclick = () => {
        trash.parentNode.remove();
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
    return firstName;
  }
  function getLastNameInput(){
    let lastName = document.getElementById('last-name').value;
    return lastName;
  }
  function getImageProfileInput(){
    let image = document.getElementById('image').value;
    return image;
  }
  
  function generateUniqueID() {
    let finalArray = [];
  
    var getRandChar = () => {
      let numbers = [];
      for (let i=97; i<123; i++){
        numbers.push(i);
      }
      let rand = Math.floor(Math.random()*100) % 26;
      return String.fromCharCode(numbers[rand]);
    }
  
    // suffle may be implemented
  
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
  
    let plusButton = document.createElement('button');
    plusButton.innerHTML = '+';
    newLi.appendChild(plusButton);
  
    let fav_count = document.createElement('div');
    fav_count.className = 'favs-count'
    fav_count.innerHTML = 0;
    newLi.appendChild(fav_count);
  
    let minusButton = document.createElement('button');
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
    let first_name = document.createElement('span');
    let last_name = document.createElement('span');
  
    newLi
  
    ul.appendChild(newLi);
  }
  
  function addNewPerson() {
    // get the data from the form
    // create a new person
    let id = generateUniqueID();
    let firstName = getFirstNameInput();
    let lastName = getLastNameInput();
    let image = getImageProfileInput();
  
    let newPerson = new Person(id, firstName, lastName, image);
  
    console.log( 'created -> ' + newPerson.getFullName());
    addToHTMLNewPerson(newPerson);
    console.log( 'added -> ' + newPerson.getFullName());
  
  }
  
  function makeAllConections(){
    document.getElementById('delete-all-button').onclick = deleteSelectedContacts;
    connectionsTrashImgDeleteCurrent();
    document.getElementById('add-button').onclick = addNewPerson;
  }
  
  function main(){
    // fill the contact list
    makeAllConections();
  }
  
  main();
  
  
  