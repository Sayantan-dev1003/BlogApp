import { Route, Routes } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage"
import FeedPage from './Pages/FeedPage'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path='/feed' element={<FeedPage />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/editProfile' element={<EditProfile />}></Route>
        </Routes>
        <ToastContainer 
          position="top-right" // You can change the position as needed
          autoClose={2000} // Duration in milliseconds for auto close
          hideProgressBar={false} // Show progress bar
          newestOnTop={false} // Newest toast on top
          closeOnClick // Close on click
          rtl={false} // Right to left
          pauseOnFocusLoss // Pause on focus loss
          draggable // Allow dragging
          pauseOnHover // Pause on hover
        />
    </>
  )
}

export default App