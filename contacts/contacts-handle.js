import {
  reRenderContactsListHTML,
  changeDeleteAllButtonValueAndState,
  reRenderFavouritesListHTML
} from './html-helper';
import {
  getPersonIdByHTMLElementId
} from './helper';
import {
  CUSTOMS,
  MESSAGES
} from './constants';
import ContactService from './contacts.service';


export function eventsHandlerContacts(event) {
  const TARGET_ID = event.target.id;
  const TARGET_CUSTOM = event.target.custom;
  const PERSON_ID = getPersonIdByHTMLElementId(TARGET_ID); // eslint-disable-line
  switch (TARGET_CUSTOM) {
    case CUSTOMS.MINUS_BUTTON:
      ContactService.getPersonById(PERSON_ID).decrementLikes();
      reRenderContactsListHTML();
      reRenderFavouritesListHTML();
      break;
    case CUSTOMS.PLUS_BUTTON:
      ContactService.getPersonById(PERSON_ID).incrementLikes();
      reRenderContactsListHTML();
      reRenderFavouritesListHTML();
      break;
    case CUSTOMS.TRASH:
      if (confirm(MESSAGES.ARE_YOU_SURE)) { // eslint-disable-line 
        ContactService.removePerson(PERSON_ID);
        reRenderContactsListHTML();
        reRenderFavouritesListHTML();
      }
      break;
    case CUSTOMS.CHECKBOX:
      changeDeleteAllButtonValueAndState();
      break;
    default:
      break;
  }
}
