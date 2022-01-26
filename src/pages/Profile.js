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
import styles from "../style/profileStyle.css"

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
      <NavbarItem inProfile={true} />
      <>
        <div class="header-spacer"></div>
        <div class="header">
          <div class="header-wrapper">
            <div class="info">
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
                    right: 250,
                    top: 80,
                    width: 150,
                    cursor: "pointer",
                    textAlign: "center",
                    border: "1px black solid",
                  }}
                >
                  <span onClick={() => setEditProfile(true)}>edit profile</span>
                </div>
              )}
              <div class="avatar">
                <Card.Img variant="top" src={profile.avatar} height={145} width={150} />
              </div>
              <div class="details">
                <div class="username">{profile.firstName}</div>
                <div class="bio">{profile.email}</div>
                {/* <div class="location entypo-location">Mayence, Germany</div> */}
              </div>
            </div>
            <div class="stats">
              <div class="one">{profile.interestView.length} interestView</div>
              <div class="two">{profile.favorites.length} favorites</div>
              <div class="three">{profile.myPosts.length} posts</div>
            </div>
          </div>
        </div>
      </>

      <Row style={{ width: 200, marginLeft: 800, marginTop: 20 }}>
        <AddPost />
      </Row>

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginBottom: 50,
            border: "1px black solid",
            boxShadow: "5px 10px #b3b2b3",
            height: 50,
            alignItems: "center",
          }}
        >
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
