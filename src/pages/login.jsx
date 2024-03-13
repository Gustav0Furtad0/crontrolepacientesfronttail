import React, { useState } from "react";
import Footer from "../components/base/footer";
import { useNavigate } from 'react-router-dom';

import '../css/theme.css';


export default function LoginPage() {
    const [isResetPassword, setIsResetPassword] = useState(false);

    const handleForgotPasswordClick = () => {
        setIsResetPassword(true);
    };

    let navigate = useNavigate();

    const handleLogin = () => {
        const loginSuccessful = true;

        if (loginSuccessful) {
            navigate('/paciente');
        } else {
        }
    };
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
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" dangerouslySetInnerHTML={{ __html: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)] }}>
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
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
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
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Senha"
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
                                Sign in
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
