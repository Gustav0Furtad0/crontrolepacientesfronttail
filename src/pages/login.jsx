import React, { useState, useEffect } from "react";
import Footer from "../components/base/footer";
import { useNavigate } from 'react-router-dom';

import '../css/theme.css';


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const navigate = useNavigate();

    const welcomeMessages = [
        "Pronto para fazer mais <span class='border-b-4 border-teal-500'>um dia incrível</span>?",
        "Vamos juntos <span class='border-b-4 border-teal-500'>fazer a diferença</span> hoje?",
        "Pronto para alcançar <span class='border-b-4 border-teal-500'>novos patamares</span>?",
        "Vamos fazer hoje ainda <span class='border-b-4 border-teal-500'>melhor que ontem!</span>",
        "Juntos, vamos <span class='border-b-4 border-teal-500'>superar qualquer desafio</span>!",
        "Pronto para mais um <span class='border-b-4 border-teal-500'>dia de sucesso</span>?",
        "Hora de fazer <span class='border-b-4 border-teal-500'>a mágica acontecer</span>!",
        "Vamos fazer hoje <span class='border-b-4 border-teal-500'>valer a pena</span>!",
        "Pronto para <span class='border-b-4 border-teal-500'>fazer história</span> hoje?",
    ];

    const handleForgotPasswordClick = () => {
        setIsResetPassword(true);
    };

    useEffect(() => {
        const selectedMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        setWelcomeMessage(selectedMessage);
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha no login');
            }
    
            const data = await response.json();
            sessionStorage.setItem('userToken', data.token);

            navigate('/pacientes');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="grow flex items-center justify-center bg-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-96 space-y-8 p-10 rounded-xl drop-shadow-lg bg-white">
                    <div>
                    {isResetPassword ? (
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Digite seu email para recuperar a senha
                        </h2>
                    ) : (
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" dangerouslySetInnerHTML={{ __html: welcomeMessage }}>
                        </h2>
                    )}
                    </div>
                    {isResetPassword ? (
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            {/* Formulário de recuperação de senha */}
                            <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                            </div>
                            <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                Recuperar senha
                            </button>
                            </div>
                        </form>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                <input
                                        id="username"
                                        name="username" // Alterado de email-address para username
                                        type="text" // Tipo alterado para text
                                        autoComplete="username"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                        placeholder="Usuário" // Alterado de Email para Usuário
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="w-full text-sm text-center">
                                    <button
                                        onClick={handleForgotPasswordClick}
                                        className="font-medium text-teal-500 hover:text-teal-500"
                                    >
                                        Esqueceu a senha?
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={handleLogin}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                        )}
                </div>
                
            </div>
            <Footer />
        </div>
    );
}
