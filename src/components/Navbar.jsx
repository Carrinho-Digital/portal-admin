import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import CookieUtil from '../util/cookie';

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory()
  const userInfo = CookieUtil.getUserInfo()

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    CookieUtil.remove();
    history.replace("/login")
  }

  return <Navbar className="shadow-sm" fixed="top" color="dark" dark expand="md">
    <NavbarBrand href="/">Carrinho digital</NavbarBrand>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/vendas">Vendas</NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to="/produtos">Produtos</NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to="/promocoes">Promoções</NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {userInfo?.name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/perfil">
                  Perfil
                </DropdownItem>
                <DropdownItem onClick={logout}>
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
      </Nav>
      {/* <NavLink tag={Link} to="#" onClick={logout}>Logout</NavLink> */}
    </Collapse>
  </Navbar>
}

export default NavbarComponent;