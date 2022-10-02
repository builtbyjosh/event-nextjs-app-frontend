import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Register User
  const register = async (user) => {
    console.log('REGISTRATION DATA: ', {user});
  }

  // Login
  const login = async ({email: identifier, password}) => {
    console.log('LOGIN DATA: ', {identifier, password});
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    })
    const data = await res.json()
    console.log('DATA: ', data);
    if(res.ok){
      setUser(data.user)

    } else {
      setError(data.error)
      // setError(null)
    }
  }

  // Logout
  const logout = async () => {
    console.log('LOGOUT');
  }

  // Check Login Status
  const checkUserLoggedIn = async ({user}) => {
    console.log('CHECK USER LOGIN: ', {user});
  }

  return (
    <AuthContext.Provider value={{user, error, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext