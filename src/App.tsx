import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NoPage from './pages/NoPage'
import {useStore} from "./store"

function App() {
  const {loggedIn}:any = useStore()
  console.log("from app.tsx",loggedIn)
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route index Component={Home}></Route>
            <Route path='/register' Component={Register}></Route>
            <Route path='/login' Component={Login}></Route>
            <Route path='*' Component={NoPage}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App