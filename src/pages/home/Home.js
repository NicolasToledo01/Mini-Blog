import React, { use } from 'react'
import style from "./home.module.css"
//hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { UseFetchDocuments } from '../../hooks/UseFetchDocuments';

//components 
import PostDetail from '../../Components/PostDetail';


const Home = () => {

  const [query, setQuery] = useState("")
  const { documents: posts, loading } = UseFetchDocuments("posts")

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }
  return (
    <div className={style.home}>
      <h1> Veja os nossos posts mais recentes </h1>

      <form onSubmit={handleSubmit} className={style.seach_form}>
        <input
          type='text'
          placeholder='busque por tags...'
          onChange={(e) => setQuery(e.target.value)}
          value={query} />

        <button className=' btn btn-dark'> Pesquisar </button>
      </form>

      <div className="post-list">
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className={style.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Home;