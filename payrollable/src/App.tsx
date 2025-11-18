import { Outlet } from 'react-router';
import './App.css'
import Navbar from './components/Navbar';

function App() {
  // const { user, logout } = useAuth();

  return (
    <>
      <Navbar />
      <div className='container d-flex justify-content-center align-items-center'>
        <Outlet />
      </div>
    </>
  )
}

export default App
