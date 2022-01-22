import { useContext } from "react"
import { Button, Modal } from "react-bootstrap"
import PostContext from "../utils/PostContext"

function UserProfile(props) {
  const { show, setShow, post } = props
  const { users } = useContext(PostContext)
  if (!users) return <p> loding...</p>

  const a = users.find(user => user._id == post.owner._id)

  return (
    <>
      <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={a.avatar} alt="" />
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserProfile
