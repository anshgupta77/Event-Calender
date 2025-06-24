const MonthlyView = ({ currentMonth, onMonthChange, onDateClick }) => {
  const monthDays = getMonthDays(currentMonth);
  
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    onMonthChange(prevMonth);
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    onMonthChange(nextMonth);
  };
  
  return (
    <div className="bg-white">
      <NavigationHeader 
        currentDate={currentMonth}
        onPrevious={goToPreviousMonth}
        onNext={goToNextMonth}
        title={currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      />

      {/* Days header */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-white p-3 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {monthDays.map((day, index) => {
          const dayTasks = filterTasksByDate(day);
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();
          const isWeekend = index % 7 === 0 || index % 7 === 6;
          
          return (
            <div 
              key={index} 
              className={`min-h-24 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                !isCurrentMonth ? 'bg-gray-50' : 
                isWeekend ? 'bg-blue-100' : 'bg-orange-100'
              }`}
              onClick={() => onDateClick(day)}
            >
              <div className={`text-sm font-medium mb-1 ${
                !isCurrentMonth ? 'text-gray-400' : 
                isToday ? 'bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : 
                'text-gray-900'
              }`}>
                {day.getDate()}
              </div>
              <div className="space-y-1">
                {dayTasks.slice(0, 2).map(task => (
                  <div key={task.id} className="flex items-center space-x-1">
                    <span className="text-sm">{task.icon}</span>
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <div className="text-xs text-gray-500">+{dayTasks.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyView;