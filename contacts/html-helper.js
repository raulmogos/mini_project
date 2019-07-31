import {
  DOCUMENT_ELEMENTS,
  MAX_NUMBER_OF_LIKES,
  MIN_NUMBER_OF_LIKES,
  TAGS,
  CALSSES,
  SYMBOLS,
  CUSTOMS,
  ALT,
  TYPES,
  IMAGES,
  MESSAGES,
  NUMBER_TOP,
  EMPTY
} from './constants';
import ContactsService from './contacts.service';
import { // eslint-disable-line
  areContactsChecked,
  getNumberSelectedContacts
} from './buttons.helper';


const createListItemPersonHTML = (parent, person) => {
  const newLi = document.createElement(TAGS.LIST_ITEM);
  newLi.className = CALSSES.PERSON_FIELD;
  newLi.id = person.listItemId;
  parent.appendChild(newLi);
  return newLi;
};

const isCountEqualToMax = person => person.likes === MAX_NUMBER_OF_LIKES; // MOVE TO HELPER.JS

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

const isCountEqualToMin = person => person.likes === MIN_NUMBER_OF_LIKES; // MOVE TO HELPER.JS

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
  checkbox.disabled = false;
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
  DOCUMENT_ELEMENTS.CONTACTS.CONTACTS_LIST.innerHTML = EMPTY;
};

const populateContactsListHTML = () => {
  ContactsService.internalArrayContacts.forEach(element => addToHTMLNewPerson(element));
};


export const reRenderContactsListHTML = () => {
  clearContactsListHTML();
  populateContactsListHTML();
};


export const resetDeleteAllButtonValueAndState = () => {
  DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON.innerHTML = MESSAGES.DELETE_ALL;
  DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON.disabled = true;
};


export const setButtonDisabled = (button) => {
  button.disabled = true; // eslint-disable-line
};


export const setButtonEnabled = (button) => {
  button.disabled = false; // eslint-disable-line
};


export const changeDeleteAllButtonValueAndState = () => {
  const NUMBER_CHECKED_CONTACTS = getNumberSelectedContacts();
  if (areContactsChecked()) {
    DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON.innerHTML = `${MESSAGES.DELETE_ALL_PREFIX}${NUMBER_CHECKED_CONTACTS}`;
    setButtonEnabled(DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON);
  } else {
    DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON.innerHTML = MESSAGES.DELETE_ALL_PREFIX;
    setButtonDisabled(DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON);
  }
};


export const clearFavouritesListHTML = () => {
  DOCUMENT_ELEMENTS.FAVOURITES.FAVS_LIST.innerHTML = EMPTY;
};


const creatParagraphForNumber = (parent, number) => {
  const p = document.createElement(TAGS.PARAGRAPH);
  p.innerHTML = number;
  p.className = CALSSES.ALIGN_CENTER;
  parent.appendChild(p);
};

const populateFavouritesListHTML = () => {
  const NUMBERS = Object.keys(ContactsService.getTopFavsListMap).sort().reverse();
  NUMBERS.forEach((number, i) => {
    if (i >= NUMBER_TOP) return;
    creatParagraphForNumber(DOCUMENT_ELEMENTS.FAVOURITES.FAVS_LIST, number);
    ContactsService.getTopFavsListMap[number].forEach((person) => {
      const li = createListItemPersonHTML(DOCUMENT_ELEMENTS.FAVOURITES.FAVS_LIST, person);
      createCountLikesPersonHTML(li, person);
      createAvatarImagePersonHTML(li, person);
      createFullNamePersonHTML(li, person);
    });
  });
};


export const reRenderFavouritesListHTML = () => {
  clearFavouritesListHTML();
  if (ContactsService.arePersonsWithLikes()) {
    populateFavouritesListHTML();
  }
};


export const geInput = element => element.value;


export const clearFormInputs = () => {
  DOCUMENT_ELEMENTS.ADD_FORM.ADD_FORM_MAIN.reset();
};


export const addedSuccessfullyPerson = (person) => {
  alert(`${person.fullName}${MESSAGES.ADDED_SUCCESSFULLY_SUFIX}`); // eslint-disable-line
};
