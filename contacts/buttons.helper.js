import {
  MESSAGES,
  DOCUMENT_ELEMENTS,
  ZERO
} from './constants';
import ContactsService from './contacts.service';
import { // eslint-disable-line
  reRenderContactsListHTML,
  resetDeleteAllButtonValueAndState,
  clearFavouritesListHTML,
  geInput,
  setButtonDisabled,
  setButtonEnabled,
  clearFormInputs,
  addedSuccessfullyPerson,
  reRenderFavouritesListHTML
} from './html-helper';
import {
  getPersonIdByHTMLElementId,
  generateUniqueID,
  isEmpty,
  createPerson
} from './helper';
import {
  validateName,
  validateImageUrl
} from './validations';


const isCheckboxChecked = checkBoxId => document.getElementById(checkBoxId).checked;

const getSelectedContactsIDs = () => ContactsService.internalArrayContacts
  .map(person => person.checkBoxId)
  .filter(checkBoxId => isCheckboxChecked(checkBoxId))
  .map(checkedCheckBoxId => getPersonIdByHTMLElementId(checkedCheckBoxId));

const deleteSelectedContacts = () => {
  getSelectedContactsIDs().forEach(personId => ContactsService.removePerson(personId));
};

const setCheckboxUnchecked = (checkBoxId) => {
  document.getElementById(checkBoxId).checked = false;
};

const clearSelectedBoxes = () => {
  getSelectedContactsIDs()
    .map(personId => ContactsService.getPersonById(personId).checkBoxId)
    .forEach(checkBoxId => setCheckboxUnchecked(checkBoxId));
};


export const areContactsChecked = () => ContactsService.internalArrayContacts
  .map(person => person.checkBoxId)
  .some(checkBoxId => isCheckboxChecked(checkBoxId));


export const getNumberSelectedContacts = () => getSelectedContactsIDs().length;


export const deleteAllButtonAction = () => {
  if (confirm(MESSAGES.ARE_YOU_SURE)) { // eslint-disable-line
    deleteSelectedContacts();
    reRenderContactsListHTML();
    reRenderFavouritesListHTML();
    resetDeleteAllButtonValueAndState();
  } else {
    clearSelectedBoxes();
    resetDeleteAllButtonValueAndState();
  }
};


export const clearButtonAction = () => {
  ContactsService.setAllLikesToZero();
  reRenderContactsListHTML();
  clearFavouritesListHTML();
};


const getTheNewPerson = () => {
  const ID = generateUniqueID();
  const FIRST_NAME = geInput(DOCUMENT_ELEMENTS.ADD_FORM.FIRST_NAME);
  validateName(FIRST_NAME);
  const LAST_NAME = geInput(DOCUMENT_ELEMENTS.ADD_FORM.LAST_NAME);
  validateName(LAST_NAME);
  const IMAGE_PROFILE = geInput(DOCUMENT_ELEMENTS.ADD_FORM.IMAGE_PROFILE);
  validateImageUrl(IMAGE_PROFILE);
  const LIKES = ZERO;
  const OBJECT = {
    id: ID,
    firstName: FIRST_NAME,
    lastName: LAST_NAME,
    image: IMAGE_PROFILE,
    likes: LIKES
  };
  return OBJECT;
};


export const changeAddButtonState = () => {
  const FIRST_NAME = geInput(DOCUMENT_ELEMENTS.ADD_FORM.FIRST_NAME);
  const LAST_NAME = geInput(DOCUMENT_ELEMENTS.ADD_FORM.LAST_NAME);
  const IMAGE_PROFILE = geInput(DOCUMENT_ELEMENTS.ADD_FORM.IMAGE_PROFILE);
  if (!isEmpty(FIRST_NAME) && !isEmpty(LAST_NAME) && !isEmpty(IMAGE_PROFILE)) {
    setButtonEnabled(DOCUMENT_ELEMENTS.ADD_FORM.ADD_BUTTON);
  } else {
    setButtonDisabled(DOCUMENT_ELEMENTS.ADD_FORM.ADD_BUTTON);
  }
};


export const addNewPerson = () => {
  try {
    const NEW_PERSON_OBJECT = getTheNewPerson();
    const NEW_PERSON = createPerson(NEW_PERSON_OBJECT);
    ContactsService.addPerson(NEW_PERSON);
    reRenderContactsListHTML();
    clearFormInputs();
    changeAddButtonState();
    addedSuccessfullyPerson(NEW_PERSON);
  } catch (err) {
    alert(err.message); // eslint-disable-line
    clearFormInputs();
  }
};
