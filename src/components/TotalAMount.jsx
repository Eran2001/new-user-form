import React from "react";
import { Controller } from "react-hook-form";

const TotalAmount = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-44">
          <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            TOTAL AMOUNT
          </span>
        </div>
        <div className="flex max-md:flex-col justify-between items-center gap-4 max-lg:gap-0 max-md:gap-4">
          {/* LKR Amount */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium w-16 flex justify-end">
              LKR
            </label>
            <Controller
              name="totalAmount.lkr"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <input
                  type="number"
                  step="any"
                  value={value}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange(val === "" ? "" : Number(val));
                  }}
                  className={`lg:w-56 sm:w-48 max-sm:w-20 p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors?.totalAmount?.lkr
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              )}
            />
          </div>

          {/* USD Amount */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium w-16 flex justify-end">
              USD
            </label>
            <Controller
              name="totalAmount.usd"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <input
                  type="number"
                  step="any"
                  value={value}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange(val === "" ? "" : Number(val));
                  }}
                  className={`lg:w-56 sm:w-48 max-sm:w-20 p-2 border rounded focus:outline-none focus:ring-2 ${
                    errors?.totalAmount?.usd
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              )}
            />
          </div>
        </div>
      </div>
      {/* Show all relevant error messages */}
      {(errors?.totalAmount?.lkr ||
        errors?.totalAmount?.usd ||
        errors?.totalAmount) && (
        <p className="text-red-500 text-sm mt-1">
          {errors?.totalAmount?.lkr?.message ||
            errors?.totalAmount?.usd?.message ||
            errors?.totalAmount?.message}
        </p>
      )}
    </div>
  );
};

export default TotalAmount;
