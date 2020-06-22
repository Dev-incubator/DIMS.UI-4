import regexpEscapeArray from './regexpEscapeArray';

const Validator = {
  //* Input validators

  emailMessage: 'Email is not valid',

  email: (email) => {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9_.-]*@(?:(?!.*(?:-{2,}))[\w-]{2,255})\.(?:[a-zа-я]{2,10})$/;
    return emailRegex.test(email);
  },

  //

  userNameMessage: 'Username must contain from 6 to 64 alphanumeric characters and underscore',

  userName: (userName, notContains) => {
    const notContainsUnescaped = regexpEscapeArray(notContains);

    Validator.userNameMessage = `${Validator.userNameMessage.replace(
      / and not contain: .*/,
      '',
    )} and not contain: "${notContainsUnescaped.join('","')}"`;

    const baseUserNameRegex = '^[a-zA-Z_0-9]{6,64}$';
    return AddNotContains(baseUserNameRegex, notContainsUnescaped).test(userName);
  },

  //

  passwordMessage:
    'Password must contain at least: <ul><li>8 chars;</li><li>one uppercase and one lowercase letter;</li><li>any special character.</li></ul> Must use only alphanumeric and special characters.',

  password: (userName, notContains = []) => {
    const notContainsUnescaped = regexpEscapeArray(notContains);

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
      /* Contains at least 1 special character */
      '(?=.*[A-Z].*)' +
      /* Contains at least 1 uppercase letter */
      '(?=.*[a-z].*)' +
      /* Contains at least 1 lowercase letter */
      '(?=.*_.*)' +
      /* Contains at least 1 underscore sign */
      '(?=.*[0-9].*)' +
      /* Contains at least 1 number */
      ')(.*)' +
      '$)';

    return AddNotContains(basePasswordRegex, notContainsUnescaped).test(userName);
  },

  //

  parsePhoneByMask: (phone, mask) => {
    const formattedPhone = mask.split('');
    const phoneNumbers = phone.replace(/[^0-9]/g, '').split('');
    let phoneIndex = 0;
    for (let index = 0; index < mask.length; index += 1) {
      if (formattedPhone[index] === '9') {
        formattedPhone[index] = phoneNumbers[phoneIndex];
        phoneIndex += 1;
      }
    }
    return formattedPhone.join('');
  },

  float: (number, from, to) => {
    const num = parseFloat(number);
    return num <= to && num >= from;
  },

  number: (number, from, to) => {
    const num = parseInt(number, 10);
    return num <= to && num >= from;
  },

  //* By char validators

  text: (input) => {
    const textRegexp = /^[a-zA-Z]+$/;
    return textRegexp.test(input);
  },

  numericByChar: (input) => {
    const numericRegexp = /^(?=[^,.]*[,.]?[^,.]*)([0-9,.]+)$/;
    return numericRegexp.test(input);
  },

  alphanumeric: (input) => {
    if (/[0-9_]/.test(input[0])) {
      return false;
    }
    const alphanumericRegexp = /^[0-9a-zA-Z_]+$/;
    return alphanumericRegexp.test(input);
  },
};

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

export default Validator;
