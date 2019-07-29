import {
  ID_CONSTANTS,
  DOCUMENT_ELEMENTS,
  MAX_NUMBER_OF_LIKES,
  MIN_NUMBER_OF_LIKES,
  TAGS,
  CALSSES,
  SYMBOLS,
  CUSTOMS,
  ALT,
  TYPES,
  IMAGES
} from './constants';
import ContactsService from './contacts.service';


const isString = string => typeof string === 'string';

export const getPersonObjectByHTMLElementId = (htmlElementId) => {
  // we know that the last ID_LENGTH characters in htmlId related to a
  // person object is the id the of the the person object
  if (!isString(htmlElementId)) {
    throw new Error(`${htmlElementId} is not a string instance`);
  }
  if (htmlElementId.length <= ID_CONSTANTS.ID_LENGTH) {
    throw new Error(`${htmlElementId} has no person id in it`);
  }
  return htmlElementId.slice(htmlElementId - ID_CONSTANTS.ID_LENGTH);
};


const createListItemPersonHTML = (parent, person) => {
  const newLi = document.createElement(TAGS.LIST_ITEM);
  newLi.className = CALSSES.PERSON_FIELD;
  newLi.id = person.listItemId;
  parent.appendChild(newLi);
  return newLi;
};

const isCountEqualToMax = person => person.id === MAX_NUMBER_OF_LIKES;

const createPlusButtonPersonHTML = (parent, person) => {
  const plusButton = document.createElement(TAGS.BUTTON);
  plusButton.id = person.plusButtonId;
  plusButton.innerHTML = SYMBOLS.PLUS;
  plusButton.custom = CUSTOMS.PLUS_BUTTON;
  plusButton.disabled = isCountEqualToMax(person);
  parent.appendChild(plusButton);
};

const createCountLikesPersonHTML = (parent, person) => {
  const favCount = document.createElement(TAGS.DIV);
  favCount.id = person.likesCountId;
  favCount.className = CALSSES.FAVS_COUNT;
  favCount.innerHTML = person.likes;
  parent.appendChild(favCount);
};

const isCountEqualToMin = person => person.id === MIN_NUMBER_OF_LIKES;

const createMinusButtonPersonHTML = (parent, person) => {
  const minusButton = document.createElement(TAGS.BUTTON);
  minusButton.id = person.minusButtonId;
  minusButton.innerHTML = SYMBOLS.MINUS;
  minusButton.custom = CUSTOMS.MINUS_BUTTON;
  minusButton.disabled = isCountEqualToMin(person);
  parent.appendChild(minusButton);
};

const createAvatarImagePersonHTML = (parent, person) => {
  const image = document.createElement(TAGS.IMAGE);
  image.src = person.image;
  image.alt = ALT.PIC;
  image.className = CALSSES.AVATAR;
  parent.appendChild(image);
};

const createCheckboxPersonHTML = (parent, person) => {
  const checkbox = document.createElement(TAGS.INPUT);
  checkbox.type = TYPES.CHECKBOX;
  checkbox.custom = CUSTOMS.CHECKBOX;
  checkbox.id = person.checkBoxId;
  parent.appendChild(checkbox);
};

const createFullNamePersonHTML = (parent, person) => {
  const fullName = document.createElement(TAGS.SPAN);
  fullName.id = person.fullNameId;
  fullName.className = CALSSES.FULL_NAME;
  const firstName = document.createElement(TAGS.SPAN);
  firstName.innerHTML = person.firstName;
  firstName.className = CALSSES.MARGIN_RIGHT;
  fullName.appendChild(firstName);
  const lastName = document.createElement(TAGS.SPAN);
  lastName.innerHTML = person.lastName;
  fullName.appendChild(lastName);
  parent.appendChild(fullName);
};

const createTrashPersonHTML = (parent, person) => {
  const trash = document.createElement(TAGS.IMAGE);
  trash.id = person.trashId;
  trash.src = IMAGES.TRASH;
  trash.alt = ALT.TRASH;
  trash.custom = CUSTOMS.TRASH;
  trash.className = CALSSES.TRASH;
  parent.appendChild(trash);
};

const addToHTMLNewPerson = (person) => {
  const newLi = createListItemPersonHTML(DOCUMENT_ELEMENTS.CONTACTS.CONTACTS_LIST, person);
  createPlusButtonPersonHTML(newLi, person);
  createCountLikesPersonHTML(newLi, person);
  createMinusButtonPersonHTML(newLi, person);
  createAvatarImagePersonHTML(newLi, person);
  createCheckboxPersonHTML(newLi, person);
  createFullNamePersonHTML(newLi, person);
  createTrashPersonHTML(newLi, person);
  DOCUMENT_ELEMENTS.CONTACTS.CONTACTS_LIST.appendChild(newLi);
};

const clearContactsListHTML = () => {
  DOCUMENT_ELEMENTS.CONTACTS.CONTACTS_LIST.innerHTML = '';
};

const populateContactsListHTML = () => {
  ContactsService.internalArrayContacts.forEach(element => addToHTMLNewPerson(element));
};

export const reRenderContactsListHTML = () => {
  clearContactsListHTML();
  populateContactsListHTML();
};
