// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы.

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('Мама мыла раму', 114); // true
checkStringLength('Мама мыла раму', 14); // true
checkStringLength('Мама мыла раму', 4); // false

// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. Например:
// Это палиндром имяФункции('Лёша на полке клопа нашёл '); // true

function isPalindrome(string) {
  const joinedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';

  for (let i = 0; i < joinedString.length; i++) {
    reversedString += joinedString.at(-i - 1);
  }

  return reversedString === joinedString;
}

isPalindrome('Мам');
isPalindrome('Мамa');
isPalindrome('абырвалг');
isPalindrome('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернут NaN:

function extractDigits(string) {
  string = String(string);
  let digits = '';

  for (let i = 0; i < string.length; i++) {
    if (parseInt(string[i], 10) || string[i] === '0') {
      digits += string[i];
    }
  }

  return parseInt(digits, 10);
}

extractDigits('2023 год'); // 2023
extractDigits(2023); // 2023
extractDigits(-1); // 1
extractDigits('1 кефир, 0.5 батона'); // 105
extractDigits('кефир, батон'); // NaN
extractDigits('агент 007'); // 7

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

function padString(string, minLength, symbols) {
  let newString = '';
  const padSymbols = minLength - string.length;

  if (padSymbols <= 0) {
    newString = string;
    // console.log(newString);
    return newString;
  }

  // Используя метод .repeat
  // newString = symbols.slice(0, padSymbols % symbols.length) + symbols.repeat(padSymbols / symbols.length) + string;

  if (padSymbols > symbols.length) {
    if (padSymbols % symbols.length) {
      newString += symbols.slice(0, symbols.length - (padSymbols % symbols.length));
    }

    for (let i = 1; i <= (padSymbols / symbols.length); i++) {
      newString += symbols;
    }

    newString += string;

  } else {
    newString = symbols.slice(0, symbols.length - padSymbols + 1) + string;
  }

  // Используя метод .padStart
  // (string.length <= minLength) ? newString = string.padStart(minLength, symbols) : newString = string.padStart(string.length, symbols);

  // console.log(newString);
  return newString;
}


// Добавочный символ использован один раз
padString('1', 2, '0');      // '01'

// Добавочный символ использован три раза
padString('1', 4, '0');      // '0001'

// Добавочные символы обрезаны с конца
padString('q', 4, 'werty');  // 'werq'

// Добавочные символы использованы полтора раза
padString('q', 4, 'we');     // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
padString('qwerty', 4, '0'); // 'qwerty'
