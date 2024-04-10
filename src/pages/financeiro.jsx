import React, { useState } from 'react';

import BasePage from '../components/base/basePage';

import AddPaymentModal from '../components/modals/addPagamento';


import './../css/theme.css';

export default function FinanceiroPage() {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const pagamentos = [
        { id: 1, nome: "João Silva", data: "25/03/2024", horario: "15:55", valor: "R$ 200,00", responsavel: "Maria Oliveira"},
        { id: 2, nome: "Maria Oliveira", data: "24/03/2024", horario: "16:35", valor: "R$ 350,00", responsavel: "Sintia Silva"},
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
                                <tr key={pagamento.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                </div>
            </div>
            {isPaymentModalOpen && <AddPaymentModal onClose={() => setIsPaymentModalOpen(false)} />}
        </BasePage>
    );
}