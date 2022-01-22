import { Card, Col, Row } from "react-bootstrap"

function PopularPost(props) {
  const { popularOne } = props
  return (
    <Card
      className="border-0"
      style={{ width: "15rem", marginTop: 10, marginLeft: 55, height: "10rem", backgroundColor: "#ced4da" }}
    >
      {/* <Card.Img
        variant="top"
        src={popularOne.photo}
        height={100}
        style={{ borderRadius: "10px", objectFit: "cover" }}
      /> */}
      <Card.Body>
        <div style={{ display: "flex", marginBottom: 30 }}>
          <img src={popularOne?.owner?.avatar} style={{ borderRadius: "10px" }} height={30} />
          <h6 className="ms-2 mt-2">{popularOne?.owner?.firstName}</h6>
        </div>
        <div style={{ borderRadius: "10px", backgroundColor: "#bdb2ff", height: 50 }}>
          <Card.Text className="ms-3">{popularOne.caption}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PopularPost
