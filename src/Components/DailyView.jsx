const DailyView = ({ selectedDate, onDateChange, onDateClick }) => {
  const tasks = filterTasksByDate(selectedDate);
  const weekDays = getWeekDays(selectedDate);
  
  const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(selectedDate.getDate() - 1);
    onDateChange(prevDay);
  };
  
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    onDateChange(nextDay);
  };
  
  return (
    <div className="bg-white">
      <NavigationHeader 
        currentDate={selectedDate}
        onPrevious={goToPreviousDay}
        onNext={goToNextDay}
        title={selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      />
      
      {/* Week header */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div 
            key={day} 
            className="bg-white p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onDateClick(weekDays[index])}
          >
            <div className="text-sm text-gray-500 mb-1">{day}</div>
            <div className={`text-lg font-medium ${
              weekDays[index].toDateString() === selectedDate.toDateString() 
                ? 'bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' 
                : 'text-gray-900'
            }`}>
              {weekDays[index].getDate()}
            </div>
            {weekDays[index].toDateString() === selectedDate.toDateString() && (
              <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>
            )}
          </div>
        ))}
      </div>

      {/* Events for selected day */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No events for this day
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default DailyView;