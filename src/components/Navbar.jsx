import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import CookieUtil from '../util/cookie';

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory()

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    CookieUtil.remove();
    history.replace("/login")
  }

  return <Navbar className="shadow-sm" fixed="top" color="white" light expand="md">
        <NavbarBrand href="/">Carrinho digital</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Início</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/vendas">Vendas</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={Link} to="/produtos">Produtos</NavLink>
            </NavItem>
            
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <NavLink tag={Link} to="#" onClick={logout}>Logout</NavLink>
        </Collapse>
      </Navbar>
}

export default NavbarComponent;