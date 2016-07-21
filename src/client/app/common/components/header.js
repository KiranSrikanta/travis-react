import {IndexLink, Link} from 'react-router';
import React, {PropTypes} from 'react';

class NavLink extends React.Component {
  render() {
    const isActive = this.context.router.isActive(this.props.to);
    // eslint-disable-next-line no-ternary
    let className = isActive ? 'active' : '';

    return (
      <li role="presentation" className={className}>
        <Link {...this.props}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}

NavLink.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string.isRequired
};

NavLink.contextTypes = {
  router: PropTypes.object,
  location: React.PropTypes.object.isRequired
};


class NavIndexLink extends React.Component {
  render() {
    const isActive = this.context.router.isActive(this.props.to, true);
    // eslint-disable-next-line no-ternary
    let className = isActive ? 'active' : '';

    return (
      <li role="presentation" className={className}>
        <IndexLink {...this.props}>
          {this.props.children}
        </IndexLink>
      </li>
    );
  }
}

NavIndexLink.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string.isRequired
};

NavIndexLink.contextTypes = {router: PropTypes.object};


class Header extends React.Component {
  render() {
    return (
      <ul className="header nav nav-tabs">
        <NavIndexLink to="/" activeClassName="active">Home</NavIndexLink>
        <NavLink to="todo" activeClassName="active">TODO</NavLink>
      </ul>
    );
  }
}

export default Header;