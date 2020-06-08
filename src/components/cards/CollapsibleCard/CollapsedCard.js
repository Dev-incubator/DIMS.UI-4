import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';
import CollapsibleCardTitle from './CollapsibleCardTitle';
import useAnimation from '../../../helpers/hooks/useAnimation';
import cardHeaderAnimation from '../../../helpers/animations/cardHeaderAnimation';

function CollapsedCard(props) {
  const { children, cardClass, onClick: onClickProp, collapsed } = props;
  const { initState, finalState } = cardHeaderAnimation();

  const [style, , stop] = useAnimation({ trigger: () => !collapsed, initState, finalState });

  const onClick = (collapsed) => {
    stop();
    onClickProp(collapsed);
  };

  return (
    <animated.div className={`${cardClass}-card__header`} style={style}>
      {React.Children.map(children, (child) => {
        if (!child) {
          return child;
        }
        if (child.type === CollapsibleCardTitle) {
          return React.cloneElement(child, { onClick: () => onClick(collapsed), cardClass });
        }
        return child;
      })}
    </animated.div>
  );
}

CollapsedCard.propTypes = {
  onClick: PropTypes.func,
  cardClass: PropTypes.string,
  collapsed: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsedCard;
