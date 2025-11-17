import './App.css'
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext'

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar />
      <div className='container d-flex justify-content-center align-items-center'>
        <p>hello world</p>
        <p>you are {user?.username}</p>
        <p>haha ur pass is {user?.password}</p>
        <button onClick={logout}></button>
      </div>
    </>
  )
}

export default App
