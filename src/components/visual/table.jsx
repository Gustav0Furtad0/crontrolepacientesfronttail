import React, { useState } from 'react';

const GenericTable = ({ data, columns, pageMax = 10 }, ...props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(pageMax);
    const [isOpen, setIsOpen] = useState(false);

    const filteredData = data.filter((item) =>
        columns.some((column) =>
            item[column.key]
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
    );

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = filteredData.slice(firstItemIndex, lastItemIndex);

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const changePage = (number) => {
        setCurrentPage(number);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
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
                    {currentItems.map((item, index) => (
                        <tr
                            key={index}
                            onClick={() => {
                                if (columns.onClick) {
                                    columns.onClick(item);
                                }
                            }}
                            className="cursor-pointer hover:bg-gray-100 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="px-6 py-4">
                                    {item[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center justify-between p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing {firstItemIndex + 1}-{lastItemIndex > filteredData.length ? filteredData.length : lastItemIndex} of {filteredData.length}</span>
                <ul className="inline-flex items-center -space-x-px">
                    {Array.from({ length: pageCount }, (_, i) => (
                        <li key={i}>
                            <button
                                onClick={() => changePage(i + 1)}
                                className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? 'text-blue-600 bg-blue-200' : 'text-gray-500 bg-white'} border border-gray-300 rounded hover:bg-gray-100`}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default GenericTable;