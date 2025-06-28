import React from "react";
import { Controller } from "react-hook-form";

const PaymentSelection = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-44">
          <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            TYPE OF PAYMENT
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          {/* Payment Method */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">
              <Controller
                name="payment.method"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-32 p-2 border rounded focus:outline-none focus:ring-2 ${
                      errors?.payment?.method
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="CASH">CASH</option>
                    <option value="CARD">CARD</option>
                  </select>
                )}
              />
            </label>
          </div>

          {/* Currency */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">
              <Controller
                name="payment.currency"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-32 p-2 border rounded focus:outline-none focus:ring-2 ${
                      errors?.payment?.currency
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="LKR">LKR</option>
                    <option value="USD">USD</option>
                  </select>
                )}
              />
            </label>
          </div>
        </div>
      </div>
      {(errors?.payment?.method || errors?.payment?.currency) && (
        <p className="text-red-500 text-sm mt-1">
          {errors?.payment?.method?.message ||
            errors?.payment?.currency?.message}
        </p>
      )}
    </div>
  );
};

export default PaymentSelection;
