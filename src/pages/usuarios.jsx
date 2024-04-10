import React, { useState } from 'react';

import BasePage from '../components/base/basePage';
import UserModal from '../components/modals/addUsuario';

import './../css/theme.css';

let user = {
    username: 'user01',
    email: 'user01@example.com',
    role: 'Administrador', 
    status: 'Ativo'
}

let users = []

for (let i = 0; i < 10; i++) {
    users.push({ ...user, username: `user0${i+1}`, email: `user0${i+1}@example.com` });
}

export default function UserPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <BasePage title={"ODT - Usuários"}>
            <div className='w-full flex flex-col gap-14'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                        <button className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Adicionar Usuário
                        </button>
                        <div className="relative">
                            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Pesquisar usuário"/>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Usuário</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Papel</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">{user.status}</td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* A navegação da tabela pode ser reutilizada ou adaptada conforme necessário */}
                </div>
            </div>
            {isModalOpen && <UserModal onClose={() => setIsModalOpen(false)} />}
        </BasePage>
    );
}
