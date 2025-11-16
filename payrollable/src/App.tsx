import './App.css'
import Login from './components/Login'
import { login } from './api/auth'

function App() {
  const onLogin = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='container d-flex justify-content-center align-items-center vh-100'>
        <Login onLogin={onLogin}/>
      </div>
    </>
  )
}

export default App
