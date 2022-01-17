export const lngTranslateContext: string[] = [
  'English',
  'Arabic',
  'German',
  'Spanish',
  'French',
  'Hebrew',
  'Italian',
  'Japanese',
  'Dutch',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Turkish',
  'Chinese',
]

export interface IParsedRequest {
  request: string,
  phrase: string,
  fromLanguage: string,
  intoLanguage: string
}


function contains(target: string, pattern: string[]) {
  let value: any = 0;
  pattern.forEach(function (word) {
    value = value + target.includes(word);
  });
  return (value === 1)
}

function findIndex(myArray: string[], smallArray: string[]) {
  let value: any = -1;
  smallArray.forEach(function (word) {
    if (myArray.includes(word)) {
      value = myArray.indexOf(word)
    }
  })
  return value > -1 && value
}

function findLng(myArray: string [], preposition: string) {
  let value: any = ''
  if (lngTranslateContext.includes(myArray[myArray.indexOf(preposition) + 1])) {
    value = myArray[myArray.indexOf(preposition) + 1]
    console.log('value = ', value)
  }
  return value
}

export function parseTranslateRequest(text: string) {
  let phrase: string = ''
  let fromLanguage: string = ''
  let intoLanguage: string = ''

  const myArray: string[] = text.split(' ');
  const arr = ['translate', 'Translate'];
  console.log('myArray = ', myArray)

  if (contains(text, arr)) {
    const indexOfTranslate = findIndex(myArray, arr);
    fromLanguage = findLng(myArray, 'from')
    intoLanguage = findLng(myArray, 'into')
    phrase = myArray.slice(myArray.indexOf('(') + 1, myArray.indexOf(')')).join(' ')
  }
  return {
    request: "Translate",
    phrase: phrase,
    fromLanguage: fromLanguage,
    intoLanguage: intoLanguage,
  }
}
