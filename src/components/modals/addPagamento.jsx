import React, { useState } from "react";

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
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
        { id: 1, name: "John Doe", debtAmount: "R$ 500,00", cpf: "123.456.789-00"},
        { id: 2, name: "Jane Doe", debtAmount: "R$ 150,00", cpf: "987.654.321-00"},
    ];

    const servicosData = [
        {
            id: 1,
            tipo: "Consulta",
            nomeAbreviado: "Mensalidade",
            parcela: "1/1",
        },
        { 
            id: 2, 
            tipo: "Exame", 
            nomeAbreviado: "Limpeza", 
            parcela: "1/2" 
        },
    ];

    const devedoresColumns = [
        { key: "cpf", title: "CPF" },
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
        //setIsDevedorSearchOpen(false);
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
        <dialog className="my-modal">
            <div className="modal-box w-11/12 max-w-5xl"
                style={{ transform: "none"}}
            >
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
                    <div className="flex gap-2 mb-4">
                        <div className="flex flex-grow">
                            <div className="join w-full">
                                <input
                                    type="text"
                                    name="devedor"
                                    id="devedor"
                                    onChange={handleChange}
                                    value={formData.devedor}
                                    placeholder="Selecione o devedor"
                                    require
                                    className="input input-bordered join-item"
                                    readOnly
                                />
                                <button 
                                    type="button"
                                    onClick={openDevedorSearch} 
                                    className="btn btn-outline btn-success join-item"
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-grow">
                            <div className="join w-full">
                                <input
                                    type="text"
                                    name="servico"
                                    id="servico"
                                    onChange={handleChange}
                                    value={formData.servico}
                                    placeholder="Selecione o serviço"
                                    required
                                    className="input input-bordered join-item"
                                    readOnly
                                />
                                <button 
                                    type="button"
                                    onClick={openServicoSearch} 
                                    className="btn btn-outline btn-success join-item"
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <div className="w-full">
                            <label htmlFor="nomeCompleto" className="block text-gray-700 text-sm font-bold mb-2">Data</label>
                            <input type="date"
                                name="dataPagamento"
                                id="dataPagamento"
                                onChange={handleChange}
                                value={formData.dataPagamento}
                                required 
                                className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="w-full">
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
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="valor"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Valor
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <label className="input input-bordered flex items-center gap-2">
                                R$
                                <input 
                                    type="text"
                                    name="valor"
                                    id="valor"
                                    onChange={handleChange}
                                    value={formData.valor}
                                    required className="grow" 
                                    placeholder="0.00" />
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="btn btn-outline btn-success">
                            Salvar
                        </button>
                        <button type="button" onClick={onClose} className="btn btn-outline btn-error">
                            Cancelar
                        </button>
                    </div>
                </form>
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
            </div>
        </dialog>
    );
}
