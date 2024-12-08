import React, { useState } from "react";

interface DropdownProps {
  value: "posts" | "comments" | "";
  onChange: (value: "posts" | "comments" | "") => void;
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: "posts" | "comments" | "") => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-gray-100 focus:ring-2 text-left flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value ? value.charAt(0).toUpperCase() + value.slice(1) : "Select content type"}</span>
        <svg
          className="w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full border border-gray-300 rounded-lg bg-gray-100 shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className="block w-full px-2 py-2 text-left text-gray-700 hover:bg-violet-500 hover:text-white hover:border-violet-200 hover:rounded-lg focus:outline-none"
              onClick={() => handleOptionClick(option as "posts" | "comments")}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
