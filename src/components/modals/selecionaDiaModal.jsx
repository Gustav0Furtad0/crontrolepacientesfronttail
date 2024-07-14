export default function SelecionaDataModal({ onClose, dias, HandleSelectedDia }) {
    const renderDays = () => {
        return dias.map((dia, index) => {
            const date = new Date(dia);
            // add 1 day to the date to get the correct day of the week
            date.setDate(date.getDate() + 1);
            const options = { weekday: 'long' };
            const dayOfWeek = date.toLocaleDateString('pt-BR', options);

            return (
                <div key={index}
                    className="card bg-base-100 w-96 shadow-xl cursor-pointer"
                    onClick={() => HandleSelectedDia(dia)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="card-body">
                        <h2 className="card-title">{dia} ({dayOfWeek})</h2>
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <div className="my-modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="border-b px-4 py-2 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">
                            Selecionar dia
                        </h3>
                        <button
                            className="text-black close-modal"
                            onClick={() => HandleSelectedDia(false)}
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
                    <div className="p-4 grid grid-cols-2 gap-4"> 
                        {renderDays()}
                    </div>
                </div>
            </div>
        </>
    );
}