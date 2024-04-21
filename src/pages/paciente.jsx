import React, { useState, useEffect } from 'react';

import BasePage from '../components/base/basePage';
import Modal from '../components/modals/addPaciente';

import './../css/theme.css';

import Paciente from '../scripts/pacientes';

export default function PacientePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        const fetchedPacientes = await Paciente.getAllPacientes();
        setPacientes(fetchedPacientes);
    };

    const handleModalClose = (error) => {
        setIsModalOpen(false);
        fetchPacientes();

        if (!error)
            setAlert({ show: true, message: 'Erro ao adicionar paciente.', type: 'error' });
        else
            setAlert({ show: true, message: 'Paciente cadastrado com sucesso!', type: 'success' });

        setTimeout(() => {
            setAlert({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page on search change
    };

    const filteredPacientes = pacientes.filter(paciente =>
        paciente.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.cpf.includes(searchTerm).includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredPacientes.length / patientsPerPage);

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredPacientes.slice(indexOfFirstPatient, indexOfLastPatient);

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < pageCount ? prev + 1 : prev));
    };

    const handlePreviousPage = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <BasePage title={"ODT - Pacientes"}>
            <div className='w-full flex flex-col gap-14'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                        <button className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Adicionar Paciente
                        </button>
                        <label htmlFor="table-search-costumers" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input onChange={handleSearchChange} type="text" id="table-search-costumers" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Pesquisar paciente"/>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nome Completo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    CPF
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Data de Nascimento
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Convênio
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.map((paciente, index) => {
                                return (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {paciente.nomeCompleto}
                                        </th>
                                        <td className="px-6 py-4">
                                            {paciente.cpf}
                                        </td>
                                        <td className="px-6 py-4">
                                            {paciente.dataNascimento}
                                        </td>
                                        <td className="px-6 py-4">
                                            {paciente.convenio}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a  
                                                href="/pacienteMenu"
                                                className="text-gray-700 bg-gray-50 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                                                type="button"
                                            >
                                                Menu
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 p-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstPatient + 1}-{indexOfLastPatient}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pacientes.length}</span></span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
                            </li>
                            {Array.from({ length: pageCount }, (_, i) => (
                                <li key={i}>
                                    <button onClick={() => handlePageChange(i + 1)} aria-current={currentPage === i + 1 ? "page" : undefined} className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === i + 1 ? 'text-teal-500 border border-gray-300 bg-blue-50 hover:bg-teal-100 hover:text-teal-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button onClick={handleNextPage} disabled={currentPage === pageCount} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {alert.show && (
                <div className="toast toast-top toast-end">
                    <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span>{alert.message}</span>
                    </div>
                </div>
            )}
            {isModalOpen && <Modal onClose={handleModalClose} />}
        </BasePage>
    );
}
