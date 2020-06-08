import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import Form from '../Form';
import getFilterPanelFormInputs from './getFilterPanelFormInputs';

function FilterPanel({ showFilterPanel, ...inputsProps }) {
  return (
    <Modal show={showFilterPanel} className='input-panel' backface={false} animationDelay={200}>
      <Form inputs={getFilterPanelFormInputs(inputsProps)} showNotifications='hideAll' onSubmit={null} />
    </Modal>
  );
}

FilterPanel.propTypes = {
  showFilterPanel: PropTypes.bool.isRequired,
  filterRegexpMode: PropTypes.bool.isRequired,
  setFilterRegexpMode: PropTypes.func.isRequired,
  filterFunction: PropTypes.func.isRequired,
};

export default FilterPanel;
