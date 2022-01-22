import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function ExploreCard(props) {
  const { post } = props
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
              <Card height={200} style={{ borderRadius: "10px", objectFit: "cover" }}>
                <video autoPlay muted loop>
                  <source src={post.video} type="video/mp4" />
                </video>
              </Card>
            ) : null}

            <Card.ImgOverlay>
              <Card.Text></Card.Text>
            </Card.ImgOverlay>
          </Link>
        </Card>
      </Col>
    </>
  )
}

export default ExploreCard
