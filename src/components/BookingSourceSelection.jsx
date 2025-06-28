import React from "react";
import { Controller } from "react-hook-form";

const BookingSourceSelection = ({ control, errors }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-44">
          <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            BOOKING SOURCE
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <Controller
            name="bookingSource"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <div className="flex max-sm:flex-col max-sm:items-start items-center gap-8">
                {/* Booking.com */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="booking-com"
                    value="BOOKING.COM"
                    checked={value === "BOOKING.COM"}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="booking-com" className="text-sm font-medium">
                    Booking.com
                  </label>
                </div>

                {/* Direct */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="direct"
                    value="DIRECT"
                    checked={value === "DIRECT"}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="direct" className="text-sm font-medium">
                    Direct
                  </label>
                </div>

                {/* Travel Agent */}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="travel-agent"
                    value="TRAVEL_AGENT"
                    checked={value === "TRAVEL_AGENT"}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="travel-agent" className="text-sm font-medium">
                    Travel Agent
                  </label>
                </div>
              </div>
            )}
          />
        </div>
      </div>
      {errors?.bookingSource && (
        <p className="text-red-500 text-sm mt-1">
          {errors.bookingSource.message}
        </p>
      )}
    </div>
  );
};

export default BookingSourceSelection;
