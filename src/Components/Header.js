import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';

import { Link } from 'react-router-dom';  

  

  const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return(

        <Navbar color="dark" dark expand="md">
        <div className="container">
            <NavbarBrand tag={Link} to="/">Minhas séries</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                            <NavLink tag={Link} to="/generos" style={{color: "white"}}>Gêneros</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink tag={Link} to="/series" style={{color: "white"}}>Séries</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
        </div>
        </Navbar>

    );

  }

  export default Header;