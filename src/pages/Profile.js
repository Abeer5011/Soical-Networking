import { faEdit, faTh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useContext } from "react"
import { Card, Col, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import AddPost from "../components/AddPost"
import EditProfileModal from "../components/EditProfileModal"
import MyPosts from "../components/MyPosts"
import NavbarItem from "../components/NavbarItem"
import PostContext from "../utils/PostContext"

function Profile() {
  const { profile } = useContext(PostContext)
  const [editProfile, setEditProfile] = useState(false)

  if (!profile) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      {/* <NavbarItem inProfile={true} /> */}

      <Row style={{ width: 200, marginLeft: 800, marginTop: 50 }}>
        <AddPost />
      </Row>
      <Row style={{ marginTop: 100 }}>
        <Card
          style={{ width: "18rem", marginLeft: 50, boxShadow: "10px 5px 5px #34312d" }}
          className="align-items-center"
        >
          <button style={{ marginLeft: 250, marginTop: 10 }} className="border-0" onClick={() => setEditProfile(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <Card.Img variant="top" src={profile.avatar} class="rounded-circle" height={100} width={100} />

          <ListGroup className="list-group-flush m-5 " style={{ textAlign: "center" }}>
            <ListGroupItem>{profile.firstName}</ListGroupItem>
            <ListGroupItem style={{ marginTop: 30 }}>{profile.email}</ListGroupItem>
            {/* <ListGroupItem>{profile.birthDate}</ListGroupItem> */}
          </ListGroup>
        </Card>

        <Col style={{ marginTop: 100, marginLeft: 50 }}>
          <FontAwesomeIcon icon={faTh} />

          {profile.myPosts.map(myPost => (
            <MyPosts myPost={myPost} />
          ))}
        </Col>
      </Row>
      <EditProfileModal show={editProfile} setShow={setEditProfile} profile={profile} />
    </>
  )
}

export default Profile
