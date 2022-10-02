import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Register User
  const register = async (user) => {
    console.log('REGISTRATION DATA: ', {user});
  }

  // Login
  const login = async ({email: indentifier, password}) => {
    console.log('LOGIN DATA: ', {indentifier, password});
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