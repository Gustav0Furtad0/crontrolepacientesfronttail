import React, { useState } from 'react';

import BasePage from '../components/base/basePage';

import AddPaymentModal from '../components/modals/addPagamento';


import './../css/theme.css';

export default function FinanceiroPage() {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const pagamentos = [
        { id: 1, nome: "João Silva", data: "25/03/2024", horario: "15:55", valor: "R$ 200,00", responsavel: "Maria Oliveira"},
        { id: 2, nome: "Maria Oliveira", data: "24/03/2024", horario: "16:35", valor: "R$ 350,00", responsavel: "Sintia Silva"},
        { id: 3, nome: "Sintia Silva", data: "23/03/2024", horario: "17:15", valor: "R$ 400,00", responsavel: "João Silva"},
        { id: 4, nome: "João Silva", data: "22/03/2024", horario: "18:00", valor: "R$ 200,00", responsavel: "Maria Oliveira"},
        { id: 5, nome: "Maria Oliveira", data: "21/03/2024", horario: "19:00", valor: "R$ 350,00", responsavel: "Sintia Silva"},
        { id: 6, nome: "Sintia Silva", data: "20/03/2024", horario: "20:00", valor: "R$ 400,00", responsavel: "João Silva"},
        { id: 7, nome: "João Silva", data: "19/03/2024", horario: "21:00", valor: "R$ 200,00", responsavel: "Maria Oliveira"},
        { id: 8, nome: "Maria Oliveira", data: "18/03/2024", horario: "22:00", valor: "R$ 350,00", responsavel: "Sintia Silva"},
        { id: 9, nome: "Sintia Silva", data: "17/03/2024", horario: "23:00", valor: "R$ 400,00", responsavel: "João Silva"},
        { id: 10, nome: "João Silva", data: "16/03/2024", horario: "00:00", valor: "R$ 200,00", responsavel: "Maria Oliveira"},
    ];

    return (
        <BasePage title="ODT - Financeiro">
            <div className='w-full flex flex-col gap-14'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                        <button 
                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                            type="button"
                            onClick={() => setIsPaymentModalOpen(true)}
                        >
                            Registrar Pagamento
                        </button>
                        <button 
                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                            type="button"
                            // onClick={() => setIsModalOpen(true)}
                        >
                            Filtrar
                        </button>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Devedor</th>
                                <th scope="col" className="px-6 py-3">Data</th>
                                <th scope="col" className="px-6 py-3">Horário</th>
                                <th scope="col" className="px-6 py-3">Valor</th>
                                <th scope="col" className="px-6 py-3">Registrado por</th>
                                <th scope="col" className="px-6 py-3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagamentos.map((pagamento) => (
                                <tr key={pagamento.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{pagamento.nome}</td>
                                    <td className="px-6 py-4">{pagamento.data}</td>
                                    <td className="px-6 py-4">{pagamento.horario}</td>
                                    <td className="px-6 py-4">{pagamento.valor}</td>
                                    <td className="px-6 py-4">{pagamento.responsavel}</td>
                                    <td className="px-6 py-4">
                                        <button 
                                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                            type="button"
                                            // onClick={() => setIsModalOpen(true)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 p-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-teal-500 border border-gray-300 bg-blue-50 hover:bg-teal-100 hover:text-teal-700">3</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {isPaymentModalOpen && <AddPaymentModal onClose={() => setIsPaymentModalOpen(false)} />}
        </BasePage>
    );
}