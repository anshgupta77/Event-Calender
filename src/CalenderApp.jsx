import React, { useState } from 'react';


import DailyView from './Components/DailyView';
import WeeklyView from './Components/WeeklyView';
import MonthlyView from './Components/MonthlyView';

const CalendarApp = () => {
  const [activeView, setActiveView] = useState('Weekly');
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 25)); // March 25, 2025
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1)); // March 2025

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (activeView === 'Monthly') {
      setActiveView('Daily');
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-4xl font-bold text-black">Calendar</h1>
        <button className="flex items-center space-x-2 text-pink-400 font-medium hover:text-pink-500 transition-colors">
          <span className="text-xl">+</span>
          <span>New event</span>
        </button>
      </div>

      {/* View tabs */}
      <div className="flex space-x-0 px-6 pb-4">
        {['Daily', 'Weekly', 'Monthly'].map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-6 py-3 font-medium rounded-lg transition-colors mr-2 ${
              activeView === view 
                ? 'bg-gray-200 text-gray-800' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeView === 'Daily' && (
          <DailyView 
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onDateClick={handleDateClick}
          />
        )}
        {activeView === 'Weekly' && (
          <WeeklyView 
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onDateClick={handleDateClick}
          />
        )}
        {activeView === 'Monthly' && (
          <MonthlyView 
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            onDateClick={handleDateClick}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarApp;










