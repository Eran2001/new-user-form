import React from "react";
import { Controller } from "react-hook-form";

const NightSelection = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-32">
          <span className="block text-sm text-center font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            NO NIGHTS
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Controller
              name="nights"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="number"
                  min="1"
                  {...field}
                  className={`w-20 p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors?.nights
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              )}
            />
          </div>
        </div>
      </div>
      {errors?.nights && (
        <p className="text-red-500 text-sm mt-1">{errors.nights.message}</p>
      )}
    </div>
  );
};

export default NightSelection;
