import React from "react";
import { Controller } from "react-hook-form";

const ConditionsAgreement = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap flex-col items-start gap-4">
        <div className="w-44">
          <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            CONDITIONS
          </span>
        </div>
        <div className="flex-1">
          <div className="space-y-3">
            {/* Room Changes Condition */}
            <div className="flex items-start gap-2">
              <Controller
                name="conditions.roomChanges"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}
              />
              <label className="text-sm">
                ROOM CHANGES CAN BE AGREED ONLY FOR ROOMS MORE EXPENSIVE THAN
                THE ROOM BOOKED
              </label>
            </div>

            {/* Dates Reduction Condition */}
            <div className="flex items-start gap-2">
              <Controller
                name="conditions.datesReduction"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}
              />
              <label className="text-sm">AGREED DATES CANNOT BE REDUCED</label>
            </div>

            {/* Check-in Payment Condition */}
            <div className="flex items-start gap-2">
              <Controller
                name="conditions.checkInPayment"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}
              />
              <label className="text-sm">
                FIRST DAY OF CHECK-IN AT THE HOTEL YOU ARE REQUIRED THE PAY FOR
                ALL THE DAYS OF YOUR STAY
              </label>
            </div>

            {/* Food Payment Condition */}
            <div className="flex items-start gap-2">
              <Controller
                name="conditions.foodPayment"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}
              />
              <label className="text-sm">
                ALL OTHER FOODS AND EVERYTHING YOU TAKE MUST BE PAID FOR ON THE
                LAST DAY OF YOUR CHECK-OUT TIME
              </label>
            </div>
          </div>

          {/* Error Messages */}
          {(errors?.conditions?.roomChanges ||
            errors?.conditions?.datesReduction ||
            errors?.conditions?.checkInPayment ||
            errors?.conditions?.foodPayment) && (
            <div className="mt-2 text-red-500 text-sm">
              {errors?.conditions?.roomChanges?.message ||
                errors?.conditions?.datesReduction?.message ||
                errors?.conditions?.checkInPayment?.message ||
                errors?.conditions?.foodPayment?.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConditionsAgreement;
