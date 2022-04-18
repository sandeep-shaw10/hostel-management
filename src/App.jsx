// Dependency & Library
import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Routes & Components
import ProtectedRoute from './authorize/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// Page Components
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Dashboard/Logout'
import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './pages/NotFound'
import Block from './pages/Dashboard/Block/Block'
import RoomBlock from './pages/Dashboard/Block/RoomBlock'
import Staff from './pages/Dashboard/Staff/Staff'
import AddStaff from './pages/Dashboard/Staff/AddStaff'
import Rooms from './pages/Dashboard/Room/Rooms'
import RoomDetail from './pages/Dashboard/Room/RoomDetail'
import AddRoom from './pages/Dashboard/Room/AddRoom'
import Student from './pages/Dashboard/Student/Student'
import AddStudent from './pages/Dashboard/Student/AddStudent'
import StudentDetail from './pages/Dashboard/Student/StudentDetail'


function App() {

  const [state, setState] = useState()
  const [apiLink, setApiLink] = useState('https://hostel-management-omega.vercel.app')
  
  useEffect(() => {
    const local =  JSON.parse(localStorage.getItem('state'))
    setState(local)

    //token lost on refresh
    // localStorage.removeItem("auth-token")
  }, [])

  return (
    <div className="App">
        <Router basename="hostel-management" >
          <Navbar state={state} />

          <div className='content'>
            <Routes >
              <Route exact path="/" element={<Home/>} />

              <Route path="/login" element={<ProtectedRoute status='loggedOut' state={state} apiLink={apiLink} />} >
                <Route index element={<Login state={state} apiLink={apiLink} setState={setState} />} />
              </Route>

              <Route path="/dashboard" element={<ProtectedRoute status='loggedIn' state={state} apiLink={apiLink} />}>
                <Route index element={<Dashboard state={state} apiLink={apiLink} />} />

                <Route path="staff">
                  <Route index element={ <Staff state={state} apiLink={apiLink} setState={setState}/> } />
                  <Route path="add" element={ <AddStaff state={state} apiLink={apiLink} setState={setState} /> } />
                </Route >


                <Route path="block">
                  <Route index element={ <Block state={state} apiLink={apiLink} /> } />
                  <Route path=":blockId" element={ <RoomBlock state={state} apiLink={apiLink} /> } />
                </Route>

                <Route path="student">
                  <Route index element={ <Student state={state} apiLink={apiLink} setState={setState}/> } />
                  <Route path="add" element={ <AddStudent state={state} apiLink={apiLink} setState={setState}/> } />
                  <Route path=":studentRoll" element={ <StudentDetail state={state} apiLink={apiLink} setState={setState}/> } />
                </Route>

                <Route path="room">
                  <Route index element={ <Rooms state={state} apiLink={apiLink} setState={setState}/> } />
                  <Route path="add" element={ <AddRoom state={state} apiLink={apiLink} setState={setState}/> } />
                  <Route path=":roomId" element={ <RoomDetail state={state} apiLink={apiLink} setState={setState}/>  } />
                </Route>

              </Route>

              <Route path="/logout" element={<ProtectedRoute status='loggedIn' state={state} apiLink={apiLink} />}>
                <Route index element={<Logout setState={setState}/>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer />
        </Router>
    </div>
  )
}

export default App