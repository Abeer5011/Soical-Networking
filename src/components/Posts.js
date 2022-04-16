import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { useContext } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import PostContext from "../utils/PostContext"
import { ImBubble2 } from "react-icons/im"
import { Link } from "react-router-dom"
function Posts(props) {
  const { post } = props
  const { profile } = useContext(PostContext)

  return (
    <>
      <Col style={{ width: 300 }}>
        <Card className="border-0" style={{ width: "18rem", marginTop: 20, marginLeft: 70 }}>
          <Link to={`/post/${post._id}`}>
            {post.photo ? (
              <Card.Img
                variant="top"
                src={post.photo}
                height={200}
                style={{ borderRadius: "10px", objectFit: "cover" }}
              />
            ) : null}
            {post.video ? (
              <video autoPlay muted loop style={{ height: 400, objectFit: "cover", borderRadius: 10 }}>
                <source src={post.video} type="video/mp4" />
              </video>
            ) : null}

            <Card.ImgOverlay></Card.ImgOverlay>
          </Link>
        </Card>
      </Col>
    </>
  )
}

export default Posts
