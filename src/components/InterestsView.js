import { ListGroup } from "react-bootstrap"
import { Card } from "react-bootstrap"

function InterestsView(props) {
  const { interestViewA } = props
  return (
    <>
      <ListGroup.Item>
        interest: {interestViewA.interestId.interest}
        <br />
        view numbers: {interestViewA.viewCount}
      </ListGroup.Item>
    </>
  )
}

export default InterestsView
