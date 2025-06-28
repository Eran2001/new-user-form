import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

const CalendarInput = ({
  label,
  control,
  name,
  errors,
  placeholder,
  ...rest
}) => {
  const hasError = !!errors[name];

  // Function to format date to UTC string (YYYY-MM-DD format)
  const formatToUTC = (date) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="w-full">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              selected={value ? new Date(value) : null}
              onChange={(date) => onChange(formatToUTC(date))}
              placeholderText={placeholder}
              dateFormat="yyyy-MM-dd"
              showTimeSelect={false} // Removed time selection
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
                hasError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              wrapperClassName="w-full"
              {...rest}
            />
          )}
        />
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default CalendarInput;
