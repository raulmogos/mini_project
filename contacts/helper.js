import {
  ALPHABET_ARRAY,
  ID_CONSTANTS,
  NINE
} from './constants';


const isNumber = number => typeof number === 'number';

const getRandomNumber = (maximum) => {
  // it returns a random number between 0  and maximum
  if (!isNumber(maximum)) {
    throw new Error(`${maximum} is not  a number`);
  }
  return Math.floor(Math.random() * maximum) % maximum;
};

const shuffleArray = (inputArray) => {
  const ARRAY_LENTGH = inputArray.length;
  for (let i = 0; i < ARRAY_LENTGH; i++) {
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
  for (let i = 0; i < ID_CONSTANTS.NO_OF_NUMBERS; i++) {
    finalArrayId.push(getRandomNumber(NINE));
  }
  for (let i = 0; i < ID_CONSTANTS.NO_OF_CHARS; i++) {
    finalArrayId.push(getRandomChar());
  }
  shuffleArray(finalArrayId);
  return finalArrayId.join('');
};
