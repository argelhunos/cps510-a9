import { Outlet } from 'react-router';
import './App.css'
import Navbar from './components/Navbar';

// App component to display the pages belonging to the /homepage routes.
// Outlet is used to mark where to render the children pages that are under the parent route, /homepage. (see main.tsx)
// Serves as the layout wrapper for all /homepage routes.

function App() {
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
