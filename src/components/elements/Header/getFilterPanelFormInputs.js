import regexpEscape from '../../../helpers/Validator/regexpEscape';

export default function getFilterPanelFormInputs({ filterRegexpMode, setFilterRegexpMode, filterFunction }) {
  return [
    {
      id: 'search',
      type: 'text',
      name: 'filter',
      placeholder: 'Search',
      description: 'Search',
      onInput: (name, input) => {
        let filterString;
        if (filterRegexpMode) {
          try {
            filterString = new RegExp(input, 'i');
          } catch (err) {
            filterFunction();
          }

          regexpEscape(input);
        } else {
          filterString = regexpEscape(input);
        }

        filterFunction(filterString);
      },
    },
    {
      id: 'regexpMode',
      type: 'checkbox',
      name: 'regexpMode',
      description: 'Regexp mode',
      onChange: (name, input) => {
        setFilterRegexpMode(input.includes('on'));
      },
      valueOptions: [{ label: 'Regexp mode', value: 'on' }],
    },
  ];
}
