import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = ( { handleLogout, signedUser }) => {
  return (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#" as="span">
          <Link to="/">Blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to="/users">Users</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          {signedUser
            ? <em><strong>{signedUser.name}</strong> logged in</em>
            : <Link to="/">login</Link>
          }
        </Nav.Link>
          {signedUser ? <Button variant="primary" onClick={handleLogout}>Logout</Button> : null}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Navigation