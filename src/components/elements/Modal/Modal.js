import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import fadeIn from '../../../helpers/animations/fadeIn';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    const { initState, finalState } = fadeIn();

    this.state = {
      show: false,
      from: initState,
      to: finalState,
      swapped: false,
    };
  }

  static getDerivedStateFromProps(prevProps, state) {
    if (prevProps.show !== null) {
      return { show: prevProps.show };
    }

    return state;
  }

  componentDidMount() {
    const { show } = this.props;
    return this.setState({ show });
  }

  handleClose = () => {
    const { onClose } = this.props;
    this.fadeOut();
    setTimeout(() => {
      onClose();
      this.setState({ show: false });
    }, 100);
  };

  handleShow = () => {
    this.setState({ show: true });
    this.fadeIn();
  };

  modalBackfaceClick = (e) => {
    e.preventDefault();
    this.handleClose();
  };

  fadeOut() {
    const { from, to } = this.state;
    this.setState({ to: from, from: to, swapped: true });
  }

  fadeIn() {
    const { swapped, from, to } = this.state;
    if (swapped) {
      this.setState({ to: from, from: to, swapped: false });
    }
  }

  toggle() {
    const { show } = this.state;
    if (show) {
      this.handleClose();
    } else {
      this.handleShow();
    }
  }

  render() {
    const { show, from, to } = this.state;
    const { children, backface, className, animationDelay } = this.props;

    return (
      <>
        {show && (
          <Spring config={{ duration: 50, delay: animationDelay }} from={from} to={to}>
            {(props) => (
              <>
                <article className={`modal ${show ? 'show' : ''} ${className || ''}`} style={props}>
                  {children}
                </article>
                {backface && (
                  <div className='modal-shadow' role='article' style={props} onClick={this.modalBackfaceClick} />
                )}
              </>
            )}
          </Spring>
        )}
      </>
    );
  }
}

Modal.defaultProps = {
  show: null,
  backface: true,
  onClose: () => {},
  animationDelay: 0,
};

Modal.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  backface: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  animationDelay: PropTypes.number,
};

export default Modal;
