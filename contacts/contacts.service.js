import {
  data
} from './data';
import {
  isPersonObjectEquivalent
} from './entities';
import {
  CONTACTS_SERVICE_OBJECT_NAME,
  MESSAGES
} from './constants';
import {
  createPersonInstance,
  localStorageService
} from './helper';
import {
  DuplicateError
} from './exceptions';


export class ContactsService {

  constructor() {
    this.internalArrayContacts = [];
    this.init();
  }

  init = () => {
    const localStorageObject = localStorageService.getFromLocalStorage(CONTACTS_SERVICE_OBJECT_NAME);
    if (localStorageObject && localStorageObject.length) {
      this.internalArrayContacts = localStorageObject.map(item => createPersonInstance(item));
    } else {
      this.internalArrayContacts = data.map(item => createPersonInstance(item));
    }
  }

  getPersonById = personId => this.internalArrayContacts.find(item => item.id === personId);

  isPersonInRepo = person => this.internalArrayContacts.some(x => isPersonObjectEquivalent(x, person));

  addPerson = (person) => {
    if (this.isPersonInRepo(person)) {
      throw new DuplicateError(MESSAGES.EXISTS);
    }
    this.internalArrayContacts.unshift(person);
  }

  removePerson = (personId) => {
    const index = this.internalArrayContacts.findIndex(x => x.id === personId);
    this.internalArrayContacts.splice(index, 1);
  };

  arePersonsWithLikes = () => this.internalArrayContacts.some(item => item.likes);

  saveContactsServiceToLocalStorage =
    () => localStorageService.saveToLocalStorage(CONTACTS_SERVICE_OBJECT_NAME, this.internalArrayContacts);

  setAllLikesToZero = () => this.internalArrayContacts.forEach(person => person.setToZero());

  setAllToUnchecked = () => this.internalArrayContacts.forEach(person => person.setUnchecked())

  areContactsChecked = () => this.internalArrayContacts.some(person => person.isChecked);

  getCheckedContacts = () => this.internalArrayContacts.filter(person => person.isChecked);

  getNumberSelectedContacts = () => this.internalArrayContacts.filter(person => person.isChecked).length;

  deleteCheckedContacts =
    () => this.internalArrayContacts.filter(person => person.isChecked).forEach(person => this.removePerson(person.id));

  get getTopFavsListMap() {
    const favsMap = {};
    const arrayContactsCopy = [...this.internalArrayContacts];
    arrayContactsCopy.sort((p1, p2) => p1.likes - p2.likes);
    arrayContactsCopy.forEach((person) => {
      if (!favsMap[person.likes]) {
        favsMap[person.likes] = [];
      }
      favsMap[person.likes].push(person);
    });
    Object.keys(favsMap).forEach(key => favsMap[key]
      .sort((person1, person2) => person1.fullName > person2.fullName ? 1 : -1)); // eslint-disable-line
    return favsMap;
  }

}

export default new ContactsService();
