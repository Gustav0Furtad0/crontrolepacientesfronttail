import React, { useState } from 'react';

const GenericTableComplex = ({ data, columns, pageMax = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(pageMax);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const changePage = (number) => {
        setCurrentPage(number);
    };

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} scope="col" className="px-6 py-3">
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length}>
                                Nenhum item encontrado
                            </td>
                        </tr>
                    ) : (
                        currentItems.map((item, index) => (
                            <tr
                                className="odd:bg-white even:bg-gray-50"
                                key={index}
                                onClick={() => {
                                    if (columns.onClick) {
                                        columns.onClick(item);
                                    }
                                }}
                            >
                                {columns.map((column) => (
                                    <td 
                                        key={column.key}
                                        className="px-6 py-4 text-gray-900 whitespace-nowrap"
                                    >
                                        {column.render ? column.render(item[column.key], item) : item[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500">
                    Mostrando {firstItemIndex + 1}-{lastItemIndex > data.length ? data.length : lastItemIndex} of {data.length}
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                        <button
                            onClick={() => {
                                if (currentPage > 1) {
                                    changePage(currentPage - 1);
                                }
                            }}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                            Anterior
                        </button>
                    </li>
                    {Array.from({ length: pageCount }, (_, i) => (
                        <li key={i}>
                            <button
                                onClick={() => changePage(i + 1)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
                                    currentPage === i + 1 ? 'text-teal-700 bg-teal-100 border-gray-300' : 'text-teal-800 hover:bg-teal-100 hover:text-teal-700'
                                }`}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button 
                            onClick={() => {
                                if (currentPage < pageCount) {
                                    changePage(currentPage + 1);
                                }
                            }}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                        >
                            Próximo
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default GenericTableComplex;