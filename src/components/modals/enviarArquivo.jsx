import React, { useState, useEffect } from 'react';

export default function EnviarArquivoModal({ isOpen, onClose, itemData, handleSubmit }) {
    if (!isOpen) return null;

    return (
        <dialog className="my-modal">
            <div className="modal-box w-11/12 max-w-5xl"
                style={{ transform: "none"}}
            >
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                        {itemData.title || "Envio de arquivo"}
                    </h3>
                    <button
                        className="text-black close-modal"
                        onClick={() => onClose(false)}
                    >
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
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <div className="join w-full">
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="tooltip" data-tip="Marcar atendimento">
                            <button
                                id="btnSalvar"
                                type="submit"
                                className="btn btn-outline btn-success"
                            >
                                Enviar
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="btn btn-outline btn-error"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}