import {
  DOCUMENT_ELEMENTS,
  TAGS,
  CLASSES,
  SYMBOLS,
  CUSTOMS,
  ALT,
  TYPES,
  IMAGES,
  MESSAGES,
  NUMBER_TOP,
  UTILS
} from './constants';
import ContactsService from './contacts.service';
import { isCountEqualToMax, isCountEqualToMin } from './helper.js';


export const getElementById = name => document.getElementById(name);


const createListItemPersonHTML = (parent, person) => {
  const newLi = document.createElement(TAGS.LIST_ITEM);
  newLi.className = CLASSES.PERSON_FIELD;
  newLi.id = person.listItemId;
  parent.appendChild(newLi);
  return newLi;
};

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
  favCount.className = CLASSES.FAVS_COUNT;
  favCount.innerHTML = person.likes;
  parent.appendChild(favCount);
};

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
  image.className = CLASSES.AVATAR;
  parent.appendChild(image);
};

const createCheckboxPersonHTML = (parent, person) => {
  const checkbox = document.createElement(TAGS.INPUT);
  checkbox.type = TYPES.CHECKBOX;
  checkbox.custom = CUSTOMS.CHECKBOX;
  checkbox.id = person.checkBoxId;
  checkbox.disabled = false;
  checkbox.checked = person.isChecked;
  parent.appendChild(checkbox);
};

const createFullNamePersonHTML = (parent, person) => {
  const fullName = document.createElement(TAGS.SPAN);
  fullName.id = person.fullNameId;
  fullName.className = CLASSES.FULL_NAME;
  const firstName = document.createElement(TAGS.SPAN);
  firstName.innerHTML = person.firstName;
  firstName.className = CLASSES.MARGIN_RIGHT;
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
  trash.className = CLASSES.TRASH;
  parent.appendChild(trash);
};

const addToHTMLNewPerson = (person) => {
  const newLi = createListItemPersonHTML(getElementById(DOCUMENT_ELEMENTS.CONTACTS.CONTACTS_LIST), person);
  createPlusButtonPersonHTML(newLi, person);
  createCountLikesPersonHTML(newLi, person);
  createMinusButtonPersonHTML(newLi, person);
  createAvatarImagePersonHTML(newLi, person);
  createCheckboxPersonHTML(newLi, person);
  createFullNamePersonHTML(newLi, person);
  createTrashPersonHTML(newLi, person);
  getElementById(DOCUMENT_ELEMENTS.CONTACTS.CONTACTS_LIST).appendChild(newLi);
};


export const populateContactsListHTML = () => {
  ContactsService.internalArrayContacts.forEach(element => addToHTMLNewPerson(element));
};


const reDrawContactsList = (person = 0, target = 0) => {
  switch (target) {
    case CUSTOMS.MINUS_BUTTON:
      document.getElementById(person.likesCountId).innerHTML = person.likes;
      document.getElementById(person.minusButtonId).disabled = isCountEqualToMin(person);
      document.getElementById(person.plusButtonId).disabled = isCountEqualToMax(person);
      break;
    case CUSTOMS.PLUS_BUTTON:
      document.getElementById(person.likesCountId).innerHTML = person.likes;
      document.getElementById(person.minusButtonId).disabled = isCountEqualToMin(person);
      document.getElementById(person.plusButtonId).disabled = isCountEqualToMax(person);
      break;
    case CUSTOMS.TRASH:
      document.getElementById(person.listItemId).remove();
      break;
    default:
      break;
  }
};


export const reRenderContactsListHTML = (person = 0, target = 0) => {
  if (person === 0 && target === 0) {
    getElementById(DOCUMENT_ELEMENTS.CONTACTS.CONTACTS_LIST).innerHTML = UTILS.EMPTY_STRING;
    populateContactsListHTML();
  }
  reDrawContactsList(person, target);
};


export const setButtonStatus = (button, status) => {
  button.disabled = !status; // eslint-disable-line
};


export const resetDeleteAllButtonValueAndState = () => {
  getElementById(DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON).innerHTML = MESSAGES.DELETE_ALL;
  setButtonStatus(getElementById(DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON), false);
};


export const changeDeleteAllButtonValueAndState = () => {
  const numberCheckedConstants = ContactsService.getNumberSelectedContacts();
  const deleteAllButton = getElementById(DOCUMENT_ELEMENTS.CONTACTS.DELETE_ALL_BUTTON);
  if (ContactsService.areContactsChecked()) {
    deleteAllButton.innerHTML = `${MESSAGES.DELETE_ALL_PREFIX}${numberCheckedConstants}`;
    setButtonStatus(deleteAllButton, true);
  } else {
    deleteAllButton.innerHTML = MESSAGES.DELETE_ALL_PREFIX;
    setButtonStatus(deleteAllButton, false);
  }
};


export const clearFavouritesListHTML = () => {
  getElementById(DOCUMENT_ELEMENTS.FAVOURITES.FAVS_LIST).innerHTML = UTILS.EMPTY_STRING;
};


const creatParagraphForNumber = (parent, number) => {
  const p = document.createElement(TAGS.PARAGRAPH);
  p.innerHTML = number;
  p.className = CLASSES.ALIGN_CENTER;
  parent.appendChild(p);
};

const populateFavouritesListHTML = () => {
  const numbers = Object.keys(ContactsService.getTopFavsListMap).sort((a, b) => b - a);
  numbers.forEach((number, i) => {
    if (i >= NUMBER_TOP) return;
    creatParagraphForNumber(getElementById(DOCUMENT_ELEMENTS.FAVOURITES.FAVS_LIST), number);
    ContactsService.getTopFavsListMap[number].forEach((person) => {
      const li = createListItemPersonHTML(getElementById(DOCUMENT_ELEMENTS.FAVOURITES.FAVS_LIST), person);
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
  getElementById(DOCUMENT_ELEMENTS.ADD_FORM.ADD_FORM_MAIN).reset();
};


export const addedSuccessfullyPerson = (person) => {
  alert(`${person.fullName}${MESSAGES.ADDED_SUCCESSFULLY_SUFIX}`); // eslint-disable-line
};


export const isCheckboxChecked = checkBoxId => document.getElementById(checkBoxId).checked;


export const setCheckboxUnchecked = (checkBoxId) => {
  document.getElementById(checkBoxId).checked = false;
};


export const clearCheckedBoxesHTML = () => {
  ContactsService.getCheckedContacts().forEach((person) => {
    setCheckboxUnchecked(person.checkBoxId);
  });
};
