
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationHeader = ({ currentDate, onPrevious, onNext, title }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    <div className="flex items-center space-x-2">
      <button 
        onClick={onPrevious}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={onNext}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  </div>
);

export default NavigationHeader;
