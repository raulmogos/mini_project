import ContactsService from './contacts.service';
import {
  reRenderContactsListHTML,
  reRenderFavouritesListHTML
} from './html-helper';
import {
  eventsHandlerContacts
} from './contacts-handle';
import {
  deleteAllButtonAction,
  clearButtonAction,
  addNewPerson,
  changeAddButtonState
} from './buttons.helper';


const main = () => {

  reRenderFavouritesListHTML();

  reRenderContactsListHTML();

};


main();


window.ui = {
  eventsHandlerContacts,
  deleteAllButtonAction,
  clearButtonAction,
  addNewPerson,
  changeAddButtonState
};

window.onbeforeunload = ContactsService.saveContactsServiceToLocalStorage;
