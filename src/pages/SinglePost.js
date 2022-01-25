import { faEllipsisH, faCloudDownloadAlt, faArrowCircleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Button, Card, Col, FloatingLabel, Form, InputGroup, Row, SplitButton } from "react-bootstrap"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { ImBubble2 } from "react-icons/im"
import { useParams } from "react-router-dom"
import FilterPosts from "../components/FilterPosts"
import UserProfile from "../components/UserProfile"
import { saveAs } from "file-saver"
import PostContext from "../utils/PostContext"
import firebase from "../utils/firebase"
import ViewCommentModal from "../components/ViewCommentModal"
import NavbarItem from "../components/NavbarItem"

function SinglePost() {
  const { postId } = useParams()
  const { posts, likePost, profile, applyComment } = useContext(PostContext)
  const [viewComments, setViewComments] = useState(false)
  const [show, setShow] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [Url, setUrl] = useState("")

  if (posts.length === 0) return <h1>Loading...</h1>

  const post = posts.find(post => post._id === postId)

  let liked = false
  if (profile) liked = post.favorites.includes(profile._id)

  const filterPosts = posts.filter(postA =>
    postA.interests.find(interest => post.interests.find(postI => postI._id == interest._id))
  )

  const saveFile = () => {
    saveAs(post.photo)
  }

  return (
    <>
      <NavbarItem inProfile={true} />
      <Card className="text-white" style={{ marginLeft: 300, marginTop: 50, width: 500, borderRadius: 10 }}>
        {post.photo ? (
          <Card.Img variant="top" src={post.photo} style={{ height: 400, objectFit: "cover", borderRadius: 10 }} />
        ) : null}
        {post.video ? (
          <video autoPlay muted loop style={{ height: 400, objectFit: "cover", borderRadius: 10 }}>
            <source src={post.video} type="video/mp4" />
          </video>
        ) : null}
        <Card.ImgOverlay>
          <Card.Title>
            <img src={post.owner.avatar} class="rounded-circle" style={{ objectFit: "cover" }} height={30} width={30} />
            <h6 style={{ display: "inline", color: "white" }} className="ms-2 ">
              @{post.owner.firstName}
            </h6>
          </Card.Title>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 200,
              backgroundColor: "#e4b363",
              opacity: 0.9,
              borderRadius: 15,
              gap: 5,
            }}
          >
            <h6>{post.caption}</h6>
            {post.interests.map(interest => (
              <h6> #{interest.interest}</h6>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "start", marginTop: 50, gap: 15 }}>
            <Button
              variant="none"
              onClick={() => likePost(post._id)}
              style={{ backgroundColor: "#e4b363", borderRadius: 15, color: "white", opacity: 0.9 }}
            >
              {liked ? <FcLike /> : <FcLikePlaceholder />}
              <span className="ms-2"> {post.favorites.length}</span>
            </Button>

            <Button
              variant="none"
              style={{ backgroundColor: "#e4b363", borderRadius: 15, color: "white", opacity: 0.9 }}
            >
              <ImBubble2 onClick={() => setViewComments(true)} />
              <span className="ms-2">{post.comments.length}</span>
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}>
            <FontAwesomeIcon icon={faArrowCircleDown} onClick={saveFile} />
          </div>
        </Card.ImgOverlay>
      </Card>

      <Row md={3} className="g-0">
        {filterPosts.map(filterPost => (
          <FilterPosts key={filterPost._id} filterPost={filterPost} />
        ))}
      </Row>

      <ViewCommentModal setShow={setViewComments} show={viewComments} post={post} />
    </>
  )
}

export default SinglePost
