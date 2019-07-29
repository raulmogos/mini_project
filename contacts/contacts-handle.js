import { getPersonObjectByHTMLElementId } from './html-helper';
import {
  CUSTOMS
} from './constants';


export function eventsHandlerContacts(event) {
  const TARGET_ID = event.target.id;
  const TARGET_CUSTOM = event.target.custom;
  const PERSON_ID = getPersonObjectByHTMLElementId(TARGET_ID); // eslint-disable-line
  switch (TARGET_CUSTOM) {
    case CUSTOMS.MINUS_BUTTON:
      console.log('minus button'); // eslint-disable-line
      break;
    case CUSTOMS.PLUS_BUTTON:
      console.log('plus button'); // eslint-disable-line
      break;
    case CUSTOMS.TRASH:
      console.log('trash'); // eslint-disable-line
      break;
    case CUSTOMS.CHECKBOX:
      console.log('checkbox'); // eslint-disable-line
      break;
    default:
      break;
  }
}
