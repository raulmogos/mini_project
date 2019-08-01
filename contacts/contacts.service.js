import {
  data
} from './data';
import {
} from './entities';
import {
  CONTACTS_SERVICE_OBJECT_NAME,
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

  getPersonById = personId => this.internalArrayContacts.find(item => item.id === personId);

  addPerson = person => this.internalArrayContacts.unshift(person);

  removePerson = (personId) => {
    this.internalArrayContacts.splice(this.internalArrayContacts.findIndex(x => x.id === personId), 1);
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
    const arrayContactsCopy = [...this.internalArrayContacts];
    arrayContactsCopy.sort((p1, p2) => p1.likes - p2.likes);
    const favsMap = {};
    arrayContactsCopy.forEach((person) => {
      if (!favsMap[person.likes]) {
        favsMap[person.likes] = [];
      }
      favsMap[person.likes].push(person);
    });
    Object.keys(favsMap).forEach(key => favsMap[key]
      .sort((person1, person2) => person1.fullName > person2.fullName ? 1 : -1));  // eslint-disable-line
    return favsMap;
  }

}

export default new ContactsService();
