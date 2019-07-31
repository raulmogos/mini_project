import {
  data
} from './data';
import {
  Person
} from './entities';
import {
  CONTACTS_SERVICE_OBJECT_NAME,
  NOT_FOUND,
  ZERO
} from './constants';
import { sortArrayAlphabetically, sortArrayByLikes, isUndefined } from './helper';


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
    if (localStorageObject !== null && localStorageObject.length !== ZERO) {
      this.internalArrayContacts = localStorageObject.map(item => new Person(item));
    } else {
      this.internalArrayContacts = data.map(item => new Person(item));
    }
    // this.internalArrayContacts = [];
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
    if (index === NOT_FOUND) {
      throw new Error(`${personId} does not exist`);
    }
    this.internalArrayContacts.splice(index, 1);
  }

  // arePersonsWithLikes -> true / false

  arePersonsWithLikes = () => this.internalArrayContacts.some(item => item.likes !== 0);

  // save all to local storage

  saveContactsServiceToLocalStorage = () => {
    localStorageServie.saveToLocalStorage(CONTACTS_SERVICE_OBJECT_NAME, this.internalArrayContacts);
  }

  // set all  likes to zero

  setAllLikesToZero = () => {
    this.internalArrayContacts.forEach((person) => {
      person.likes = ZERO; // eslint-disable-line
    });
  }

  // get top

  get getTopFavsListMap() {
    const ARRAY_CONTACTS_COPY = [...this.internalArrayContacts];
    sortArrayByLikes(ARRAY_CONTACTS_COPY);
    const FAVS_MAP = {};
    ARRAY_CONTACTS_COPY.forEach((person) => {
      if (isUndefined(FAVS_MAP[person.likes])) {
        FAVS_MAP[person.likes] = [];
      }
      FAVS_MAP[person.likes].push(person);
    });
    Object.keys(FAVS_MAP).forEach((key) => {
      sortArrayAlphabetically(FAVS_MAP[key]);
    });
    return FAVS_MAP;
  }

  printAll = () => {
    this.internalArrayContacts.forEach((item) => {
      console.log(item); // eslint-disable-line
    });
  }

}

export default new ContactsService();
