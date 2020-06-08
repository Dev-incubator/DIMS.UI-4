import Validator from '../../../../helpers/Validator';
import masks from '../../../../helpers/maskHelpers/masks';

export default function taskEditInputsAttributes({
  taskName,
  taskDescription,
  taskStart,
  taskDeadline,
  assignedTo,
  members,
}) {
  return [
    {
      type: 'text',
      name: 'taskName',
      description: 'Task name',
      placeholder: 'Task name',
      value: taskName,
      required: true,
    },
    {
      type: 'textarea',
      name: 'taskDescription',
      description: 'Task description',
      label: 'Task description',
      minSymbols: 4,
      maxSymbols: 600,
      value: taskDescription,
    },
    {
      type: 'text',
      name: 'taskStart',
      description: 'Task start date',
      label: 'Task start',
      placeholder: 'dd-mm-yyyy',
      value: taskStart && Validator.fromDateToMask(taskStart, masks.date),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, [masks.date]),
      validator: (input) => Validator.dateTime(input, [masks.date]),
      validationMessage: Validator.dateTimeMessage,
      required: true,
    },
    {
      type: 'text',
      name: 'taskDeadline',
      description: 'Task deadline date',
      label: 'Task deadline',
      placeholder: 'dd-mm-yyyy',
      value: taskDeadline && Validator.fromDateToMask(taskDeadline, masks.date),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, [masks.date]),
      validator: (input) => Validator.dateTime(input, [masks.date]),
      validationMessage: Validator.dateTimeMessage,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'members',
      description: 'Assigned',
      label: 'Assigned to members',
      value: assignedTo.map((member) => member.userId),
      defaultValue: assignedTo.map((member) => member.userId),
      valueOptions: Object.entries(members).map(([id, member]) => {
        return { label: `${member.firstName} ${member.lastName}`, value: id };
      }),
    },
  ];
}
