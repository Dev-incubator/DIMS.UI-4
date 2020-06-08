import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import Form from '../Form';
import ButtonGroup from '../ButtonGroup';
import Spinner from '../Spinner';

const DialogButton = (props) => {
  const { buttonContent, buttonClassMod, dialogValue, message, confirmButtonClassMod, confirmButtonContent } = props;

  const [loading, setLoading] = useState(false);
  const modal = useRef({});

  const onClick = () => {
    modal.current.handleShow();
  };

  const onCancel = () => {
    modal.current.handleClose();
  };

  const onSubmit = (data) => {
    const { onSubmit: propsOnSubmit, reload } = props;
    setLoading(true);

    return propsOnSubmit(data).then((response) => {
      setLoading(false);
      reload();
      return response;
    });
  };

  return (
    <>
      <Modal ref={modal} className='dialog'>
        {loading ? (
          <Spinner centered />
        ) : (
          <>
            <p className='dialog__head'>{message}</p>
            <ButtonGroup>
              <Form
                inputs={[
                  {
                    type: 'hidden',
                    name: 'dialogValue',
                    value: dialogValue,
                  },
                ]}
                onSubmit={onSubmit}
                submitButton={<Button classMod={confirmButtonClassMod}>{confirmButtonContent}</Button>}
              />
              <Button classMod='ghost' onClick={onCancel}>
                Cancel
              </Button>
            </ButtonGroup>
          </>
        )}
      </Modal>
      <Button classMod={buttonClassMod} onClick={onClick}>
        {buttonContent}
      </Button>
    </>
  );
};

DialogButton.defaultProps = {
  reload: () => {},
};

DialogButton.propTypes = {
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  confirmButtonClassMod: PropTypes.string.isRequired,
  confirmButtonContent: PropTypes.string.isRequired,
  buttonContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  dialogValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reload: PropTypes.func,
};

export default DialogButton;