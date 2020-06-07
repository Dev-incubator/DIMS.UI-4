
  /* *
   * Phone mask template:
   *
   * #  - number [0,9]
   * #* - 1 or more numbers [0,9]
   * +  - '+' sign
   * () - brackets
   */

  static phoneMessage = 'Phone is not valid';

  static phone = (phone, masks = ['#* ###-##-##']) => {
    Validator.phoneLastMasks = masks;
    console.log(
      RegExp(
        `(^${masks
          .map((mask) =>
            RegexpUnescape(mask)
              .replace(/#\\\*/g, '[0-9]{2,4}')
              .replace(/#/g, '[0-9]'),
          )
          .join('$)|(^')}$)`,
      ).test(phone),
    );
    return RegExp(
      `(^${masks
        .map((mask) =>
          RegexpUnescape(mask)
            .replace(/#\\\*/g, '[0-9]{2,4}')
            .replace(/#/g, '[0-9]'),
        )
        .join('$)|(^')}$)`,
    ).test(phone);
  };

  static phoneLastMasks = [];

  static mobilePhoneMessage = 'Mobile phone is not valid';

  static mobilePhone = (
    phone,
    masks = ['+#* (#*) ###-##-##', '+#* #* ###-##-##', '+#* #* #######', '+#* (#*) #######'],
  ) => {
    Validator.phone(phone, masks);
  };

  

  static phoneByChar = (phone, masks) => {
    return RegExp(
      `(^${masks
        .map((mask) =>
          RegexpUnescape(mask.slice(0, mask.length))
            .replace(/#\\\*/g, '[0-9]{2,4}')
            .replace(/#/g, '[0-9]'),
        )
        .join('$)|(^')}$)`,
    ).test(phone);
  };

  static mobilePhoneByChar = (
    phone,
    masks = ['+#* (#*) ###-##-##', '+#* #* ###-##-##', '+#* #* #######', '+#* (#*) #######'],
  ) => {
    Validator.phoneByChar(phone, masks);
  };
}

`\
(^\
(?:\
(?=[a-zA-Z0-9~\`!@#$%^&*()+=_{}[\\]\\|:;”’?\\/<>,.-]{8,})\
${/* Contains only latin letters, numbers and special characters */ ''}\
(?=.*[\`!@#$%^&*()+=_{}[\\]\\|:;”’?\\/<>,.-].*)\
${/* Contain at least 1 special character */ ''}\
(?=.*[A-Z].*)\
${/* Contain at least 1 uppercase letter */ ''}\
(?=.*[a-z].*)\
${/* Contain at least 1 lowercase letter */ ''}\
(?=.*_.*)\
${/* Contain at least 1 underscore sign */ ''}\
(?=.*[0-9].*)\
${/* Contain at least 1 number */ ''}\
)(.*)\
$)`;