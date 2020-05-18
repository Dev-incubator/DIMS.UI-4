import Validator from '../../../../helpers/Validator';

export default function taskEditInputsAttributes({ taskDescription, taskStart, taskDeadline, assignedTo, members }) {
  return [
    {
      type: 'textarea',
      name: 'taskDescription',
      label: 'Task description',
      minSymbols: 50,
      maxSymbols: 600,
      value: taskDescription,
    },
    {
      type: 'text',
      name: 'taskStart',
      label: 'Task start',
      value: Validator.fromDateToMask(taskStart, 'dd-MM-yyyy'),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, ['dd-MM-yyyy']),
      validator: (input) => Validator.dateTime(input, ['dd-MM-yyyy']),
      validationMessage: Validator.dateTimeMessage,
    },
    {
      type: 'text',
      name: 'taskDeadline',
      label: 'Task deadline',
      value: Validator.fromDateToMask(taskDeadline, 'dd-MM-yyyy'),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, ['dd-MM-yyyy']),
      validator: (input) => Validator.dateTime(input, ['dd-MM-yyyy']),
      validationMessage: Validator.dateTimeMessage,
    },
    {
      type: 'checkbox',
      name: 'members',
      label: 'Assigned to members',
      value: assignedTo.map((member) => `${member.firstName} ${member.lastName}`),
      valueOptions: members.map((member) => `${member.firstName} ${member.lastName}`),
    },
  ];
}
