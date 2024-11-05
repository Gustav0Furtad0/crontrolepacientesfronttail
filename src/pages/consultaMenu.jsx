import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BasePage from '../components/base/basePage';
import Consultas from '../scripts/consultas';
// import GenericTable from '../components/visual/table';
// import EnviarArquivoModal from '../components/modals/enviarArquivo';

function ConsultaMenuPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [consultaData, setConsultaData] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [tipoConsulta, setTipoConsulta] = useState('');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    // const [arquivos, setArquivos] = useState([]);
    // const [isModalArquivoOpen, setIsModalArquivoOpen] = useState(false);
    const fetchConsulta = async () => {
        try {
            const data = await Consultas.getConsultaById(id);
            setConsultaData(data);
            setDescricao(data.descricao || '');
            setTipoConsulta(data.tipoConsulta || '');
        } catch (error) {
            console.error("Erro ao buscar consulta:", error);
        }
    };

    useEffect(() => {
        fetchConsulta();
    }, [id]);

    const handleSave = async () => {
        try {
            const updatedData = {
                descricao,
                tipoConsulta,
            };
            await Consultas.updateConsulta(id, updatedData);
            alert("Consulta atualizada com sucesso!");  
            fetchConsulta();
        } catch (error) {
            console.error("Erro ao atualizar consulta:", error);
            alert("Erro ao atualizar consulta.");
        }
    };

    const handleDelete = async () => {
        try {
            await Consultas.deleteConsulta(id);
            navigate('/calendario');
        } catch (error) {
            console.error("Erro ao atualizar consulta:", error);
            alert("Erro ao atualizar consulta.");
        }
    };

    if (!consultaData) {
        return (
            <BasePage>
                <div className="flex items-center justify-center h-full">
                    <p>Carregando consulta...</p>
                </div>
            </BasePage>
        );
    }

    const openConfirm = () => {
        setIsConfirmOpen(true);
    };

    const closeConfirm = () => {
        setIsConfirmOpen(false);
    };

    const confirmDelete = () => {
        handleDelete();
        closeConfirm();
    };

    return (
        <BasePage title="Detalhes da Consulta">
            <div className="w-full flex flex-col gap-8">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-center text-2xl font-bold">Painel da Consulta</h1>
                        <div>
                            <strong>Atendimento:</strong>
                            <input
                                type="text"
                                value={tipoConsulta}
                                onChange={(e) => setTipoConsulta(e.target.value)}
                                className="ml-2 border border-gray-300 rounded px-2 py-1"
                            />
                        </div>
                    </div>
                    <p className="text-xl font-bold">Paciente: {consultaData.paciente.nome}</p>
                    <p><strong>Clínico:</strong> {consultaData.clinico.nome}</p>
                    <p>
                        <strong>Data:</strong> {consultaData.dataInicio.split(' ')[0]} de {consultaData.dataInicio.split(' ')[1]} ás {consultaData.dataFim.split(' ')[1]}
                    </p>
                    <textarea
                        className="textarea textarea-bordered w-full mt-2"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Nenhuma descrição fornecida. Digite aqui para adicionar."
                    />
                    {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-4 border-teal-500 p-6 my-2">
                        <h2 className="text-xl font-bold mb-2 w-full flex-wrap">Arquivos associados</h2>
                        <GenericTable
                            data={arquivos || []}
                            columns={arquivosColumns}
                            pageMax={5}
                        />
                        <button
                            onClick={() => { setIsModalArquivoOpen(true) }}
                            className="text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Adicionar Arquivo
                        </button>
                    </div> */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handleSave}
                            className="text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Salvar Alterações
                        </button>
                        <button
                            onClick={openConfirm}
                            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Excluir consulta
                        </button>
                    </div>
                </div>
            </div>
            {/* {
                isModalArquivoOpen && <EnviarArquivoModal 
                    isOpen={isModalArquivoOpen} 
                    onClose={() => {
                        setIsModalArquivoOpen(false);
                        // Atualizar lista de arquivos
                    }} 
                    itemData={{
                        data: consultaData
                    }} 
                    handleSubmit={async (e) => {
                        e.preventDefault();
                        // Lógica para envio de arquivo
                    }}
                />
            } */}
            {/* Modal de Confirmação */}
            {isConfirmOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                        <h3 className="text-lg font-bold mb-4">Confirmar Exclusão</h3>
                        <p>Tem certeza de que deseja excluir esta consulta?</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={closeConfirm}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </BasePage>
    );
}

export default ConsultaMenuPage;