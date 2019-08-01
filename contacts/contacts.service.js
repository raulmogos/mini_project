import {
  data
} from './data';
import {
  Person
} from './entities';
import {
  CONTACTS_SERVICE_OBJECT_NAME,
  UTILS,
  MESSAGES
} from './constants';
import {
  createPersonInstance,
  localStorageService
} from './helper';


export class ContactsService {

  constructor() {
    this.internalArrayContacts = [];
    this.init();
  }

  init = () => {
    const localStorageObject = localStorageService.getFromLocalStorage(CONTACTS_SERVICE_OBJECT_NAME);
    this.internalArrayContacts = (localStorageObject && localStorageObject.length) ? localStorageObject.map(item =>
      createPersonInstance(item)) : data.map(item => createPersonInstance(item)); // eslint-disable-line
  }

  getPersonById = (personId) => {
    const toReturnObject = this.internalArrayContacts.find(item => item.id === personId);
    if (!toReturnObject) {
      throw new Error(`${personId}${MESSAGES.DOES_NOT_EXIST}`);
    }
    return toReturnObject;
  }

  addPerson = (person) => {
    if (!(person instanceof Person)) {
      throw new Error(`${person}${MESSAGES.NOT_INSTANCE}`);
    }
    this.internalArrayContacts.unshift(person);
  }

  removePerson = (personId) => {
    const index = this.internalArrayContacts.map(x => x.id).indexOf(personId);
    if (index === UTILS.NOT_FOUND) {
      throw new Error(`${personId}${MESSAGES.DOES_NOT_EXIST}`);
    }
    this.internalArrayContacts.splice(index, 1);
  }

  arePersonsWithLikes = () => this.internalArrayContacts.some(item => item.likes);

  saveContactsServiceToLocalStorage = () => {
    localStorageService.saveToLocalStorage(CONTACTS_SERVICE_OBJECT_NAME, this.internalArrayContacts);
  }

  setAllLikesToZero = () => {
    this.internalArrayContacts.forEach((person) => {
      person.setToZero();
    });
  }

  setAllToUnchecked = () => {
    this.internalArrayContacts.forEach((person) => {
      person.setUnchecked();
    });
  };

  areContactsChecked = () => this.internalArrayContacts.some(person => person.isChecked);

  getCheckedContacts = () => this.internalArrayContacts.filter(person => person.isChecked);

  getNumberSelectedContacts = () => this.internalArrayContacts.filter(person => person.isChecked).length;

  deleteCheckedContacts = () => {
    this.internalArrayContacts.filter(person => person.isChecked).forEach((person) => {
      this.removePerson(person.id);
    });
  };


  get getTopFavsListMap() {
    const arrayContactsCopy = [...this.internalArrayContacts];
    arrayContactsCopy.sort((p1, p2) => p1.likes - p2.likes);
    const favsMap = {};
    arrayContactsCopy.forEach((person) => {
      if (!favsMap[person.likes]) {
        favsMap[person.likes] = [];
      }
      favsMap[person.likes].push(person);
    });
    Object.keys(favsMap).forEach((key) => {
      favsMap[key].sort((person1, person2) => person1.fullName > person2.fullName ? 1 : -1); // eslint-disable-line
    });
    return favsMap;
  }

}

export default new ContactsService();
