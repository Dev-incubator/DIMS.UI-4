import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CollapsibleItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: {}, open: undefined };
  }

  static getDerivedStateFromProps(props, state) {
    const { items } = props;
    const { items: stateItems } = state;
    if (Object.values(stateItems).length !== items.length) {
      const itemsData = {};

      items.forEach((child) => {
        itemsData[child.props.id] = { collapsed: true };
      });
      return { ...state, items: itemsData };
    }
    return state;
  }

  async componentDidMount() {
    const { open } = this.props;
    this.openOnLoad(open);
    document.body.addEventListener('keydown', this.navigationKeys);
  }

  openOnLoad = (id) => {
    if (id) {
      setTimeout(() => {
        if (document.getElementById(id)) {
          document.getElementById(id).scrollIntoView();
        }
      }, 0);
      this.open(id);
    }
  };

  open = (id) => {
    const { open, items } = this.state;
    const { onFail } = this.props;

    if (!items[id]) {
      onFail();
      return;
    }

    if (open && items[open]) {
      items[open].collapsed = true;
    }
    items[id].collapsed = false;

    this.setState({ items, open: id });
  };

  close = (id) => {
    const { items } = this.state;
    const { onFail } = this.props;
    if (!items[id]) {
      onFail();
      return;
    }
    items[id].collapsed = true;

    this.setState({ items, open: null });
  };

  navigationKeys = (event) => {
    const isUp = event.key === 'ArrowUp';
    const isDown = event.key === 'ArrowDown';
    if (isUp || isDown) {
      const { open, items } = this.state;
      if (isUp && !open) {
        return;
      }
      const itemsKeys = Object.keys(items);
      if (isDown && !open) {
        this.open(itemsKeys[0]);
        return;
      }

      const index = itemsKeys.indexOf(open);
      if (isDown) {
        if (index !== itemsKeys.length - 1) {
          this.open(itemsKeys[index + 1]);
        }
      }

      if (isUp) {
        if (index !== 0) {
          this.open(itemsKeys[index - 1]);
        }
      }
    }
  };

  render() {
    const { items } = this.props;
    const { items: stateItems } = this.state;

    return (
      <ul className='list_no-type collapsible-items-list'>
        {items.map((item) => (
          <li key={item.props.id}>
            {React.cloneElement(item, {
              open: this.open,
              close: this.close,
              collapsed: stateItems[item.props.id] && stateItems[item.props.id].collapsed,
            })}
          </li>
        ))}
      </ul>
    );
  }
}

CollapsibleItemsList.defaultProps = {
  open: null,
  onFail: () => {
    document.location.href = '/404';
  },
};

CollapsibleItemsList.propTypes = {
  open: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  onFail: PropTypes.func,
};

export default CollapsibleItemsList;
