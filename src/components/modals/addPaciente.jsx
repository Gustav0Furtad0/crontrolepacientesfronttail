import React, { useState } from 'react';
import ToggleArea from '../visual/toggleArea';
import Paciente from '../../scripts/pacientes';

export default function AddPatientModal({ onClose }) {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        sexo: '',
        cpf: '',
        telefone: '',
        email: '',
        dataNascimento: '',
        endereco: '',
        alergias: '',
        doencas: '',
        convenio: '',
        nomeCompletoResponsavel: '',
        cpfResponsavel: '',
        telefoneResponsavel: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await Paciente.addPaciente(formData);
            if (result.code === 200) {
                onClose(true);
            } else {
                onclose(false);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div className="absolute top-32 bg-white rounded shadow-lg w-1/2">
                    <div className="border-b px-4 py-2 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Adicionar Paciente</h3>
                        <button className="text-black close-modal" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="mb-4">
                            <label htmlFor="nomeCompleto" className="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
                            <input type="text" name="nomeCompleto" id="nomeCompleto" onChange={handleChange} value={formData.nomeCompleto} required className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sexo" className="block text-gray-700 text-sm font-bold mb-2">Sexo</label>
                            <select name="sexo" id="sexo" onChange={handleChange} value={formData.sexo} required className="select select-bordered w-full max-w-xs">
                                <option value="">Clique para selecionar o sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Não informado</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">CPF</label>
                            <input type="text" name="cpf" id="cpf" onChange={handleChange} value={formData.cpf} className="input input-bordered w-full max-w-xs"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">Data de Nascimento</label>
                            <input type="date" name="dataNascimento" id="dataNascimento" onChange={handleChange} value={formData.dataNascimento} className="input input-bordered w-full max-w-xs"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="convenio" className="block text-gray-700 text-sm font-bold mb-2">Convênio</label>
                            <input type="tel" name="convenio" id="convenio" onChange={handleChange} value={formData.convenio} className="input input-bordered w-full max-w-xs"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telefone" className="block text-gray-700 text-sm font-bold mb-2">Telefone</label>
                            <input type="text" name="telefone" id="telefone" onChange={handleChange} value={formData.telefone} className="input input-bordered w-full max-w-xs"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endereco" className="block text-gray-700 text-sm font-bold mb-2">Endereço</label>
                            <input type="text" name="endereco" id="endereco" onChange={handleChange} value={formData.endereco} className="input input-bordered w-full max-w-xs"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} className="input input-bordered w-full max-w-xs"/>
                        </div>
                        <div className="mb-4">
                            <ToggleArea label="Alergias ou Problemas de Saúde">
                                <div className="mb-4">
                                    <label htmlFor="alergias" className="block text-gray-700 text-sm font-bold mb-2">Alergias</label>
                                    <input type="text" name="alergias" id="alergias" onChange={handleChange} value={formData.alergias} className="input input-bordered w-full max-w-xs"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="doencas" className="block text-gray-700 text-sm font-bold mb-2">Doenças</label>
                                    <input type="text" name="doencas" id="doencas" onChange={handleChange} value={formData.doencas} className="input input-bordered w-full max-w-xs"/>
                                </div>
                            </ToggleArea>
                        </div>
                        <div className="mb-4">
                            <ToggleArea label="Adicionar responsável">
                                <div className="mb-4">
                                    <label htmlFor="nomeCompletoResponsavel" className="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
                                    <input type="text" name="nomeCompletoResponsavel" id="nomeCompletoResponsavel" onChange={handleChange} value={formData.nomeCompletoResponsavel} className="input input-bordered w-full max-w-xs"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="cpfResponsavel" className="block text-gray-700 text-sm font-bold mb-2">CPF</label>
                                    <input type="text" name="cpfResponsavel" id="cpfResponsavel" onChange={handleChange} value={formData.cpfResponsavel} className="input input-bordered w-full max-w-xs"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="telefoneResponsavel" className="block text-gray-700 text-sm font-bold mb-2">Telefone</label>
                                    <input type="text" name="telefoneResponsavel" id="telefoneResponsavel" onChange={handleChange} value={formData.telefoneResponsavel} className="input input-bordered w-full max-w-xs"/>
                                </div>
                            </ToggleArea>
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
                </div>
            </div>
        </>
    );
}