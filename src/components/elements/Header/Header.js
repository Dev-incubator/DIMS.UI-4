import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

import ContainerComponent from '../ContainerComponent';
import Nav from './Nav';
import TextBadge from '../TextBadge';
import SettingsButton from '../SettingsButton';
import MobileNav from './MobileNav';
import matchMaxWidth from '../../../helpers/matchMaxWidth';
import Button from '../Button';
import { ReactComponent as SearchIcon } from '../../../assets/icons/Search.svg';
import { ReactComponent as LogoIcon } from '../../../assets/images/devinc.svg';
import FilterPanel from './FilterPanel';
import useAnimation from '../../../helpers/hooks/useAnimation';
import headerAnimation from '../../../helpers/animations/headerAnimation';

function Header(props) {
  const { title, navItems, role, filterFunction } = props;
  const [filterRegexpMode, setFilterRegexpMode] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const { initState, finalState } = headerAnimation();
  const trigger = () => showFilterPanel;

  const [style, stop] = useAnimation({ trigger, initState, finalState });

  const togglePanel = () => {
    stop();
    filterFunction('');
    setShowFilterPanel(!showFilterPanel);
  };

  return (
    <animated.header className={`header fixed-top${showFilterPanel ? ' extended' : ''}`} style={style}>
      <ContainerComponent display='flex'>
        <p className='site-title'>
          <Link to='/'>
            <LogoIcon className='icon-logo' title='Dev Incubator' />
          </Link>
        </p>
        <div className='content'>
          <ContainerComponent display='flex'>
            {title && (
              <h1 className='page-title'>
                {title}
                {!matchMaxWidth('600px') && role && <TextBadge>{role}</TextBadge>}
              </h1>
            )}
            {navItems && navItems.length && (
              <>
                {matchMaxWidth('1200px') ? (
                  <MobileNav
                    className='header__nav'
                    navItems={[
                      ...navItems,
                      {
                        id: 'settings',
                        active: false,
                        button: <>{role && <SettingsButton buttonClassMod='navItem' layout='text' />}</>,
                      },
                    ]}
                  />
                ) : (
                  <Nav className='header__nav' navItems={navItems} />
                )}
              </>
            )}
            {filterFunction && (
              <Button classMod='invisible' onClick={togglePanel}>
                <SearchIcon className='icon-search' />
              </Button>
            )}
            {!matchMaxWidth('1200px') && role && <SettingsButton />}
          </ContainerComponent>
          {filterFunction && (
            <FilterPanel
              showFilterPanel={showFilterPanel}
              filterRegexpMode={filterRegexpMode}
              setFilterRegexpMode={setFilterRegexpMode}
              filterFunction={filterFunction}
            />
          )}
        </div>
      </ContainerComponent>
    </animated.header>
  );
}

Header.defaultProps = {
  navItems: null,
  role: null,
  filterFunction: null,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navItems: Nav.propTypes.navItems,
  role: PropTypes.string,
  filterFunction: PropTypes.func,
};

export default Header;
