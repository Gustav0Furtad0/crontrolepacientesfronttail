import React, { useEffect, useState } from 'react';
import BasePage from '../components/base/basePage';
import AddPaymentModal from '../components/modals/addPagamento';
import GenericTableComplex from './../components/visual/tableComplex';
import Pagamento from '../scripts/pagemento';

export default function FinanceiroPage() {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [pagamentos, setPagamentos] = useState([]);

    const fetchPagamentos = async () => {
        try {
            const pagamentos = await Pagamento.getAllPagamentos();
            console.log(pagamentos);
            setPagamentos(pagamentos);
        } catch (error) {
            console.error('Erro ao buscar pagamentos:', error);
        }
    };

    useEffect(() => {
        fetchPagamentos();
    }, []);

    const columns = [
        { key: 'pacienteNome', title: 'Devedor' },
        { key: 'data', title: 'Data' },
        { key: 'hora', title: 'Horário' },
        { key: 'valor', title: 'Valor' },
        { key: 'registradoPor', title: 'Registrado por', render: (value) => {
            return value.split(' ')[0] + ' ' + value.split(' ')[value.split(' ').length - 1];
        }},
        { key: 'actions', title: 'Ações', render: () => (
            <button 
                className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5" 
                type="button"
            >
                Editar
            </button> 
        )},
    ];

    const tableData = pagamentos.map((pagamento) => ({
        pacienteNome: pagamento.paciente.nome,
        data: pagamento.abertoEm.split(' ')[0],
        hora: pagamento.abertoEm.split(' ')[1],
        valor: pagamento.valor,
        registradoPor: pagamento.usuario.nome,
    }));

    return (
        <BasePage title="ODT - Financeiro">
            <div className='w-full flex flex-col gap-14'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                        <button 
                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5" 
                            type="button"
                            onClick={() => setIsPaymentModalOpen(true)}
                        >
                            Registrar Pagamento
                        </button>
                        <button 
                            className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5" 
                            type="button"
                        >
                            Filtrar
                        </button>
                    </div>
                    <GenericTableComplex columns={columns} data={tableData} pageMax={10} />
                </div>
            </div>
            {isPaymentModalOpen && <AddPaymentModal onClose={() => setIsPaymentModalOpen(false)} />}
        </BasePage>
    );
}