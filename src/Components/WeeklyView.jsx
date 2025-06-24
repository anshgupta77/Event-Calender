const WeeklyView = ({ selectedDate, onDateChange, onDateClick }) => {
  const weekDays = getWeekDays(selectedDate);
  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6AM to 9PM
  
  const goToPreviousWeek = () => {
    const prevWeek = new Date(selectedDate);
    prevWeek.setDate(selectedDate.getDate() - 7);
    onDateChange(prevWeek);
  };
  
  const goToNextWeek = () => {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(selectedDate.getDate() + 7);
    onDateChange(nextWeek);
  };
  
  return (
    <div className="bg-white">
      <NavigationHeader 
        currentDate={selectedDate}
        onPrevious={goToPreviousWeek}
        onNext={goToNextWeek}
        title={`Week of ${weekDays[0].toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })} - ${weekDays[6].toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })}`}
      />
      
      {/* Week header */}
      <div className="grid grid-cols-8 gap-px bg-gray-200 mb-1">
        <div className="bg-white p-3"></div>
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
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-8 gap-px bg-gray-200 max-h-96 overflow-y-auto">
        {/* Time column */}
        <div className="bg-white">
          {hours.map(hour => (
            <div key={hour} className="h-12 border-b border-gray-100 flex items-start justify-end pr-2 pt-1">
              <span className="text-xs text-gray-500">
                {hour === 0 ? '12AM' : hour < 12 ? `${hour}AM` : hour === 12 ? '12PM' : `${hour-12}PM`}
              </span>
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDays.map((day, dayIndex) => {
          const dayTasks = filterTasksByDate(day);
          return (
            <div key={dayIndex} className="bg-white">
              {hours.map(hour => {
                const hourTasks = dayTasks.filter(task => {
                  const startHour = parseInt(task.timeStart.split(':')[0]);
                  return startHour === hour;
                });
                
                return (
                  <div 
                    key={hour} 
                    className="h-12 border-b border-gray-100 relative cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => onDateClick(day)}
                  >
                    {hourTasks.map(task => {
                      const duration = calculateTaskDuration(task.timeStart, task.timeEnd);
                      const taskHeight = Math.max(duration * 48, 24); // 48px per hour, minimum 24px
                      
                      return (
                        <div 
                          key={task.id} 
                          className="absolute inset-x-1 top-1"
                          style={{ height: `${taskHeight}px` }}
                        >
                          <div className="text-xs p-1 rounded text-black bg-orange-200 h-full overflow-hidden">
                            <div className="flex items-center space-x-1">
                              <span>{task.icon}</span>
                              <span className="truncate font-medium">
                                {task.taskName.split(' ')[0]} - {task.user}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600">
                              {formatTime(task.timeStart)} - {formatTime(task.timeEnd)}
                            </div>
                            <div className="text-xs text-gray-600">Brine</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyView;