import { faCameraRetro, faHome, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import PostContext from "../utils/PostContext"

function NavbarItem(props) {
  const { inProfile } = props
  const { logout } = useContext(PostContext)

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ maxWidth: "1100px" }}>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
            {!localStorage.token ? (
              <>
                <Link to="/login" className="navbar-brand" style={{ fontSize: 17 }}>
                  Login
                </Link>
                <Link to="/signup" className="navbar-brand" style={{ fontSize: 17 }}>
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="navbar-brand">
                  <FontAwesomeIcon icon={faHome} />
                </Link>

                <Link to="/explore" className="navbar-brand" style={{}}>
                  <FontAwesomeIcon icon={faCameraRetro} />
                </Link>

                <Link to="/" className="navbar-brand" style={{ fontSize: 17 }} onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  {/* <i class="fas fa-sign-out-alt"></i> */}
                </Link>

                <Link to="/profile" className="navbar-brand">
                  {/* <img class="rounded-circle" src={profile.avatar} alt="" height={50} /> */}

                  <FontAwesomeIcon icon={faUserCircle} />
                </Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarItem
