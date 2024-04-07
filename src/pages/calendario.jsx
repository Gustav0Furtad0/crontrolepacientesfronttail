import BasePage from '../components/base/basePage';
import './../css/theme.css';
import './../css/calendar.css';

const days = [
    {
        position: 1,
        day: 1
    },
    {
        position: 2,
        day: 2
    },
    {
        position: 3,
        day: 3
    },
    {
        position: 4,
        day: 4
    },
    {
        position: 5,
        day: 5
    },
    {
        position: 6,
        day: 6
    },
    {
        position: 7,
        day: 7
    },
    {
        position: 8,
        day: 8
    },
    {
        position: 9,
        day: 9
    },
    {
        position: 10,
        day: 10
    },
    {
        position: 11,
        day: 11
    },
    {
        position: 12,
        day: 12
    },
    {
        position: 13,
        day: 13
    },
    {
        position: 14,
        day: 14
    },
    {
        position: 15,
        day: 15
    },
    {
        position: 16,
        day: 16
    },
    {
        position: 17,
        day: 17
    },
    {
        position: 18,
        day: 18
    },
    {
        position: 19,
        day: 19
    },
    {
        position: 20,
        day: 20
    },
    {
        position: 21,
        day: 21
    },
    {
        position: 22,
        day: 22
    },
    {
        position: 23,
        day: 23
    },
    {
        position: 24,
        day: 24
    },
    {
        position: 25,
        day: 25
    },
    {
        position: 26,
        day: 26
    },
    {
        position: 27,
        day: 27
    },
    {
        position: 28,
        day: 28
    },
    {
        position: 29,
        day: 29
    },
    {
        position: 30,
        day: 30
    },
    {
        position: 31,
        day: 31
    },
    {
        position: 32,
        day: ''
    },
    {
        position: 33,
        day: ''
    },
    {
        position: 33,
        day: ''
    },
    {
        position: 34,
        day: ''
    },
];

export default function CalendarioPage() {
    return (
        <BasePage title="ODT - Calendário">
            <div className='w-full flex flex-col gap-14'>
                <div className='calendar-frame'>
                    <div className='calendar-side-bar bg-teal-500'>
                        <p>2024</p>
                        <div className='calendar-month'>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>
                            </button>
                            <h1>AGOSTO</h1>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='calendar-map'>
                        <div className="day-frame calendar-head">
                            <h3>Dom</h3>
                        </div>
                        <div className="day-frame calendar-head">
                            <h3>Seg</h3>
                        </div>
                        <div className="day-frame calendar-head">
                            <h3>Ter</h3>
                        </div>
                        <div className="day-frame calendar-head">
                            <h3>Qua</h3>
                        </div>
                        <div className="day-frame calendar-head">
                            <h3>Qui</h3>
                        </div>
                        <div className="day-frame calendar-head">
                            <h3>Sex</h3>
                        </div>
                        <div className="day-frame calendar-head">
                            <h3>Sab</h3>
                        </div>
                        {days.map((item) => (
                            <div key={item.position} className="day-frame">
                                {item.day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BasePage>
    );
}