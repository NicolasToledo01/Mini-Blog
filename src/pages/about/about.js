import React from 'react'
import style from "./about.module.css"
import { Link } from 'react-router-dom'

const about = () => {
  return (
    <div className={style.about}>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>este projeto foi criado  para ser um blog feito co React de front-end e Firebase de back-end</p>

      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>

  )
}

export default about