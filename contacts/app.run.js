import ContactsService from './contacts.service';
import {
  reRenderContactsListHTML,
  reRenderFavouritesListHTML,
  changeDeleteAllButtonValueAndState,
  resetDeleteAllButtonValueAndState,
  clearCheckedBoxesHTML,
  clearFavouritesListHTML,
  getInputValue,
  setButtonStatus,
  clearFormInputs,
  addedSuccessfullyPerson,
  populateContactsListHTML,
  getElementById,
  confirmModal,
  notificationModal,
  changeClearButtonState,
  deletedSuccessfully
} from './html-helper';
import {
  getTheNewPerson
} from './buttons.helper';
import {
  getPersonIdByHTMLElementId,
  createPersonInstance
} from './helper';
import {
  CUSTOMS,
  MESSAGES,
  DOCUMENT_ELEMENTS
} from './constants';


function eventsHandlerContacts(event) {
  const targetCustom = event.target.custom;
  const personId = getPersonIdByHTMLElementId(event.target.id); // eslint-disable-line
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
      confirmModal(MESSAGES.ARE_YOU_SURE, () => {
        ContactsService.removePerson(personId);
        reRenderContactsListHTML(person, targetCustom);
        reRenderFavouritesListHTML();
        deletedSuccessfully(false, person);
      });
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
  confirmModal(MESSAGES.ARE_YOU_SURE, () => {
    ContactsService.deleteCheckedContacts();
    reRenderContactsListHTML();
    reRenderFavouritesListHTML();
    resetDeleteAllButtonValueAndState();
    deletedSuccessfully(true);
  }, () => {
    clearCheckedBoxesHTML();
    ContactsService.setAllToUnchecked();
    resetDeleteAllButtonValueAndState();
  });
};

const clearButtonAction = () => {
  ContactsService.setAllLikesToZero();
  reRenderContactsListHTML();
  clearFavouritesListHTML();
  changeClearButtonState();
};

const changeAddButtonState = () => {
  const firstName = getInputValue(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.FIRST_NAME));
  const lastName = getInputValue(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.LAST_NAME));
  const imageProfile = getInputValue(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.IMAGE_PROFILE));
  const areFieldsFilled = firstName && lastName && imageProfile;
  setButtonStatus(getElementById(DOCUMENT_ELEMENTS.ADD_FORM.ADD_BUTTON), areFieldsFilled);
};

const addNewPerson = () => {
  try {
    const newPersonObject = getTheNewPerson();
    const newPerson = createPersonInstance(newPersonObject);
    ContactsService.addPerson(newPerson);
    reRenderContactsListHTML();
    clearFormInputs();
    changeAddButtonState();
    addedSuccessfullyPerson(newPerson);
  } catch (err) {
    notificationModal(err.message);
  }
};

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
