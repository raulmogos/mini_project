import {
  ALPHABET_ARRAY,
  ID_CONSTANTS,
  NINE,
  EMPTY,
  ZERO,
  ONE,
  MINUS_ONE
} from './constants';
import { Person } from './entities';


const getRandomNumber = upperBound => Math.floor(Math.random() * upperBound) % upperBound;

const shuffleArray = (inputArray) => {
  const ARRAY_LENTGH = inputArray.length;
  for (let i = ZERO; i < ARRAY_LENTGH; i++) {
    const RAND_NUMBER_1 = getRandomNumber(ARRAY_LENTGH);
    const RAND_NUMBER_2 = getRandomNumber(ARRAY_LENTGH);
    [inputArray[RAND_NUMBER_1], inputArray[RAND_NUMBER_2]] = [inputArray[RAND_NUMBER_2], inputArray[RAND_NUMBER_1]]; // eslint-disable-line
  }
};

const getRandomChar = () => {
  const ARRAY_LENTGH = ALPHABET_ARRAY.length;
  const RAND_NUMBER = getRandomNumber(ARRAY_LENTGH);
  return ALPHABET_ARRAY[RAND_NUMBER];
};

// id generator
// returns a string
export const generateUniqueID = () => {
  const finalArrayId = [];
  for (let i = ZERO; i < ID_CONSTANTS.NO_OF_NUMBERS; i++) {
    finalArrayId.push(getRandomNumber(NINE));
  }
  for (let i = ZERO; i < ID_CONSTANTS.NO_OF_CHARS; i++) {
    finalArrayId.push(getRandomChar());
  }
  shuffleArray(finalArrayId);
  return finalArrayId.join(EMPTY);
};


// we know that the last ID_LENGTH characters in htmlId related to a
// person object is the id the of the the person object
export const getPersonIdByHTMLElementId = htmlElementId => htmlElementId
  .slice(htmlElementId.length - ID_CONSTANTS.ID_LENGTH);


export const sortArrayAlphabetically = (arrayOfContacts) => {
  arrayOfContacts.sort((person1, person2) => {
    if (person1.fullName > person2.fullName) return ONE;
    if (person1.fullName < person2.fullName) return -MINUS_ONE;
    return ZERO;
  });
};


export const sortArrayByLikes = (arrayOfContacts) => {
  // arrayOfContacts - array of objects person
  arrayOfContacts.sort((p1, p2) => p2.likes - p1.likes);
};


export const isUndefined = item => item === undefined;


export const isEmpty = input => input === EMPTY;
export const isNull = input => input === null;
export const isZero = input => input === ZERO;

export const createPerson = obj => new Person(obj);
