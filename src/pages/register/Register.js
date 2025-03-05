import { useAuthentication } from "../../hooks/UseAuthentication";
import styles from "./register.module.css"
import React, { useEffect, useState } from "react"

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("");

    const user = {
      email,
      displayName,
      password,
    };

    if (password !== confirmPassword) {
      setError("as senhas precisam ser iguais!")
      return
    }

    const res = await createUser(user);

    console.log(res)
  };

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])



  return (
    <div className={styles.register}>
      <h1> Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas historias!</p>
      <form onSubmit={handleSubmit} >
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do Usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="comfirmPassword"
            required
            placeholder="Comfirme sua Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}

          />
          {!loading && <button className="btn">Cadastrar</button>}
          {loading && <button className="btn">Aguarde...</button>}

          {/* Exibindo a mensagem de erro se existir */}
          {error && <p className="error">{error}</p>}

        </label>
      </form>
    </div>
  )
}

export default Register;
