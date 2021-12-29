import { faTh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dropdown } from "bootstrap"
import { Button, Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

function MyPosts(props) {
  const { myPost } = props
  return (
    <>
      {/* <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <Card className="border-0" style={{ width: "15rem", marginTop: 50, marginLeft: 30 }}>
        <Card.Img variant="top" src={myPost.photo} height={200} style={{ borderRadius: "10px", objectFit: "cover" }} />
      </Card>
    </>
  )
}
export default MyPosts
