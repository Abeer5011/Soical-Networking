import { faCameraRetro, faHome, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import PostContext from "../utils/PostContext"
import { BsSearch } from "react-icons/bs"

function NavbarItem(props) {
  const { inProfile } = props
  const { logout } = useContext(PostContext)

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ maxWidth: "1100px" }}>
        <Container fluid>
          <Form className="d-flex" style={{ marginLeft: 200 }}>
            <FormControl
              style={{ borderRadius: "10px", width: 300 }}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="none">
              <BsSearch />
            </Button>
          </Form>

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

                <Link to="/explor" className="navbar-brand" style={{}}>
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
