import React, { useState } from 'react';
import BasePage from '../components/base/basePage';
import './../css/theme.css';
import './../css/calendar.css';

import ConsultaDiaModal from '../components/modals/consultaDiaModal';

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const generateCalendarDays = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(year, month);

    const weekdayOfFirstDay = firstDayOfMonth.getDay();

    const daysInLastMonth = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);

    const previousMonthDays = Array.from({ length: weekdayOfFirstDay }, (_, i) => ({
        day: daysInLastMonth - i,
        fromOtherMonth: true,
        date: new Date(year, month - 1, daysInLastMonth - i),
    })).reverse();

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        fromOtherMonth: false,
        date: new Date(year, month, i + 1),
        //if day is today or bigger than today, background is white
        background: new Date(year, month, i + 2) >= new Date() ? 'day-frame-hover bg-white' : 'day-frame-hover bg-gray-200',
    }));

    const totalDays = weekdayOfFirstDay + daysInMonth;
    const nextMonthDaysCount = 7 - totalDays % 7;
    const nextMonthDays = Array.from({ length: nextMonthDaysCount === 7 ? 0 : nextMonthDaysCount }, (_, i) => ({
        day: i + 1,
        fromOtherMonth: true,
        date: new Date(year, month + 1, i + 1),
    }));

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
};
export default function CalendarioPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const handleMonthChange = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return generateCalendarDays(year, month);
    };

    const openDayPage = (date) => () => {
        setSelectedDate(date);
        setModalOpen(true);
    }

    return (
        <BasePage title="ODT - Calendário">
            <div className='w-full flex flex-col gap-14'>
                <div className='calendar-frame'>
                    <div className='calendar-side-bar bg-teal-500'>
                        <h1>{currentDate.getFullYear()}</h1>
                        <div className='calendar-month'>
                            <button onClick={() => handleMonthChange(-1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>
                            </button>
                            <>
                                <h1>{months[currentDate.getMonth()]}</h1>
                            </>
                            <button onClick={() => handleMonthChange(+1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='calendar-map'>
                        <div className="day-frame calendar-head"><h3>Dom</h3></div>
                        <div className="day-frame calendar-head"><h3>Seg</h3></div>
                        <div className="day-frame calendar-head"><h3>Ter</h3></div>
                        <div className="day-frame calendar-head"><h3>Qua</h3></div>
                        <div className="day-frame calendar-head"><h3>Qui</h3></div>
                        <div className="day-frame calendar-head"><h3>Sex</h3></div>
                        <div className="day-frame calendar-head"><h3>Sab</h3></div>
                        {renderDays().map((item, index) => (
                            <div key={index} onClick={openDayPage(item.date)} className={`day-frame ${item.fromOtherMonth ? 'bg-gray-400' : item.background} `}>
                                {item.day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {modalOpen && <ConsultaDiaModal isOpen={modalOpen} onClose={() => setModalOpen(false)} date={selectedDate} />}
        </BasePage>
    );
}