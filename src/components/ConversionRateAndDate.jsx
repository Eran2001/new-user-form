import React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ConversionRateAndDate = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-56">
          <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            CONVERSION RATE AND DATE
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          {/* USD to LKR Rate */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">
              <Controller
                name="conversion.rate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number" // Add this to ensure number input
                    step="any" // Add this to allow decimal numbers
                    placeholder="USD to LKR"
                    className={`w-64 p-2 border rounded focus:outline-none focus:ring-2 ${
                      errors?.conversion?.rate
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                )}
              />
            </label>
          </div>

          {/* Date Picker */}
          <div className="flex relative -left-3 items-center gap-4">
            <label className="text-sm font-medium">
              <Controller
                name="conversion.date"
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value}
                    onChange={(date) => onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    className={`p-2 border rounded focus:outline-none focus:ring-2 ${
                      errors?.conversion?.date
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                )}
              />
            </label>
          </div>
        </div>
      </div>
      {/* Separate error messages for better visibility */}
      {errors?.conversion?.rate && (
        <p className="text-red-500 text-sm mt-1">
          {errors.conversion.rate.message}
        </p>
      )}
      {errors?.conversion?.date && (
        <p className="text-red-500 text-sm mt-1">
          {errors.conversion.date.message}
        </p>
      )}
    </div>
  );
};

export default ConversionRateAndDate;
