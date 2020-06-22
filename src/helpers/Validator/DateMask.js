import regexpEscape from './regexpEscape';

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

const DateMask = {
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

  dateTimeMessage: 'Invalid date format',

  // Constructs regexp from mask
  // Regexp contains groups, representing month number, day number and so on
  dateTimeRegexpString: (masks) => {
    if (Object.keys(DateMask.dateTimeLastMasks).length >= 10) {
      DateMask.dateTimeLastMasks = {};
    }

    let Regexp;
    if (!DateMask.dateTimeLastMasks[masks.join(';')]) {
      Regexp = `(^${masks
        .map((mask) => {
          return regexpEscape(mask)
            .replace(/(^|[^M])M($|[^M])/g, '$1(?<_0>[1-9]|1[0-2])$2')
            .replace(/(^|[^M])MM($|[^M])/g, '$1(?<_0>0[1-9]|1[0-2])$2')

            .replace(/(^|[^M])MMM($|[^M])/g, `$1(?<_1>${monthsShort.join(')|(')})$2`)

            .replace(/(^|[^M])MMMM($|[^M])/g, `$1(?<_2>${months.join(')|(')})$2`)

            .replace(/(^|[^d])d($|[^d])/g, '$1(?<_3>[1-9]|[12][0-9]|3[01])$2')
            .replace(/(^|[^d])dd($|[^d])/g, '$1(?<_3>0[1-9]|[12][0-9]|3[01])$2')

            .replace(/(^|[^y])yy($|[^y])/g, '$1(?<_4>[1-9][0-9])$2')
            .replace(/(^|[^y])yyyy($|[^y])/g, '$1(?<_4>[1-2][90][0-9]{2})$2')

            .replace(/(^|[^h])h($|[^h])/g, '$1(?<_5>[0-9]|1[0-2])$2')
            .replace(/(^|[^h])hh($|[^h])/g, '$1(?<_5>0[0-9]|1[0-2])$2')

            .replace(/(^|[^H])H($|[^H])/g, '$1(?<_6>[0-9]|1[0-9]|2[0-3])$2')
            .replace(/(^|[^H])HH($|[^H])/g, '$1(?<_6>0[0-9]|1[0-9]|2[0-3])$2')

            .replace(/(^|[^m])m($|[^m])/g, '$1(?<_7>0|[1-5][0-9])$2')
            .replace(/(^|[^m])mm($|[^m])/g, '$1(?<_7>[0-5][0-9])$2')

            .replace(/(^|[^s])s($|[^s])/g, '$1(?<_8>0|[1-5][0-9])$2')
            .replace(/(^|[^s])ss($|[^s])/g, '$1(?<_8>[0-5][0-9])$2')

            .replace(/(^|[^a])a($|[^a])/g, '$1(?<_9>AM|PM)$2')

            .replace('<_0>', '<monthNumber>')
            .replace('<_1>', '<monthShort>')
            .replace('<_2>', '<monthFull>')
            .replace('<_3>', '<day>')
            .replace('<_4>', '<year>')
            .replace('<_5>', '<hour12>')
            .replace('<_6>', '<hours>')
            .replace('<_7>', '<minutes>')
            .replace('<_8>', '<seconds>')
            .replace('<_9>', '<ampm>');
        })
        .join('$)|(^')}$)`; // concat with OR statement for every date mask}

      DateMask.dateTimeLastMasks[masks.join(';')] = Regexp;
    } else {
      Regexp = DateMask.dateTimeLastMasks[masks.join(';')];
    }
    return Regexp;
  },

  // Parsing from date string to Date by mask
  parseDateByMask: (input, mask) => {
    const Regexp = new RegExp(DateMask.dateTimeRegexpString([mask]));
    const matchedInput = Regexp.exec(input).groups;

    let monthNum = parseInt(matchedInput.monthNumber, 10) - 1;

    if (matchedInput.monthShort) {
      monthNum = monthsShort.indexOf(matchedInput.monthShort);
    }

    if (matchedInput.monthFull) {
      monthNum = months.indexOf(matchedInput.monthFull);
    }

    let hourNum = parseInt(matchedInput.hours, 10);
    if (matchedInput.hours12) {
      if (matchedInput.ampm.match(/PM/i)) {
        hourNum = parseInt(matchedInput.hours12, 10) + 12;
      } else {
        hourNum = parseInt(matchedInput.hours12, 10);
      }
    }

    let yearNum = parseInt(matchedInput.year, 10);
    if (yearNum < 100) {
      yearNum = 2000 + yearNum;
    }

    const date = [
      yearNum || 1990,
      monthNum || 1,
      parseInt(matchedInput.day, 10) || 1,
      hourNum || 0,
      parseInt(matchedInput.minutes, 10) || 0,
      parseInt(matchedInput.seconds, 10) || 0,
    ].filter((el) => el);

    return new Date(...date);
  },

  // Stringifies given date according mask
  fromDateToMask: (date, mask) => {
    return regexpEscape(mask)
      .replace(/(^|[^M])M($|[^M])/g, `$1${date.getMonth() + 1}$2`)
      .replace(
        /(^|[^M])MM($|[^M])/g,
        `$1${date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}$2`,
      )
      .replace(/(^|[^M])MMM($|[^M])/g, `$1${monthsShort[date.getMonth()]}$2`)
      .replace(/(^|[^M])MMMM($|[^M])/g, `$1${months[date.getMonth()]}$2`)
      .replace(/(^|[^d])d($|[^d])/g, `$1${date.getDate()}$2`)
      .replace(/(^|[^d])dd($|[^d])/g, `$1${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}$2`)
      .replace(/(^|[^y])yy($|[^y])/g, `$1${date.getFullYear() % 100}$2`)
      .replace(/(^|[^y])yyyy($|[^y])/g, `$1${date.getFullYear()}$2`)
      .replace(/(^|[^m])m($|[^m])/g, `$1${date.getMinutes()}$2`)
      .replace(/(^|[^m])mm($|[^m])/g, `$1${date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()}$2`)
      .replace(/(^|[^s])s($|[^s])/g, `$1${date.getSeconds()}$2`)
      .replace(/(^|[^s])ss($|[^s])/g, `$1${date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds()}$2`)
      .replace(/(^|[^h])h($|[^h])/g, `$1${date.getHours() - 12}$2`)
      .replace(
        /(^|[^h])hh($|[^h])/g,
        `$1${date.getHours() - 12 < 9 ? `0${date.getHours() - 12}` : date.getHours() - 12}$2`,
      )
      .replace(/(^|[^H])H($|[^H])/g, `$1${date.getHours()}$2`)
      .replace(/(^|[^H])HH($|[^H])/g, `$1${date.getHours() < 9 ? `0${date.getHours()}` : date.getHours()}$2`)
      .replace(/(^|[^a])a($|[^a])/g, `$1${date.getHours > 12 ? 'PM' : 'AM'}$2`);
  },

  // Checks if date string follows mask
  dateTime: (dateString, masks = ['MM-dd-yyyy hh:mm:ss']) => {
    const dateTimeRegex = new RegExp(DateMask.dateTimeRegexpString(masks));
    return dateTimeRegex.test(dateString);
  },

  dateTimeLastMasks: {},

  // Checks is date valid using Date constructor
  dateTimeJS: (date) => {
    try {
      Date(date);
    } catch {
      return false;
    }
    return true;
  },

  // Checks if date string follows mask and represents date in past
  dateTimeInPast: (input, mask) => {
    if (!DateMask.dateTime(input, [mask])) {
      return false;
    }
    const date = DateMask.parseDateByMask(input, mask);
    return date < new Date();
  },

  // Checks if current date input follows the mask
  dateByChar: (input, masks = ['MM-dd-yyyy hh:mm:ss']) => {
    const Regexp = RegExp(
      `(^${masks
        .map((mask) => {
          const check = [...mask.slice(input.length - 1)].findIndex((el) => /[^MdymshHa]/.test(el)) + input.length - 1;
          const maskU = regexpEscape(mask);

          if (check > input.length) {
            return `(.{${input.length - 1}})[0-9]`;
          }
          if (check === input.length - 1) {
            return DateMask.dateTimeRegexpString([maskU.slice(0, check + 1)]);
          }
          if (input.length - check >= 2) {
            if (input.length >= mask.length) {
              return DateMask.dateTimeRegexpString([maskU]);
            }
            return `(.{${input.length - 1}})[0-9]`;
          }
          return DateMask.dateTimeRegexpString([maskU.slice(0, check)]).replace(/[$^]/g, '');
        })
        .join('$)|(^')}$)`,
    );

    return Regexp.test(input);
  },
};

export default DateMask;
