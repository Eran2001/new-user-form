import React from "react";
import { Controller } from "react-hook-form";

const CardTypeSelection = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-44">
          <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            CARD TYPE
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-4">
            <Controller
              name="cardType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-32 p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors?.cardType
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                >
                  <option value="">Select</option>
                  <option value="VISA">VISA</option>
                  <option value="MASTER">MASTER</option>
                  <option value="AMEX">AMEX</option>
                </select>
              )}
            />
          </div>
        </div>
      </div>
      {errors?.cardType && (
        <p className="text-red-500 text-sm mt-1">{errors.cardType.message}</p>
      )}
    </div>
  );
};

export default CardTypeSelection;
