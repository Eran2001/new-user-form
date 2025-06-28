import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import SignatureCanvas from "react-signature-canvas";
import "react-datepicker/dist/react-datepicker.css";

const GuestCertification = ({ control, errors }) => {
  const signatureRef = useRef();

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  return (
    <div className="space-y-4 mb-4">
      {/* Date Selection */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-44">
          <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            DATE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Controller
            name="certificationDate"
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className={`w-40 p-2 border rounded focus:outline-none focus:ring-2 ${
                  errors?.certificationDate
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            )}
          />
        </div>
        {errors?.certificationDate && (
          <p className="text-red-500 text-sm">
            {errors.certificationDate.message}
          </p>
        )}
      </div>

      {/* Guest Signature */}
      <div className="flex flex-wrap flex-col items-start gap-4">
        <div className="w-44">
          <span className="block text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            GUEST CERTIFIED
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Controller
            name="guestSignature"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex flex-col gap-2">
                <div
                  className={`border rounded ${
                    errors?.guestSignature
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <SignatureCanvas
                    ref={signatureRef}
                    onEnd={() => {
                      const signatureData = signatureRef.current.toData();
                      onChange(signatureData);
                    }}
                    canvasProps={{
                      className:
                        "signature-canvas w-full max-w-[400px] h-[150px]",
                      width: 400,
                      height: 150,
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Clear Signature
                  </button>
                </div>
              </div>
            )}
          />
          {errors?.guestSignature && (
            <p className="text-red-500 text-sm">
              {errors.guestSignature.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestCertification;
