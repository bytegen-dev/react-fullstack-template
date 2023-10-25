import React, { useEffect, useReducer } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import Home from './pages/home/Home'
import Store from './pages/store/Store'
import Dashboard from './pages/dashboard/Dashboard'
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import Header from './components/header/Header'
import Menu from './components/Menu/Menu'
import AppContext from './appContext/appContext'
import "./styles/index.scss"

const App = () => {
  const initialState = {
    isLoggedIn: false,
    token: "",
    exchangeRate: 1000,
    user:{
      userName: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      imgUrl: "",
      isAdmin: false,
      userId: "",
      purchased: []
    },
    allUsers:[],
    Store: [],
    isLoading: false,
  }

  const navigate = useNavigate()

  const updateAppState = (state, action)=>{
    const actionType = action.type
    const data = action.data

    switch (actionType){
      case ("logged-in"):
        const userData = data
        state.functions.handleNotification("Login Successful", "success")
        localStorage.setItem("token", userData.token)
        localStorage.setItem("userId", userData.userId)
        return {
          ...state,
          isLoggedIn: true,
          isChecking: false,
          isCheckingPlan: true,
          token: userData.token,
          user: {
          ...state.user,
          }
        }

      case ("loaded"):
        return{
          ...state,
          isLoading: false,
        }

      case ("got-current-user"):
      const user = data.user
      console.log(user)
      const token = localStorage.getItem("token")
      
      return {
        ...state,
        isLoggedIn: true,
        token: token,
        isChecking: false,
        isCheckingPlan: true,
        user: {
          ...state.user,
        }
      }

      case ("got-users"):
        const allUsers = data
        return {
          ...state,
          allUsers: [
            ...allUsers
          ]
        }

      case ("navigate"):
        const path = data
        navigate(path)
        return {
          ...state,
        }

      default:
        return state
      
    }
  }  

  const [appState, dispatch] = useReducer(updateAppState, initialState)

  useEffect(()=>{
    setTimeout(()=>{
      dispatch({type: "loaded"})
    }, 500)
  },[])

  return (
    <AppContext.Provider value={appState}>
      <div className='app'>
        My Reactjs Full Stack website template
        <Header />
        <Menu />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Dashboard />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App