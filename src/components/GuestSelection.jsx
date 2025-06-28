import React from "react";
import { Controller } from "react-hook-form";

const GuestSelection = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
          NO GUESTS
        </span>
        <div className="flex flex-wrap items-center gap-4">
          {/* Adults Section */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium w-16">ADULT</label>
            <Controller
              name="guests.adults"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="number"
                  min="0"
                  {...field}
                  className={`w-20 p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors?.guests?.adults
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              )}
            />
          </div>

          {/* Kids Section */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium w-16">KIDS</label>
            <Controller
              name="guests.kids"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="number"
                  min="0"
                  {...field}
                  className={`w-20 p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors?.guests?.kids
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              )}
            />
          </div>
        </div>
      </div>
      {(errors?.guests?.adults || errors?.guests?.kids) && (
        <p className="text-red-500 text-sm mt-1">
          {errors?.guests?.adults?.message || errors?.guests?.kids?.message}
        </p>
      )}
    </div>
  );
};

export default GuestSelection;
