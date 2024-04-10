import React, { useState, useEffect } from "react";

import GenericSearchModal from "./genericSearchModal";

export default function AddPaymentModal({ onClose }) {
    const now = new Date().toISOString().substring(0, 16);
    const [formData, setFormData] = useState({
        devedor: "",
        dataPagamento: now.split("T")[0],
        horaPagamento: now.split("T")[1],
        valor: "",
        servico: "",
    });

    const [isDevedorSearchOpen, setIsDevedorSearchOpen] = useState(false);
    const [isServicoSearchOpen, setIsServicoSearchOpen] = useState(false);

    // Exemplo de dados para devedores e serviços
    const devedoresData = [
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00" },
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00" },
    ];

    const servicosData = [
        {
            id: 1,
            tipo: "Consulta",
            nomeAbreviado: "Mensalidade",
            parcela: "1/1",
        },
        { id: 2, tipo: "Exame", nomeAbreviado: "Limpeza", parcela: "1/2" },
    ];

    const devedoresColumns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Nome" },
        { key: "debtAmount", title: "Valor Devido" },
    ];

    const servicosColumns = [
        { key: "id", title: "ID" },
        { key: "tipo", title: "Tipo" },
        { key: "nomeAbreviado", title: "Nome Abreviado" },
        { key: "parcela", title: "Parcela" },
    ];

    const handleSelectDevedor = (devedor) => {
        setFormData({ ...formData, devedor: devedor.name });
        setIsDevedorSearchOpen(false);
    };

    const handleSelectServico = (servico) => {
        const servicoString = `${servico.tipo} - ${servico.nomeAbreviado} ${
            servico.parcela ? `| parcela: ${servico.parcela}` : ""
        }`;
        setFormData({ ...formData, servico: servicoString });
        setIsServicoSearchOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    const openDevedorSearch = () => {
        setIsDevedorSearchOpen(true);
    };

    const openServicoSearch = () => {
        setIsServicoSearchOpen(true);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="absolute top-32 bg-white rounded shadow-lg w-1/2">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-semibold text-xl">
                        Adicionar Pagamento
                    </h3>
                    <button className="text-black" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4 flex justify-between">
                        <div className="flex flex-grow mr-2">
                            <input
                                type="text"
                                name="devedor"
                                id="devedor"
                                onChange={handleChange}
                                value={formData.devedor}
                                placeholder="Selecione o devedor"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={openDevedorSearch}
                                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Pesquisar
                            </button>
                        </div>
                        <div className="flex flex-grow ml-2">
                            <input
                                type="text"
                                name="servico"
                                id="servico"
                                onChange={handleChange}
                                value={formData.servico}
                                placeholder="Selecione o serviço"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={openServicoSearch}
                                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Pesquisar
                            </button>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="mr-2 w-full">
                            <label
                                htmlFor="dataPagamento"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Data
                            </label>
                            <input
                                type="date"
                                name="dataPagamento"
                                id="dataPagamento"
                                onChange={handleChange}
                                value={formData.dataPagamento}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="ml-2 w-full">
                            <label
                                htmlFor="horaPagamento"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Hora
                            </label>
                            <input
                                type="time"
                                name="horaPagamento"
                                id="horaPagamento"
                                onChange={handleChange}
                                value={formData.horaPagamento}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="valor"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Valor
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mr-3">
                                <span className="text-gray-500 sm:text-sm">
                                    R$
                                </span>
                            </div>
                            <input
                                type="text"
                                name="valor"
                                id="valor"
                                className="block w-full rounded-md border-0 py-1.5 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancelar
                        </button>
                    </div>
                    <GenericSearchModal
                        isOpen={isDevedorSearchOpen}
                        title="Pesquisar Devedor"
                        data={devedoresData}
                        columns={devedoresColumns}
                        onSelectItem={handleSelectDevedor}
                        onClose={() => setIsDevedorSearchOpen(false)}
                    />
                    <GenericSearchModal
                        isOpen={isServicoSearchOpen}
                        title="Pesquisar Serviço"
                        data={servicosData}
                        columns={servicosColumns}
                        onSelectItem={handleSelectServico}
                        onClose={() => setIsServicoSearchOpen(false)}
                    />
                </form>
            </div>
        </div>
    );
}
