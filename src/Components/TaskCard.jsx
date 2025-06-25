import { mockData } from "../Data/MockData";
const TaskCard = ({ task, isWeeklyView = false }) => {
  const duration = calculateTaskDuration(task.timeStart, task.timeEnd);
  const cardHeight = isWeeklyView ? Math.max(duration * 48, 48) : 'auto'; // 48px per hour in weekly view
  
  return (
    <div 
      className="bg-orange-100 rounded-lg p-3 border-l-4 border-orange-300 mb-2"
      style={{ height: isWeeklyView ? `${cardHeight}px` : 'auto' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">
            {formatTime(task.timeStart)} - {formatTime(task.timeEnd)}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 text-sm">⋮</button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm">{task.icon}</span>
        <span className="font-medium text-gray-900 text-sm truncate">
          {task.taskName} - {task.user}
        </span>
      </div>
      <div className="flex items-center space-x-1 mt-1">
        <span className="text-yellow-500 text-xs">⭐</span>
        <span className="text-xs text-gray-500">Brine</span>
      </div>
    </div>
  );
};

export default TaskCard;