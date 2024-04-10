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

    // Função para filtrar os dados com base no searchTerm
    const filteredData = data.filter((item) =>
        columns.some((column) =>
            item[column.key]
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
    );

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
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
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Digite para pesquisar..."
                    className="w-1/2 mb-4 p-2 border rounded"
                />
                <div className="overflow-auto max-h-96">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        scope="col" class="px-6 py-3"
                                    >
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr
                                    key={index}
                                    onClick={() => onSelectItem(item)}
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
                </div>
            </div>
        </div>
    );
}

export default GenericSearchModal;
