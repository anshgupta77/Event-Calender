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
      <div className="flex items-center justify-between p-6 border-b">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
      </div>

      {/* View tabs */}
      <div className="flex space-x-8 px-6 py-4 border-b">
        {['Daily', 'Weekly', 'Monthly'].map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`font-medium pb-2 transition-colors ${
              activeView === view 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
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