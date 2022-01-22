import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

function EmailVerified() {
  const { token } = useParams()
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const verifyEmailToken = async () => {
    try {
      await axios.get(`http://localhost:5000/api/auth/verify_email/${token}`)

      navigate("/login")
      toast.success("done")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
    verifyEmailToken()
  }, [])

  return error ? <h1>verification faild</h1> : <h1>verifying...</h1>
}

export default EmailVerified
