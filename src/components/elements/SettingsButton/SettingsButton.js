import React, { useRef, useReducer } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings.svg';
import Modal from '../Modal';
import changeColorScheme, { themes } from '../../../helpers/changeColorScheme';
import Form from '../Form';
import getSettingsFormInputsProps from './getSettingsFormInputsProps';
import inputsReducer, { updateAction } from '../../../helpers/formHelpers/inputsReducer';

const SettingsButton = ({ layout, buttonClassMod }) => {
  const [inputs, dispatch] = useReducer(inputsReducer, {});
  const setInputs = (data) => {
    dispatch(updateAction(data));
  };

  const modal = useRef({});
  const toggleModal = () => {
    modal.current.toggle();
  };

  const changeTheme = (name, value) => {
    changeColorScheme(themes[value]);
  };

  return (
    <>
      <Modal ref={modal} className='settings'>
        <h2>Settings</h2>
        <Form
          inputs={getSettingsFormInputsProps({
            currentTheme: changeColorScheme.currentTheme,
            themeOnChange: changeTheme,
          })}
          onInputsUpdate={setInputs}
          showNotifications='errorsOnly'
        >
          {inputs.theme}
        </Form>
        <Button classMod='secondary' link='/logout'>
          Log out
        </Button>
        <div className='about'>Done by Maxim Logvinenko</div>
      </Modal>
      <Button classMod={buttonClassMod} onClick={toggleModal}>
        {layout === 'text' ? 'Settings' : <SettingsIcon className='icon-settings' />}
      </Button>
    </>
  );
};

SettingsButton.defaultProps = {
  layout: 'icon',
  buttonClassMod: 'invisible',
};

SettingsButton.propTypes = {
  layout: PropTypes.oneOf(['text', 'icon']),
  buttonClassMod: PropTypes.string,
};

export default SettingsButton;
