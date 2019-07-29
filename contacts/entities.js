import {
  PREFIXES_ID_CONTACTS
} from './constants';

// person entity
export class Person {
  constructor(person) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.image = person.image;
    this.likes = person.likes;
  }
  
  get listItemId() {
    return `${PREFIXES_ID_CONTACTS.LIST_ITEM}${this.id}`;
  }

  get plusButtonId() {
    return `${PREFIXES_ID_CONTACTS.PLUS_BUTTON}${this.id}`;
  }

  get minusButtonId() {
    return `${PREFIXES_ID_CONTACTS.MINUS_BUTTON}${this.id}`;
  }

  get likesCountId() {
    return `${PREFIXES_ID_CONTACTS.COUNTER}${this.id}`;
  }

  get imageId() {
    return `${PREFIXES_ID_CONTACTS.IMAGE}${this.id}`;
  }

  get checkBoxId() {
    return `${PREFIXES_ID_CONTACTS.CHECKBOX}${this.id}`;
  }

  get fullNameId() {
    return `${PREFIXES_ID_CONTACTS.FULL_NAME}${this.id}`;
  }

  get trashId() {
    return `${PREFIXES_ID_CONTACTS.TRASH}${this.id}`;
  }
}
