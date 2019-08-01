import {
  data
} from './data';
import {
  Person
} from './entities';
import {
  CONTACTS_SERVICE_OBJECT_NAME,
  NOT_FOUND,
  MESSAGES
} from './constants';
import {
  sortArrayAlphabetically,
  sortArrayByLikes,
  isUndefined,
  isZero,
  isNull,
  createPersonInstance,
  localStorageServie
} from './helper';


export class ContactsService {

  constructor() {
    this.internalArrayContacts = [];
    this.init();
  }

  init = () => {
    const localStorageObject = localStorageServie.getFromLocalStorage(CONTACTS_SERVICE_OBJECT_NAME);
    if (!isNull(localStorageObject) && !isZero(localStorageObject.length)) {
      this.internalArrayContacts = localStorageObject.map(item => createPersonInstance(item));
    } else {
      this.internalArrayContacts = data.map(item => createPersonInstance(item));
    }
    // this.internalArrayContacts = [];
  }

  getPersonById = (personId) => {
    // returns an object of type Person
    const toReturnObject = this.internalArrayContacts.find(item => item.id === personId);
    if (isUndefined(toReturnObject)) {
      throw new Error(`${personId}${MESSAGES.DOES_NOT_EXIST}`);
    }
    return toReturnObject;
  }

  // add

  addPerson = (person) => {
    if (!(person instanceof Person)) {
      throw new Error(`${person}${MESSAGES.NOT_INSTANCE}`);
    }
    this.internalArrayContacts.unshift(person);
  }

  // remove one  person

  removePerson = (personId) => {
    const index = this.internalArrayContacts.map(x => x.id).indexOf(personId);
    if (index === NOT_FOUND) {
      throw new Error(`${personId}${MESSAGES.DOES_NOT_EXIST}`);
    }
    this.internalArrayContacts.splice(index, 1);
  }

  // arePersonsWithLikes -> true / false

  arePersonsWithLikes = () => this.internalArrayContacts.some(item => !isZero(item.likes));

  // save all to local storage

  saveContactsServiceToLocalStorage = () => {
    localStorageServie.saveToLocalStorage(CONTACTS_SERVICE_OBJECT_NAME, this.internalArrayContacts);
  }

  // set all  likes to zero

  setAllLikesToZero = () => {
    this.internalArrayContacts.forEach((person) => {
      person.setToZero();
    });
  }

  // set all isChecked to false

  setAllToUnchecked = () => {
    this.internalArrayContacts.forEach((person) => {
      person.setUnchecked();
    });
  };

  // are contacts with isChecked == true

  areContactsChecked = () => this.internalArrayContacts.some(person => person.isChecked);

  // get selected contacts

  getCheckedContacts = () => this.internalArrayContacts.filter(person => person.isChecked);

  //

  getNumberSelectedContacts = () => this.internalArrayContacts.filter(person => person.isChecked).length;

  // delete checked contacts

  deleteCheckedContacts = () => {
    this.internalArrayContacts.filter(person => person.isChecked).forEach((person) => {
      this.removePerson(person.id);
    });
  };

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
    console.log('-----------------'); // eslint-disable-line
    this.getCheckedContacts().forEach((item) => {
      console.log(item); // eslint-disable-line
    });
  }

}

export default new ContactsService();
