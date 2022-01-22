import { faEdit, faHeart, faTh, faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useContext } from "react"
import { Card, Col, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import AddPost from "../components/AddPost"
import EditProfileModal from "../components/EditProfileModal"
import MyFavorites from "../components/MyFavorites"
import MyPosts from "../components/MyPosts"
import NavbarItem from "../components/NavbarItem"
import PostContext from "../utils/PostContext"

function Profile() {
  const { profile } = useContext(PostContext)
  const [editProfile, setEditProfile] = useState(false)
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  if (!profile) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      {/* <NavbarItem inProfile={true} /> */}

      <Col>
        <Card style={{ marginTop: 30, backgroundColor: "#e6e6e6 " }} className="align-items-center">
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={() => setShowEdit(!showEdit)}
            style={{ marginLeft: 250, marginTop: 10, cursor: "pointer" }}
            className="border-0"
          />

          {showEdit && (
            <div
              showEdit={showEdit}
              style={{
                position: "absolute",
                right: 350,
                top: -20,
                backgroundColor: "white",
                width: 150,
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <span onClick={() => setEditProfile(true)}>edit profile</span>
            </div>
          )}
          <Card.Img variant="top" src={profile.avatar} class="rounded-circle" height={100} width={100} />

          <ListGroup className="list-group-flush m-5 " style={{ textAlign: "center" }}>
            <ListGroupItem style={{ backgroundColor: "#e6e6e6 " }}>{profile.firstName}</ListGroupItem>
            <ListGroupItem style={{ backgroundColor: "#e6e6e6 " }}>{profile.email}</ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      <Row style={{ width: 200, marginLeft: 800, marginTop: 20 }}>
        <AddPost />
      </Row>
      <Row style={{ marginLeft: 200 }}>
        <div>
          <FontAwesomeIcon icon={faTh} onClick={() => setShow("myPosts")} style={{ marginRight: 20 }} />
          <FontAwesomeIcon icon={faHeart} onClick={() => setShow("favorites")} />
          {show === "myPosts" ? (
            <Row md={3} className="g-0" style={{ backgroundColor: "#e5e5e5" }}>
              {profile.myPosts.map(myPost => (
                <MyPosts myPost={myPost} />
              ))}
            </Row>
          ) : null}
        </div>
        <div>
          {show === "favorites" ? (
            <Row md={3} className="g-0" style={{ backgroundColor: "#e5e5e5" }}>
              {profile.favorites.map(favorite => (
                <MyFavorites favorite={favorite} key={favorite._id} />
              ))}
            </Row>
          ) : null}
        </div>
      </Row>
      <EditProfileModal show={editProfile} setShow={setEditProfile} profile={profile} />
    </>
  )
}

export default Profile
