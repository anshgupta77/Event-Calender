// import React, { useState } from 'react';
// import { useEffect } from 'react';

// import DailyView from './Components/DailyView';
// import WeeklyView from './Components/WeeklyView';
// import MonthlyView from './Components/MonthlyView';

// const CalendarApp = () => {
//   const [activeView, setActiveView] = useState('Weekly');
//   const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 25)); // March 25, 2025
//   const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1));// March 2025
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3001/events")
//       .then((res) => res.json())
//       .then((data) => setEvents(data));
//   }, []);


//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     if (activeView === 'Monthly') {
//       setActiveView('Daily');
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto bg-white min-h-screen">
//       {/* Header */}
//       <div className="flex items-center justify-between p-6">
//         <h1 className="text-4xl font-bold text-black">Calendar</h1>
//         <button className="flex items-center space-x-2 text-pink-400 font-medium hover:text-pink-500 transition-colors">
//           <span className="text-xl">+</span>
//           <span>New event</span>
//         </button>
//       </div>

//       {/* View tabs */}
//       <div className="flex space-x-0 px-6 pb-4">
//         {['Daily', 'Weekly', 'Monthly'].map(view => (
//           <button
//             key={view}
//             onClick={() => setActiveView(view)}
//             className={`px-6 py-3 font-medium rounded-lg transition-colors mr-2 ${
//               activeView === view 
//                 ? 'bg-gray-200 text-gray-800' 
//                 : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             {view}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         {activeView === 'Daily' && (
//           <DailyView 
//             selectedDate={selectedDate}
//             onDateChange={setSelectedDate}
//             onDateClick={handleDateClick}
//             events={events}
//           />
//         )}
//         {activeView === 'Weekly' && (
//           <WeeklyView 
//             selectedDate={selectedDate}
//             onDateChange={setSelectedDate}
//             onDateClick={handleDateClick}
//             events={events}
//           />
//         )}
//         {activeView === 'Monthly' && (
//           <MonthlyView 
//             currentMonth={currentMonth}
//             onMonthChange={setCurrentMonth}
//             onDateClick={handleDateClick}
//             events={events}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default CalendarApp;













import React, { useState, useEffect } from 'react';
import DailyView from './Components/DailyView';
import WeeklyView from './Components/WeeklyView';
import MonthlyView from './Components/MonthlyView';
import NewEvent from './Components/NewEvent'; // Import the new component

const CalendarApp = () => {
  const [activeView, setActiveView] = useState('Weekly');
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 25)); // March 25, 2025
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1));// March 2025
  const [events, setEvents] = useState([]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false); // State for form visibility

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (activeView === 'Monthly') {
      setActiveView('Daily');
    }
  };

  // Function to handle when a new event is added
  const handleEventAdded = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  // Function to open the add event form
  const openAddEventForm = () => {
    setIsAddEventOpen(true);
  };

  // Function to close the add event form
  const closeAddEventForm = () => {
    setIsAddEventOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-4xl font-bold text-black">Calendar</h1>
        <button 
          onClick={openAddEventForm}
          className="flex items-center space-x-2 text-pink-400 font-medium hover:text-pink-500 transition-colors"
        >
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
            events={events}
          />
        )}
        {activeView === 'Weekly' && (
          <WeeklyView 
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onDateClick={handleDateClick}
            events={events}
          />
        )}
        {activeView === 'Monthly' && (
          <MonthlyView 
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            onDateClick={handleDateClick}
            events={events}
          />
        )}
      </div>

      {/* Add Event Form Modal */}
      <NewEvent
        isOpen={isAddEventOpen}
        onClose={closeAddEventForm}
        onEventAdded={handleEventAdded}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarApp;

