export interface IParsedRequest {
  request: string,
  phrase: string,
  from: string,
  into: string
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

function findLanguage(myArray: string[], langages: string[]) {

}

export function parseTranslateRequest(text: string) {
  let phrase: string = ''
  let fromLanguage: string = ''
  let intoLanguage: string = ''

  const myArray: string[] = text.split(' ');
  const arr = ['translate', 'Translate'];

  if (contains(text, arr)) {
    const indexOfTranslate = findIndex(myArray, arr);

    if (contains(text, ['from']) && myArray.indexOf('from') === indexOfTranslate + 2) {

      fromLanguage = myArray[indexOfTranslate + 2]
      intoLanguage = myArray[indexOfTranslate + 4]
      phrase = myArray.slice(indexOfTranslate+1, myArray.indexOf('from')).join(' ')
    }
  }


  return {
    request: "Translate",
    phrase: phrase,
    from: fromLanguage,
    into: intoLanguage,
  }
}
