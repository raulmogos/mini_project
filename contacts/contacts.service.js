import {
  data
} from './data';
import {
  Person
} from './entities';
import {
  CONTACTS_SERVICE_OBJECT_NAME
} from './constants';


const localStorageServie = {
  saveToLocalStorage: (stringName, object) => {
    localStorage.setItem(stringName, JSON.stringify(object));
  },
  getFromLocalStorage: stringName => JSON.parse(localStorage.getItem(stringName))
};

export class ContactsService {

  constructor() {
    this.internalArrayContacts = [];
    this.init();
  }

  init = () => {
    const localStorageObject = localStorageServie.getFromLocalStorage(CONTACTS_SERVICE_OBJECT_NAME);
    if (localStorageObject !== null && localStorageObject.internalArrayContacts.length !== 0) {
      this.internalArrayContacts = localStorageObject.internalArrayContacts.map(item => new Person(item));
    } else {
      this.internalArrayContacts = data.map(item => new Person(item));
    }
  }

  getPersonById = (personId) => {
    const toReturnObject = this.internalArrayContacts.find(item => item.id === personId);
    if (toReturnObject === undefined) {
      throw new Error(`${personId} does not exist`);
    }
    return toReturnObject;
  }

  // add

  addPerson = (person) => {
    if (!(person instanceof Person)) {
      throw new Error(`${person} is not a 'Person' instance`);
    }
    this.internalArrayContacts.unshift(person);
  }

  // remove one  person

  removePerson = (personId) => {
    const index = this.internalArrayContacts.map(x => x.id).indexOf(personId);
    if (index === -1) {
      throw new Error(`${personId} does not exist`);
    }
    this.internalArrayContacts.splice(index, 1);
  }

  // arePersonsWithLikes -> true / false

  arePersonsWithLikes = () => this.internalArrayContacts.some(item => item.likes !== 0);

  // save all to local storage

  saveContactsServiceToLocalStorage = () => {
    localStorageServie.saveToLocalStorage(CONTACTS_SERVICE_OBJECT_NAME, this);
  }

  printAll = () => {
    this.internalArrayContacts.forEach((item) => {
      console.log(item); // eslint-disable-line
    });
  }

}

export default new ContactsService();
