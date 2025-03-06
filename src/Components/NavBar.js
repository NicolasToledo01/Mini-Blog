import styles from "./NavBar.module.css"

import { useAuthentication } from "../hooks/UseAuthentication"
import { useAuthValue } from "../context/AuthContext"


import { NavLink } from 'react-router-dom'
import { use } from "react"

const NavBar = () => {

  const { user } = useAuthValue();

  const { logout } = useAuthentication()
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')} >Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')} >Cadastrar</NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink to="/Dashboard" className={({ isActive }) => (isActive ? styles.active : '')} >Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : '')} >Novo Post</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')} >About</NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}

      </ul >
    </nav >
  )
}

export default NavBar