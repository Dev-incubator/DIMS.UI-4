import Validator from '../../../../helpers/Validator';

export default function trackFormInputsAttributes({ trackNote, trackDate }) {
  return [
    {
      type: 'textarea',
      name: 'trackNote',
      label: 'Track note',
      minSymbols: 50,
      maxSymbols: 600,
      value: trackNote,
    },
    {
      type: 'text',
      name: 'trackDate',
      label: 'Track date',
      value: Validator.fromDateToMask(trackDate, 'dd-MM-yyyy'),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, ['dd-MM-yyyy']),
      validator: (input) => Validator.dateTime(input, ['dd-MM-yyyy']),
      validationMessage: Validator.dateTimeMessage,
    },
  ];
}
