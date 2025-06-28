import React from "react";
import { Controller } from "react-hook-form";

const ROOM_TYPES = [
  "STANDERD DOUBLE WITH FAN",
  "DELUXE DOUBLE",
  "DELUXE TRIPLE",
  "SUPIRIOR DOUBLE",
  "SUPIRIOR TRIPLE",
];

const RoomSelection = ({ control, errors, label }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="border rounded p-4">
        <Controller
          name="rooms"
          control={control}
          defaultValue={[]}
          render={({ field: { value, onChange } }) => (
            <div className="space-y-2">
              {ROOM_TYPES.map((roomType) => {
                const selectedRoom = value?.find((r) => r.type === roomType);
                const quantity = selectedRoom?.quantity || 0;

                return (
                  <div
                    key={roomType}
                    className="flex items-center justify-between p-2 border-b last:border-b-0"
                  >
                    <span className="text-sm font-medium">{roomType}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const newRooms = [...(value || [])];
                          const roomIndex = newRooms.findIndex(
                            (r) => r.type === roomType
                          );

                          if (roomIndex !== -1) {
                            newRooms[roomIndex] = {
                              ...newRooms[roomIndex],
                              quantity: quantity + 1,
                            };
                          } else {
                            newRooms.push({ type: roomType, quantity: 1 });
                          }
                          onChange(newRooms);
                        }}
                        className="w-8 h-8 flex items-center justify-center border rounded bg-gray-100 hover:bg-gray-200"
                      >
                        +
                      </button>

                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newRooms = [...(value || [])];
                          const roomIndex = newRooms.findIndex(
                            (r) => r.type === roomType
                          );

                          if (quantity > 0) {
                            if (roomIndex !== -1) {
                              newRooms[roomIndex] = {
                                ...newRooms[roomIndex],
                                quantity: quantity - 1,
                              };
                              if (newRooms[roomIndex].quantity === 0) {
                                newRooms.splice(roomIndex, 1);
                              }
                            }
                            onChange(newRooms);
                          }
                        }}
                        className="w-8 h-8 flex items-center justify-center border rounded bg-gray-100 hover:bg-gray-200"
                      >
                        -
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        />
      </div>
      {errors?.rooms && (
        <p className="text-red-500 text-sm mt-1">{errors.rooms.message}</p>
      )}
    </div>
  );
};

export default RoomSelection;
