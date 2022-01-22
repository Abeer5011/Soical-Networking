import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function MyFavorites(props) {
  const { favorite } = props
  return (
    <>
      <Card className="border-0" style={{ width: "15rem", marginTop: 50, marginLeft: 30 }}>
        <Link to={`/post/${favorite._id}`}>
          {favorite.photo ? (
            <Card.Img
              variant="top"
              src={favorite.photo}
              height={200}
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
          ) : null}
          {favorite.video ? (
            <Card height={200} style={{ borderRadius: "10px", objectFit: "cover" }}>
              <video autoPlay muted loop>
                <source src={favorite.video} type="video/mp4" />
              </video>
            </Card>
          ) : null}
        </Link>
      </Card>
    </>
  )
}

export default MyFavorites
