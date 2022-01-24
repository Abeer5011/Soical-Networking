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
        <Card style={{ marginTop: 30 }} className="align-items-center">
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
            <ListGroupItem>{profile.firstName}</ListGroupItem>
            <ListGroupItem>{profile.email}</ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      <Row style={{ width: 200, marginLeft: 800, marginTop: 20 }}>
        <AddPost />
      </Row>

      <div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 20, marginBottom: 50 }}>
          <FontAwesomeIcon icon={faTh} onClick={() => setShow("myPosts")} />
          <FontAwesomeIcon icon={faHeart} onClick={() => setShow("favorites")} />
        </div>
        {show === "myPosts" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              alignItems: "center",
              gap: 0,
            }}
          >
            {profile.myPosts.map(myPost => (
              <MyPosts key={myPost._id} myPost={myPost} />
            ))}
          </div>
        ) : null}
      </div>
      <div>
        {show === "favorites" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              alignItems: "center",
              gap: 0,
            }}
          >
            {profile.favorites.map(favorite => (
              <MyFavorites favorite={favorite} key={favorite._id} />
            ))}
          </div>
        ) : null}
      </div>

      <EditProfileModal show={editProfile} setShow={setEditProfile} profile={profile} />
    </>
  )
}

export default Profile
