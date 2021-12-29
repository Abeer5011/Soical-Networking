import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import firebase from "./utils/firebase"
import Signup from "./pages/Signup"
import PostContext from "./utils/PostContext"
import axios from "axios"
import Login from "./pages/Login"
import NavbarItem from "./components/NavbarItem"
import Greeting from "./pages/Greeting"
import { useEffect, useState } from "react"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import EmailVerified from "./pages/EmailVerified"
import SinglePost from "./pages/SinglePost"

function App() {
  const [profile, setProfile] = useState(null)
  const [interests, setinterests] = useState([])
  const [posts, setPosts] = useState([])
  // const [comments, setComments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getPosts()
    if (localStorage.token) {
      // getComments()
      getInterests()
      getProfile()
    }
  }, [])
  const signup = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const avatar = form.elements.avatar.files[0]
      const avatarRef = firebase.storage().ref("avatars").child(`${avatar.lastModified}-${avatar.name}`)
      await avatarRef.put(avatar)
      const avatarUrl = await avatarRef.getDownloadURL()
      const signupBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        avatar: avatarUrl,
        gender: form.elements.gender.value,
        password: form.elements.password.value,
        birthDate: form.elements.birthDate.value,
        email: form.elements.email.value,
      }
      await axios.post("http://localhost:5000/api/auth/signup", signupBody)

      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const login = async e => {
    e.preventDefault()
    try {
      const form = e.target

      const loginBody = {
        password: form.elements.password.value,
        email: form.elements.email.value,
      }
      const response = await axios.post("http://localhost:5000/api/auth/login", loginBody)
      const token = response.data
      localStorage.token = token

      getProfile()
      getInterests()

      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    localStorage.removeItem("token")
  }

  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: localStorage.token,
        },
      })
      console.log(response.data)
      setProfile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getInterests = async () => {
    const response = await axios.get("http://localhost:5000/api/interests")
    setinterests(response.data)
    console.log(response.data)
  }

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts")

      setPosts(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const puplishPost = async e => {
    e.preventDefault()
    const form = e.target
    try {
      const photo = form.elements.photo.files[0]
      const imageRef = firebase.storage().ref("images").child(`${photo.lastModified}-${photo.name}`)
      await imageRef.put(photo)
      const imageUrl = await imageRef.getDownloadURL()

      // const video = form.elements.video.files[0]
      // const videoRef = firebase.storage().ref("videos").child(`${video.lastModified}-${video.name}`)
      // await videoRef.put(video)
      // const videoUrl = await videoRef.getDownloadURL()

      const interests = []

      form.elements.interests.forEach(interest => {
        if (interest.checked) {
          interests.push(interest.value)
        }
      })

      const postBody = {
        photo: imageUrl,
        // video: videoUrl,
        interests: interests,
        caption: form.elements.caption.value,
      }
      await axios.post("http://localhost:5000/api/posts", postBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })

      console.log("success")
      getPosts()
      getProfile()
    } catch (error) {
      console.log(error)
    }
  }

  const likePost = async postId => {
    try {
      await axios.get(`http://localhost:5000/api/posts/${postId}/favorites`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      console.log("like")
      getPosts()
    } catch (error) {
      console.log(error)
    }
  }

  const interestPicked = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const interests = []

      form.elements.interests.forEach(interest => {
        if (interest.checked) {
          interests.push(interest.value)
        }
      })

      const interestBody = {
        interests: interests,
      }
      await axios.post("http://localhost:5000/api/auth/interests", interestBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      getProfile()
      navigate("/")
      console.log("added")
    } catch (error) {
      console.log(error)
    }
  }

  const editProfile = async e => {
    e.preventDefault()
    const form = e.target
    try {
      const avatar = form.elements.avatar.files[0]
      const avatarRef = firebase.storage().ref("avatars").child(`${avatar.lastModified}-${avatar.name}`)
      await avatarRef.put(avatar)
      const avatarUrl = await avatarRef.getDownloadURL()
      const profileBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        avatar: avatarUrl,
        birthDate: form.elements.birthDate.value,
        email: form.elements.email.value,
      }
      await axios.put("http://localhost:5000/api/auth/profile", profileBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      getProfile()
    } catch (error) {
      console.log(error)
    }
  }

  // const getComments = async postId => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/posts/${postId}/comments`)
  //     setComments(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const applyComment = async (e, postId) => {
    e.preventDefault()
    try {
      const form = e.target

      const commentBody = {
        comment: form.elements.comment.value,
      }
      await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, commentBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })

      getPosts()
      form.rest()
    } catch (error) {
      console.log(error)
    }
  }
  const store = {
    signup,
    login,
    logout,
    profile,
    interests,
    posts,
    puplishPost,
    likePost,
    interestPicked,
    editProfile,
    applyComment,
  }

  return (
    <PostContext.Provider value={store}>
      <NavbarItem />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/greeting" element={<Greeting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/myPosts" element={<MyPosts />} /> */}
        <Route path="/email_verified/:token" element={<EmailVerified />} />
      </Routes>
    </PostContext.Provider>
  )
}

export default App
