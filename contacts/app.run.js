import ContactsService from './contacts.service';
import {
  reRenderContactsListHTML,
  reRenderFavouritesListHTML,
  changeDeleteAllButtonValueAndState,
  resetDeleteAllButtonValueAndState,
  clearCheckedBoxesHTML,
  clearFavouritesListHTML,
  geInput,
  setButtonEnabled,
  setButtonDisabled,
  clearFormInputs,
  addedSuccessfullyPerson,
  populateContactsListHTML,
  getElementById
} from './html-helper';
import {
  getTheNewPerson,
} from './buttons.helper';
import {
  getPersonIdByHTMLElementId,
  isEmpty,
  createPersonInstance
} from './helper';
import {
  CUSTOMS,
  MESSAGES,
  DOCUMENT_ELEMENTS
} from './constants';


function eventsHandlerContacts(event) {
  const targetId = event.target.id;
  const targetCustom = event.target.custom;
  const personId = getPersonIdByHTMLElementId(targetId); // eslint-disable-line
  const person = ContactsService.getPersonById(personId);
  switch (targetCustom) {
    case CUSTOMS.MINUS_BUTTON:
      ContactsService.getPersonById(personId).decrementLikes();
      reRenderContactsListHTML(person, targetCustom);
      reRenderFavouritesListHTML();
      break;
    case CUSTOMS.PLUS_BUTTON:
      ContactsService.getPersonById(personId).incrementLikes();
      reRenderContactsListHTML(person, targetCustom);
      reRenderFavouritesListHTML();
      break;
    case CUSTOMS.TRASH:
      if (confirm(MESSAGES.ARE_YOU_SURE)) { // eslint-disable-line 
        ContactsService.removePerson(personId);
        reRenderContactsListHTML(person, targetCustom);
        reRenderFavouritesListHTML();
      }
      break;
    case CUSTOMS.CHECKBOX:
      ContactsService.getPersonById(personId).setReversedChecked();
      changeDeleteAllButtonValueAndState();
      break;
    default:
      break;
  }
}


const deleteAllButtonAction = () => {
  if (confirm(MESSAGES.ARE_YOU_SURE)) { // eslint-disable-line
    ContactsService.deleteCheckedContacts();
    reRenderContactsListHTML();
    reRenderFavouritesListHTML();
    resetDeleteAllButtonValueAndState();
  } else {
    clearCheckedBoxesHTML();
    ContactsService.setAllToUnchecked();
    resetDeleteAllButtonValueAndState();
  }
};

const clearButtonAction = () => {
  ContactsService.setAllLikesToZero();
  reRenderContactsListHTML();
  clearFavouritesListHTML();
};


const changeAddButtonState = () => {
  const firstName = geInput(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.FIRST_NAME));
  const lastName = geInput(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.LAST_NAME));
  const imageProfile = geInput(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.IMAGE_PROFILE));
  if (!isEmpty(firstName) && !isEmpty(lastName) && !isEmpty(imageProfile)) {
    setButtonEnabled(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.ADD_BUTTON));
  } else {
    setButtonDisabled(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.ADD_BUTTON));
  }
};


const addNewPerson = () => {
  try {
    const NEW_PERSON_OBJECT = getTheNewPerson();
    const NEW_PERSON = createPersonInstance(NEW_PERSON_OBJECT);
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


// --------------------------------


reRenderFavouritesListHTML();

populateContactsListHTML();

changeDeleteAllButtonValueAndState();


window.ui = {
  eventsHandlerContacts,
  deleteAllButtonAction,
  clearButtonAction,
  addNewPerson,
  changeAddButtonState
};

window.onbeforeunload = ContactsService.saveContactsServiceToLocalStorage;
