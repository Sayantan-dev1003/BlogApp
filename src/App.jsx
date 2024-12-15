import { Route, Routes } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage"
import "./App.css"

const App = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<LoginPage />}></Route>
        </Routes>
    </>
  )
}

export default App