import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    const { show } = this.props;
    return this.setState({ show });
  }

  handleClose = () => {
    this.props.onClose();
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  modalBackfaceClick = (e) => {
    e.preventDefault();
    this.handleClose();
  };

  render() {
    return (
      <>
        <article className={`modal ${this.state.show ? 'show' : ''} ${this.props.className || ''}`}>
          {this.props.children}
        </article>

        {this.props.backface && <div className='modal-shadow' role='article' onClick={this.modalBackfaceClick} />}
      </>
    );
  }
}

Modal.defaultProps = {
  show: false,
  backface: true,
  onClose: () => {},
};

Modal.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  backface: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
