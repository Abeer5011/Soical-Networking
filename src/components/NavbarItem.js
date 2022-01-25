import { faCameraRetro, faHome, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import PostContext from "../utils/PostContext"
import styles from "../style/navbarStyle.css"

function NavbarItem(props) {
  const { inProfile } = props
  const { logout } = useContext(PostContext)

  return (
    <>
      {inProfile === true ? (
        <>
          {!localStorage.token ? (
            <nav style={styles.navbarS}>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            </nav>
          ) : (
            <nav style={styles.navbarS}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  {" "}
                  <Link to="/explore">Explore</Link>
                </li>

                <li>
                  {" "}
                  <Link to="/explore" onClick={logout}>
                    Logout
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : null}
    </>
  )
}

export default NavbarItem
