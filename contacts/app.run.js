import ContactsService from './contacts.service';
import { reRenderContactsListHTML } from './html-helper';
import { eventsHandlerContacts } from './contacts-handle';


const main = () => {

  ContactsService.printAll();
  
  reRenderContactsListHTML();
  
  ContactsService.saveContactsServiceToLocalStorage();

};


main();


window.ui = {
  eventsHandlerContacts
};
