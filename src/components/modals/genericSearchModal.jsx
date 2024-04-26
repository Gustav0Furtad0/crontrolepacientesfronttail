import React, { useState } from "react";

function GenericSearchModal({
    isOpen,
    title,
    data,
    columns,
    onSelectItem,
    onClose,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const filteredData = data ? data.filter((item) =>
        columns.some((column) =>
            item[column.key] && item[column.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    ) : [];

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const changePage = (number) => {
        setCurrentPage(Math.max(1, Math.min(number, pageCount))); // Garante que a página esteja dentro do intervalo válido
    };

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(firstItemIndex, firstItemIndex + itemsPerPage);


    const maxPageButtons = 5;
    let startPage, endPage;
    if (pageCount <= maxPageButtons) {
        startPage = 1;
        endPage = pageCount;
    } else {
        startPage = Math.max(1, currentPage - 2);
        endPage = startPage + maxPageButtons - 1;
        if (endPage > pageCount) {
            endPage = pageCount;
            startPage = endPage - maxPageButtons + 1;
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center mb-3">
            <div className="absolute top-32 bg-white rounded shadow-lg w-3/4 p-4">
                <div className="border-b px-4 pb-2 mb-2 flex justify-between items-center">
                    <h2 className="font-semibold text-xl">{title}</h2>
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
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Digite para pesquisar..."
                        className="w-1/2 mb-4 p-2 border rounded"
                    />
                </div>
                <div className="overflow-auto max-h-96">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.key} scope="col" className="px-6 py-3">
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-4 text-center">
                                        Nenhum item encontrado
                                    </td>
                                </tr>
                            )}
                            {currentItems.map((item, index) => (
                                <tr key={index + 1231313123} onClick={() => {
                                        onSelectItem(item)
                                        onClose()
                                    }}
                                    className="cursor-pointer hover:bg-gray-100 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-6 py-4">
                                            {item[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 p-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Exibindo <span className="font-semibold text-gray-900 dark:text-white">
                                {firstItemIndex + 1} - {firstItemIndex + currentItems.length}
                            </span> de <span className="font-semibold text-gray-900 dark:text-white">
                            {filteredData.length}
                            </span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button onClick={() => changePage(currentPage - 1)} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                        </li>
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                            <li key={startPage + i}>
                                <button
                                    type="button"
                                    onClick={() => changePage(startPage + i)} 
                                    className={`${currentPage === startPage + i ? 'flex items-center justify-center px-3 h-8 text-teal-500 border border-gray-300 bg-blue-50 hover:bg-teal-100 hover:text-teal-700' : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}>
                                    {startPage + i}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button onClick={() => changePage(currentPage + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default GenericSearchModal;

