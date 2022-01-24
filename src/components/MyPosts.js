import { faEllipsisV, faTh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dropdown } from "bootstrap"
import { Button, Card, Col, DropdownButton, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

function MyPosts(props) {
  const { myPost } = props
  return (
    <>
      <Link to={`/myPost/${myPost._id}`}>
        <Card className="border-0" style={{ margin: 5 }}>
          {myPost.photo ? (
            <Card.Img
              variant="top"
              src={myPost.photo}
              height={200}
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
          ) : null}
          {myPost.video ? (
            <Card height={200} style={{ borderRadius: "10px", objectFit: "cover" }}>
              <video autoPlay muted loop>
                <source src={myPost.video} type="video/mp4" />
              </video>
            </Card>
          ) : null}
        </Card>
      </Link>
    </>
  )
}
export default MyPosts
