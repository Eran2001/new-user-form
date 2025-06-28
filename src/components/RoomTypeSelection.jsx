import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import Notification from "./Notification";

const RoomTypeSelection = ({ control, errors }) => {
  // Effect to handle Room Type errors
  useEffect(() => {
    if (errors?.rooms?.types?.message) {
      // Notification.error(errors.rooms.types.message);
    }
  }, [errors?.rooms?.types]);

  useEffect(() => {
    const roomCountErrors = [
      errors?.rooms?.standardDoubleWithFanCount,
      errors?.rooms?.deluxeDoubleCount,
      errors?.rooms?.deluxeTripleCount,
      errors?.rooms?.superiorDoubleCount,
      errors?.rooms?.superiorTripleCount,
    ];

    if (roomCountErrors.some((error) => error)) {
      // Notification.error("Please Enter Number of Rooms");
    }
  }, [
    errors?.rooms?.standardDoubleWithFanCount,
    errors?.rooms?.deluxeDoubleCount,
    errors?.rooms?.deluxeTripleCount,
    errors?.rooms?.superiorDoubleCount,
    errors?.rooms?.superiorTripleCount,
  ]);

  useEffect(() => {
    if (errors?.rooms?.mealPlan?.message) {
      // Notification.error(errors.rooms.mealPlan.message);
    }
  }, [errors?.rooms?.mealPlan]);
  return (
    <div className="mb-4">
      <div className="flex gap-4">
        {/* Room Types and No Rooms Combined Section */}
        <div className="flex-1">
          <div className="flex gap-4 max-sm:gap-1">
            {/* Room Types Column */}
            <div className="flex-1">
              <div className="bg-gray-100 p-2 border border-gray-200">
                <span className="text-sm font-semibold">ROOM TYPE</span>
              </div>
              <div className="border-x border-b border-gray-200 h-[270px] max-md:h-[250px] sm:h-[300px] max-sm:h-[340px]">
                {/* Standard Double with Fan */}
                <div className="flex items-center justify-between p-4 min-h-[42px]">
                  <span className="text-sm max-md:text-xs">
                    STANDARD DOUBLE WITH FAN
                  </span>
                  <Controller
                    name="rooms.types.standardDoubleWithFan"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                {/* Deluxe Double */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200 min-h-[42px]">
                  <span className="text-sm max-md:text-xs">DELUXE DOUBLE</span>
                  <Controller
                    name="rooms.types.deluxeDouble"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                {/* Deluxe Triple */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200 min-h-[42px]">
                  <span className="text-sm max-md:text-xs">DELUXE TRIPLE</span>
                  <Controller
                    name="rooms.types.deluxeTriple"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                {/* Superior Double */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200 min-h-[42px]">
                  <span className="text-sm max-md:text-xs">
                    SUPERIOR DOUBLE
                  </span>
                  <Controller
                    name="rooms.types.superiorDouble"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                {/* Superior Triple */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200 min-h-[42px]">
                  <span className="text-sm max-md:text-xs">
                    SUPERIOR TRIPLE
                  </span>
                  <Controller
                    name="rooms.types.superiorTriple"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* No Rooms Column */}
            <div className="w-32 max-sm:w-16">
              <div className="bg-gray-100 p-2 border border-gray-200">
                <span className="text-sm font-semibold">NO ROOMS</span>
              </div>
              <div className="border-x border-b border-gray-200 space-y-[8.5px] max-md:space-y-[4px]">
                {/* Inputs for each room type with consistent height */}
                <div className="p-2 min-h-[42px]  flex items-center">
                  <Controller
                    name="rooms.standardDoubleWithFanCount"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        value={field.value || ""}
                        min="0"
                        className="w-full p-1 text-sm border border-gray-300 rounded"
                      />
                    )}
                  />
                </div>
                <div className="p-2 border-t border-gray-200 min-h-[42px] flex items-center">
                  <Controller
                    name="rooms.deluxeDoubleCount"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        min="0"
                        className="w-full p-1 text-sm border border-gray-300 rounded"
                      />
                    )}
                  />
                </div>
                <div className="p-2 border-t border-gray-200 min-h-[42px] flex items-center">
                  <Controller
                    name="rooms.deluxeTripleCount"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        min="0"
                        className="w-full p-1 text-sm border border-gray-300 rounded"
                      />
                    )}
                  />
                </div>
                <div className="p-2 border-t border-gray-200 min-h-[42px] flex items-center">
                  <Controller
                    name="rooms.superiorDoubleCount"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        min="0"
                        className="w-full p-1 text-sm border border-gray-300 rounded"
                      />
                    )}
                  />
                </div>
                <div className="p-2 border-t border-gray-200 min-h-[42px] flex items-center">
                  <Controller
                    name="rooms.superiorTripleCount"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        min="0"
                        className="w-full p-1 text-sm border border-gray-300 rounded"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Plan Section */}
        <div className="w-32 max-sm:w-10">
          <div className="bg-gray-100 p-2 border border-gray-200">
            <span className="text-sm font-semibold max-sm:text-xs">TYPE</span>
          </div>
          <div className="border-x border-b border-gray-200">
            <div className="p-2 min-h-[42px] flex items-center justify-between">
              <span className="text-sm max-sm:text-xs">RO</span>
              <Controller
                name="rooms.mealPlan.RO"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}
              />
            </div>
            <div className="p-2 border-t border-gray-200 min-h-[42px] flex items-center justify-between">
              <span className="text-sm max-sm:text-xs">BB</span>
              <Controller
                name="rooms.mealPlan.BB"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}
              />
            </div>
            <div className="p-2 border-t border-gray-200 min-h-[42px] flex items-center justify-between">
              <span className="text-sm max-sm:text-xs">HB</span>
              <Controller
                name="rooms.mealPlan.HB"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}
              />
            </div>
            <div className="p-2 border-t border-gray-200 min-h-[42px] flex items-center justify-between">
              <span className="text-sm max-sm:text-xs">FB</span>
              <Controller
                name="rooms.mealPlan.FB"
                control={control}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      <div className="mt-2 space-y-1">
        {errors?.rooms?.types && (
          <p className="text-red-500 text-sm">{errors.rooms.types.message}</p>
        )}
        {errors?.rooms?.numberOfRooms && (
          <p className="text-red-500 text-sm">
            {errors.rooms.numberOfRooms.message}
          </p>
        )}
        {errors?.rooms?.mealPlan && (
          <p className="text-red-500 text-sm">
            {errors.rooms.mealPlan.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RoomTypeSelection;
