import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function ExploreCard(props) {
  const { post } = props
  return (
    <>
      <Card className="border-0" style={{ margin: 5 }}>
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
            <video autoPlay muted loop style={{ height: 200, objectFit: "cover", borderRadius: 10, width: 330 }}>
              <source src={post.video} type="video/mp4" />
            </video>
          ) : null}

          <Card.ImgOverlay>
            <Card.Text></Card.Text>
          </Card.ImgOverlay>
        </Link>
      </Card>
    </>
  )
}

export default ExploreCard
