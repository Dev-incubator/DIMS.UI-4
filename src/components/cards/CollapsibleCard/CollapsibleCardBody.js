import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import CollapsibleCardDescription from './CollapsibleCardDescription';
import cardBodyAnimation from '../../../helpers/animations/cardBodyAnimation';

function CollapsibleCardBody(props) {
  const { cardClass, children } = props;
  const { config, initState, finalState } = cardBodyAnimation();

  const style = useSpring({
    config,
    to: initState,
    from: finalState,
  });

  return (
    <animated.div className={`${cardClass}-card__body`} style={style}>
      {React.Children.map(children, (child) => {
        if (!child) {
          return child;
        }
        if (child.type === CollapsibleCardDescription) {
          return React.cloneElement(child, { cardClass });
        }
        return child;
      })}
    </animated.div>
  );
}

CollapsibleCardBody.propTypes = {
  cardClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsibleCardBody;
