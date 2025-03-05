import React from 'react'
import styles from "./createPost.module.css"

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from '../../context/authContext';
import { UseInsertDocument } from '../../hooks/UseInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = UseInsertDocument("posts")

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    // validação da imagem

    try {
      new URL(image);
    } catch (error) {
      formError("a imagem precisa ser uma URL");
    }

    //criar array das tags

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todo valores
    if (!title || !tags || !image || !body) {
      setFormError("Por Favor, preencha todos os campos corretamente.");
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });
    //redirect home page
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
      <h2>Crie um Post</h2>
      <p>Escreva o que quiser e compartilhe seu conhecimento!</p>
      <form onSubmit={handleSubmit}>

        <label>
          <span>titulo:</span>
          <input
            type='text'
            name='title'
            value={title}
            placeholder='escreva seu título..'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input
            type='text'
            name='image'
            value={image}
            placeholder='Insira uma imagem que representa seu post..'
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            type='text'
            name='body'
            value={body}
            placeholder='Descreva sobre seu post...'
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Tags:</span>
          <input
            type='text'
            name='tags'
            value={tags}
            placeholder='insira as tags separadas por vírgula.'
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </label>
        {!response.loading && <button className="btn">Criar Post</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  )
}

export default CreatePost;