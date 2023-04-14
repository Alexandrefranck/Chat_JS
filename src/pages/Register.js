import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import background from "../images/background.png";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import PasswordStrengthBar from 'react-password-strength-bar';



const Login = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-image: url(${background});
    background-size: contain;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    min-width: 33vw;
    padding: 2rem;
    background-color: var(--background-primary);
    box-shadow: var(--elevation-low);
    border-radius: 5px;
    text-align: center;
    color: var(--primary);
    @media screen and (max-width: 600px) {
      width: 100vw;
      height: 100vh;
    }
    h1 {
        font-size: 24px;
        font-weight: 600;
    }

    h3 {
        font-size: 14px;
        font-weight: 400;
        color: var(--subtitle);
    }

    form {
        display: grid;
        gap: 20px;
        label {
            display: block;
            font-size: 12px;
            color: var(--subtitle);
            font-weight: 700;
            text-transform: uppercase;
            text-align: left;
            &[aria-required]::after {
                content: "*";
                color: red;
                margin-left: 0.5rem;
            }
        }
        input, button {
            color: var(--text)
            padding: 10px;
            padding: 10px;
            max-height: 40px;
            border-radius: 3px;
        }
        input {
            background-color: var(--background-sidebar-server);
        }
        button {
            background-color: var(--blue);
            cursor: pointer;
            transition: background-color 0.1s linear;
            font-size: 1rem;
            &:hover {
                background-color: var(--dark-blue)
            }
        }
    }
    a {
        color: var(--primary);
    }
`;

export default function ({ setUser }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister(email, username, password) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(user, {
                displayName: username,
              }).then(
                function () {
                  // Profile updated successfully!
                  setUser(username)
                  navigate("/dashboard");
                },
                function (error) {
                  // An error happened.
                }
              );
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
          });
        }
          
    return (
        <Login>
            <Container>
                <div>
                    <h1>Créer un compte</h1>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRegister(email, username, password);
                    }}
                >
                    <label htmlFor="email" aria-required>
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <label htmlFor="username" aria-required>
                        Nom d'utilisateur
                    </label>
                    <input
                        type="text"
                        id="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <label htmlFor="password" aria-required>
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <PasswordStrengthBar password={password} />

                    <button type="submit">S'enregistrer</button>
                </form>
                <Link to="/">Déjà un compte ? Se connecter</Link>
            </Container>
        </Login>
    );
}
