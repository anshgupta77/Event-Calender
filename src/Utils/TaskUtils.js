import { mockData } from "../Data/MockData";

export const filterTasksByDate = (date) => {
  const dateStr = date.toISOString().split('T')[0];
  return mockData.filter(task => task.date === dateStr);
};

export const calculateTaskDuration = (startTime, endTime) => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  return (endMinutes - startMinutes) / 60; // Duration in hours
};