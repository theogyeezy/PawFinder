import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: LucideIcon;
  pattern?: string;
  placeholder?: string;
}

export function FormInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required = false,
  icon: Icon,
  pattern,
  placeholder
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          pattern={pattern}
          placeholder={placeholder}
          className={`${Icon ? 'pl-10' : 'pl-3'} block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}