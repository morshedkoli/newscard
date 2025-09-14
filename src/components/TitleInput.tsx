'use client';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function TitleInput({ 
  value, 
  onChange, 
  placeholder = "Enter your news headline...",
  maxLength = 120 
}: TitleInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const remainingChars = maxLength - value.length;
  const isNearLimit = remainingChars <= 20;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        News Headline
      </label>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
          className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200 bengali-text ${
            isNearLimit ? 'border-orange-300 focus:border-orange-500 focus:ring-orange-500' : ''
          }`}
        />
        
        <div className="mt-1 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Enter a compelling headline for your news photo card
          </div>
          <div className={`text-xs font-medium ${
            isNearLimit ? 'text-orange-600' : 'text-gray-500'
          }`}>
            {remainingChars} characters remaining
          </div>
        </div>
      </div>

      {value.length > 0 && (
        <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded text-sm">
          <span className="font-medium text-gray-700">Preview: </span>
          <span className="text-gray-600">{value}</span>
        </div>
      )}
    </div>
  );
}