import React from 'react'
import styles from "./login.module.css"

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/UseAuthentication';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);
    console.log(res)

  };


  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.main}>
      <h1> Entrar</h1>
      <p>Acesse seu login para acessar seu o blog!</p>
      <form onSubmit={handleSubmit} >
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
        </label>

        {!loading && <button className="btn">Acessar</button>}
        {loading && <button className="btn">Aguarde...</button>}

        {/* Exibindo a mensagem de erro se existir */}
        {error && <p className="error">{error}</p>}


      </form>
    </div>
  )
}

export default Login;