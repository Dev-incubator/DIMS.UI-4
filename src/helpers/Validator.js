export default class Validator {
  //* Input validators

  static emailMessage = 'Email is not valid';

  static email = (email) => {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9_.-]*@(?:(?!.*(?:-{2,}))[\w-]{2,255})\.(?:[a-zа-я]{2,10})$/;
    return emailRegex.test(email);
  };

  //

  static userNameMessage = 'Username must contain from 6 to 64 alphanumeric characters and underscore';

  static userName = (userName, notContains) => {
    const notContainsUnescaped = RegexpUnescapeArray(notContains);

    Validator.userNameMessage = `${Validator.userNameMessage.replace(
      / and not contain: .*/,
      '',
    )} and not contain: "${notContainsUnescaped.join('","')}"`;

    const baseUserNameRegex = '^[a-zA-Z_0-9]{6,64}$';
    return AddNotContains(baseUserNameRegex, notContainsUnescaped).test(userName);
  };

  //

  static passwordMessage =
    'Password must contain at least: <ul><li>8 chars;</li><li>one uppercase and one lowercase letter;</li><li>any special character.</li></ul> Must use only alphanumeric and special characters.';

  static password = (userName, notContains = []) => {
    const notContainsUnescaped = RegexpUnescapeArray(notContains);

    Validator.passwordMessage = `${Validator.passwordMessage.replace(
      / Mustn't contain: .*/,
      '',
    )} Mustn't contain: "${notContains.join('","')}"`;

    const basePasswordRegex =
      '' +
      '(^' +
      '(?:' +
      '(?=[a-zA-Z0-9~`!@#$%^&*()+=_{}[\\]\\|:;”’?\\/<>,.-]{8,})' +
      /* Contains only latin letters, numbers and special characters */
      '(?=.*[`!@#$%^&*()+=_{}[\\]\\|:;”’?\\/<>,.-].*)' +
      /* Contain at least 1 special character */
      '(?=.*[A-Z].*)' +
      /* Contain at least 1 uppercase letter */
      '(?=.*[a-z].*)' +
      /* Contain at least 1 lowercase letter */
      '(?=.*_.*)' +
      /* Contain at least 1 underscore sign */
      '(?=.*[0-9].*)' +
      /* Contain at least 1 number */
      ')(.*)' +
      '$)';

    return AddNotContains(basePasswordRegex, notContainsUnescaped).test(userName);
  };

  //

  /* *
   * Mask template:
   * 9 - number [0,9]
   * a - letter [a,z]
   * A -letter [A,Z]
   * h - hex number [0,f]
   * % - any not alphanumeric character
   * # - any symbol
   *
   * Other symbols are considered as static
   * To escape special mask characters use '\': 'a\, 'h\', '9\', '#\', '?\','\\'
   */
  static maskValidator = (input, mask) => {
    if (Validator.lastMask[mask]) {
      if (Object.keys(Validator.lastMask).length >= 10) {
        Validator.lastMask = {};
      }
      let regexp;
      regexp = mask.replace(/9(?!\\(?!\\))/g, '[0-9]');
      regexp = regexp.replace(/a(?!\\(?!\\))/g, '[a-z]');
      regexp = regexp.replace(/A(?!\\(?!\\))/g, '[A-Z]');
      regexp = regexp.replace(/h(?!\\(?!\\))/g, '[0-9a-fA-F]');
      regexp = regexp.replace(/%(?!\\(?!\\))/g, '[^0-9a-zA-Z]');
      regexp = regexp.replace(/#(?!\\(?!\\))/g, '.');
      regexp = regexp.replace(/([9aAh%#])\\(?!\\)/g, '$1');
      Validator.lastMask[mask] = `^${regexp}$`;
    }

    return new RegExp(RegexpUnescape(Validator.lastMask[mask])).test(input);
  };

  static lastMask = {};

  //

  //

  static dateTimeMessage = 'Invalid date format';

  /* *
   * Mask template:
   *
   * M    - month number
   * MM   - month number with trailing 0
   * MMM  - month in word (short)
   * MMMM - month in word
   * d    - day number
   * dd   - day number with trailing 0
   * yy   - year number (short)
   * yyyy - year number
   * m    - minutes
   * mm   - minutes with trailing 0
   * s    - seconds
   * ss   - seconds with trailing 0
   * h    - hours (12h-format)
   * hh   - hours with trailing 0 (12h-format)
   * H    - hours (24h-format)
   * HH   - hours with trailing 0 (24h-format)
   * a    - AM / PM mark
   */

  static dateTimeRegexpString = (masks) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthsShort = months.map((month) => [...month].slice(0, 3).join(''));

    if (Object.keys(Validator.dateTimeLastMasks).length >= 10) {
      Validator.dateTimeLastMasks = {};
    }

    let Regexp;
    if (!Validator.dateTimeLastMasks[masks.join(';')]) {
      Regexp = `(^${masks
        .map((mask) => {
          return RegexpUnescape(mask)
            .replace(/(^|[^M])M($|[^M])/g, '$1(?<_0>[1-9]|1[0-2])$2')
            .replace(/(^|[^M])MM($|[^M])/g, '$1(?<_0>0[1-9]|1[0-2])$2')

            .replace(/(^|[^M])MMM($|[^M])/g, `$1(?<_1>${monthsShort.join(')|(')})$2`)

            .replace(/(^|[^M])MMMM($|[^M])/g, `$1(?<_2>${months.join(')|(')})$2`)

            .replace(/(^|[^d])d($|[^d])/g, '$1(?<_3>[1-9]|[12][0-9]|3[01])$2')
            .replace(/(^|[^d])dd($|[^d])/g, '$1(?<_3>0[1-9]|[12][0-9]|3[01])$2')

            .replace(/(^|[^y])yy($|[^y])/g, '$1(?<_4>[1-9][0-9])$2')
            .replace(/(^|[^y])yyyy($|[^y])/g, '$1(?<_4>[1-9][0-9]{3})$2')

            .replace(/(^|[^h])h($|[^h])/g, '$1(?<_5>[0-9]|1[0-2])$2')
            .replace(/(^|[^h])hh($|[^h])/g, '$1(?<_5>0[0-9]|1[0-2])$2')

            .replace(/(^|[^H])H($|[^H])/g, '$1(?<_6>[0-9]|1[0-9]|2[0-3])$2')
            .replace(/(^|[^H])HH($|[^H])/g, '$1(?<_6>0[0-9]|1[0-9]|2[0-3])$2')

            .replace(/(^|[^m])m($|[^m])/g, '$1(?<_7>0|[1-5][0-9])$2')
            .replace(/(^|[^m])mm($|[^m])/g, '$1(?<_7>[0-5][0-9])$2')

            .replace(/(^|[^s])s($|[^s])/g, '$1(?<_8>0|[1-5][0-9])$2')
            .replace(/(^|[^s])ss($|[^s])/g, '$1(?<_8>[0-5][0-9])$2')
            .replace(/(^|[^a])a($|[^a])/g, '$1(AM|PM)$2')

            .replace('<_0>', '<monthNumber>')
            .replace('<_1>', '<monthShort>')
            .replace('<_2>', '<monthFull>')
            .replace('<_3>', '<day>')
            .replace('<_4>', '<year>')
            .replace('<_5>', '<hour12>')
            .replace('<_6>', '<hours>')
            .replace('<_7>', '<minutes>')
            .replace('<_8>', '<seconds>');
        })
        .join('$)|(^')}$)`; // concat with OR statement for every date mask}

      Validator.dateTimeLastMasks[masks.join(';')] = Regexp;
    } else {
      Regexp = Validator.dateTimeLastMasks[masks.join(';')];
    }
    return Regexp;
  };

  static dateByMask(input, mask) {
    const Regexp = new RegExp(Validator.dateTimeRegexpString([mask]));
    const matchedInput = Regexp.exec(input).groups;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthsShort = months.map((month) => [...month].slice(0, 3).join(''));

    let monthNum = parseInt(matchedInput.month, 10);

    if (matchedInput.monthShort) {
      monthNum = monthsShort.indexOf(matchedInput.monthShort) + 1;
    }

    if (matchedInput.monthFull) {
      monthNum = months.indexOf(matchedInput.monthFull) + 1;
    }

    let hourNum = parseInt(matchedInput.hours, 10);
    if (matchedInput.hours12) {
      hourNum = parseInt(matchedInput.hours12, 10) + 12;
    }

    const date = [
      parseInt(matchedInput.year, 10),
      monthNum,
      parseInt(matchedInput.day, 10),
      hourNum,
      parseInt(matchedInput.minutes, 10),
      parseInt(matchedInput.seconds, 10),
    ].filter((el) => el);

    return new Date(...date);
  }

  static fromDateToMask(date, mask) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthsShort = months.map((month) => [...month].slice(0, 3).join(''));
    return RegexpUnescape(mask)
      .replace(/(^|[^M])M($|[^M])/g, `$1${date.getMonth() + 1}$2`)
      .replace(
        /(^|[^M])MM($|[^M])/g,
        `$1${date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}$2`,
      )
      .replace(/(^|[^M])MMM($|[^M])/g, `$1${monthsShort[date.getMonth()]}$2`)
      .replace(/(^|[^M])MMMM($|[^M])/g, `$1${months[date.getMonth()]}$2`)
      .replace(/(^|[^d])d($|[^d])/g, `$1${date.getDate()}$2`)
      .replace(/(^|[^d])dd($|[^d])/g, `$1${date.getDate() < 9 ? `0${date.getDate()}` : date.getDate()}$2`)
      .replace(/(^|[^y])yy($|[^y])/g, `$1${date.getFullYear() % 100}$2`)
      .replace(/(^|[^y])yyyy($|[^y])/g, `$1${date.getFullYear()}$2`)
      .replace(/(^|[^m])m($|[^m])/g, `$1${date.getMinutes()}$2`)
      .replace(/(^|[^m])mm($|[^m])/g, `$1${date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()}$2`)
      .replace(/(^|[^s])s($|[^s])/g, `$1${date.getSeconds()}$2`)
      .replace(/(^|[^s])ss($|[^s])/g, `$1${date.getSeconds() < 9 ? `0${date.getSeconds()}` : date.getSeconds()}$2`)
      .replace(/(^|[^h])h($|[^h])/g, `$1${date.getHours() - 12}$2`)
      .replace(
        /(^|[^h])hh($|[^h])/g,
        `$1${date.getHours() - 12 < 9 ? `0${date.getHours() - 12}` : date.getHours() - 12}$2`,
      )
      .replace(/(^|[^H])H($|[^H])/g, `$1${date.getHours()}$2`)
      .replace(/(^|[^H])HH($|[^H])/g, `$1${date.getHours() < 9 ? `0${date.getHours()}` : date.getHours()}$2`)
      .replace(/(^|[^a])a($|[^a])/g, `$1${date.getHours > 12 ? 'PM' : 'AM'}$2`);
  }

  static dateTime = (date, masks = ['MM-dd-yyyy hh:mm:ss']) => {
    const dateTimeRegex = new RegExp(Validator.dateTimeRegexpString(masks));
    return dateTimeRegex.test(date);
  };

  static dateTimeLastMasks = {};

  static dateTimeJS = (date) => {
    try {
      Date(date);
    } catch {
      return false;
    }
    return true;
  };

  static float(number, from, to) {
    const num = parseFloat(number);
    return num <= to && num >= from;
  }

  static number(number, from, to) {
    const num = parseInt(number, 10);
    return num <= to && num >= from;
  }

  //

  //* By char validators

  static text(input) {
    const textRegexp = /^[a-zA-Z]+$/;
    return textRegexp.test(input);
  }

  static numericByChar(input) {
    const numericRegexp = /^(?=[^,.]*[,.]?[^,.]*)([0-9,.]+)$/;
    return numericRegexp.test(input);
  }

  static alphanumeric(input) {
    if (/[0-9_]/.test(input[0])) {
      return false;
    }
    const alphanumericRegexp = /^[0-9a-zA-Z_]+$/;
    return alphanumericRegexp.test(input);
  }

  /* *
   * Mask template:
   * 9 - number [0,9]
   * a - letter [a,z]
   * A -letter [A,Z]
   * h - hex number [0,f]
   * % - any not alphanumeric character
   * # - any symbol
   *
   * Other symbols are considered as static
   * To escape special mask characters use '\': 'a\, 'h\', '9\', '#\','\\'
   */

  static maskByChar = (input, mask) => {
    const maskArray = mask.split(/(a\\(?!\\))|(h\\(?!\\))|(#\\(?!\\))|(9\\(?!\\))|(\\\\)|()/).filter((el) => el);
    const currMaskEl = maskArray[input.length - 1];
    if (!currMaskEl) {
      return false;
    }

    let regexp;
    switch (currMaskEl) {
      case '9':
        regexp = '[0-9]';
        break;
      case 'a':
        regexp = '[a-z]';
        break;
      case 'A':
        regexp = '[A-Z]';
        break;
      case 'h':
        regexp = '[0-9a-fA-F]';
        break;
      case '%':
        regexp = '[^0-9a-zA-Z]';
        break;
      case '#':
        regexp = '.';
        break;
      default:
        regexp = currMaskEl.match(/([9aAh%#\\])\\/);
        regexp = regexp ? regexp[0] : currMaskEl;
    }

    return new RegExp(RegexpUnescape(regexp)).test(input[input.length - 1]);
  };

  /* *
   * Mask template:
   *
   * M    - month number
   * MM   - month number with trailing 0
   * MMM  - month in word (short)
   * MMMM - month in word
   * d    - day number
   * dd   - day number with trailing 0
   * yy   - year number (short)
   * yyyy - year number
   * m    - minutes
   * mm   - minutes with trailing 0
   * s    - seconds
   * ss   - seconds with trailing 0
   * h    - hours (12h-format)
   * hh   - hours with trailing 0 (12h-format)
   * H    - hours (24h-format)
   * HH   - hours with trailing 0 (24h-format)
   * a    - AM / PM mark
   */

  static dateByChar(input, masks = ['MM-dd-yyyy hh:mm:ss']) {
    const Regexp = RegExp(
      `(^${masks
        .map((mask) => {
          let check = [...mask.slice(input.length - 1)].findIndex((el) => /[^MdymshHa]/.test(el)) + input.length - 1;

          let maskU = RegexpUnescape(mask);
          if (check > input.length) {
            return `(.{${input.length - 1}})[0-9]`;
          }
          if (check === input.length - 1) {
            return Validator.dateTimeRegexpString([maskU.slice(0, check + 1)]);
          }
          if (input.length - check >= 2) {
            if (input.length >= mask.length) {
              return Validator.dateTimeRegexpString([maskU]);
            }
            return `(.{${input.length - 1}})[0-9]`;
          }
          return Validator.dateTimeRegexpString([maskU.slice(0, check)]).replace(/[$^]/g, '');
        })
        .join('$)|(^')}$)`,
    );

    return Regexp.test(input);
  }
}

// Helpers
function AddNotContains(regexp, notContains) {
  return RegExp(
    `${
      notContains.length
        ? `
        (?!(.*((${notContains.join(')|(')})).*))`
        : ''
    }${regexp}`,
  );
}

function RegexpUnescapeArray(array) {
  if (!array || !array.length) {
    return [];
  }
  return array.map((word) => RegexpUnescape(word));
}

function RegexpUnescape(str) {
  return str.replace(/[\\^$.|?*+()]/g, '\\$&');
}
