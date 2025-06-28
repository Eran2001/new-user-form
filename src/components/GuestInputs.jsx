import React from "react";

const GuestInputs = ({ register, errors }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">NO GUESTS</label>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">ADULT</label>
          <input
            type="number"
            {...register("adults")}
            min="0"
            placeholder="0"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.adults
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.adults && (
            <p className="text-red-500 text-sm mt-1">{errors.adults.message}</p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">KIDS</label>
          <input
            type="number"
            {...register("kids")}
            min="0"
            placeholder="0"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.kids
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.kids && (
            <p className="text-red-500 text-sm mt-1">{errors.kids.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestInputs;
