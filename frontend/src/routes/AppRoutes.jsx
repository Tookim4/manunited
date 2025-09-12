import { Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Legends from '../pages/Legends'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AppRoutes = () => {
  return (
    <div>
      <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/legends" element={<Legends />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
      <Footer/>
    </div>
  )
}

export default AppRoutes