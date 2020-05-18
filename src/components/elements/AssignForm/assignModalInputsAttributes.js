export default function assignModalInputsAttributes({ assignedTo, members }) {
  return [
    {
      type: 'checkbox',
      name: 'members',
      label: 'Assigned to members',
      value: assignedTo.map((member) => `${member.firstName} ${member.lastName}`),
      valueOptions: members.map((member) => `${member.firstName} ${member.lastName}`),
    },
  ];
}
