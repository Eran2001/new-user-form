import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserValidationSchema } from "../validation/userValidation";
import { jsPDF } from "jspdf";

import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import SelectInput from "../components/SelectInput";
import Checkbox from "../components/Checkbox";
import Notification from "../components/Notification";
import CalendarInput from "../components/CalendarInput";
import RoomSelection from "../components/RoomSelection";
import GuestSelection from "../components/GuestSelection";
import NightSelection from "../components/NightSelection";
import PaymentSelection from "../components/PaymentSeelction";
import TotalAmount from "../components/TotalAMount";
import ConversionRateAndDate from "../components/ConversionRateAndDate";
import CardTypeSelection from "../components/CardTypeSelection";
import BookingSourceSelection from "../components/BookingSourceSelection";
import ConditionsAgreement from "../components/ConditionsAgreement";
import GuestCertification from "../components/GuestCertification";
import RoomTypeSelection from "../components/RoomTypeSelection";

const PrintableForm = ({ data }) => (
  <div
    id="printable-form"
    className="p-6 bg-white border border-gray-200 rounded-lg hidden print:block"
  >
    <h2 className="text-2xl font-bold text-center mb-4">GUEST REGISTRATION</h2>
    <p className="text-lg font-medium text-center mb-6">
      ATTERIYA CHILL - ARUGAMBE (ATTERIYA GREEN PVT LTD)
    </p>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <strong>Full Name:</strong> {data.name}
      </div>
      <div>
        <strong>Home Country:</strong> {data.country}
      </div>
      <div>
        <strong>Passport/ID No:</strong> {data.user_id_number}
      </div>
      <div>
        <strong>Mobile:</strong> {data.number}
      </div>
      <div>
        <strong>Email:</strong> {data.email}
      </div>
      <div>
        <strong>Age:</strong> {data.age}
      </div>
      <div>
        <strong>Gender:</strong> {data.gender}
      </div>
      <div>
        <strong>Check-In Date:</strong> {data.checkInDate?.toLocaleDateString()}
      </div>
      <div>
        <strong>Check-Out Date:</strong>{" "}
        {data.checkOutDate?.toLocaleDateString()}
      </div>
    </div>
    <div className="mt-4">
      <strong>Room Types:</strong>
      <ul>
        {Object.entries(data.rooms.types).map(
          ([key, value]) =>
            value && (
              <li key={key}>
                {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                {data.rooms[`${key}Count`]} room(s)
              </li>
            )
        )}
      </ul>
    </div>
    <div className="mt-4">
      <strong>Guests:</strong> Adults: {data.guests.adults}, Kids:{" "}
      {data.guests.kids}
    </div>
    <div className="mt-4">
      <strong>Nights:</strong> {data.nights}
    </div>
    <div className="mt-4">
      <strong>Payment:</strong> Method: {data.payment.method}, Currency:{" "}
      {data.payment.currency}
    </div>
    <div className="mt-4">
      <strong>Total Amount:</strong> LKR: {data.totalAmount.lkr || "N/A"}, USD:{" "}
      {data.totalAmount.usd || "N/A"}
    </div>
    <div className="mt-4">
      <strong>Conversion:</strong> Rate: {data.conversion.rate}, Date:{" "}
      {data.conversion.date?.toLocaleDateString()}
    </div>
    <div className="mt-4">
      <strong>Card Type:</strong> {data.cardType}
    </div>
    <div className="mt-4">
      <strong>Booking Source:</strong> {data.bookingSource}
    </div>
    <div className="mt-4">
      <strong>Conditions Agreed:</strong>
      <ul>
        {Object.entries(data.conditions).map(
          ([key, value]) =>
            value && <li key={key}>{key.replace(/([A-Z])/g, " $1").trim()}</li>
        )}
      </ul>
    </div>
    <div className="mt-4">
      <strong>Certification Date:</strong>{" "}
      {data.certificationDate?.toLocaleDateString()}
    </div>
    <div className="mt-4">
      <strong>Guest Signature:</strong> {data.guestSignature?.join(", ")}
    </div>
    <div className="mt-4">
      <strong>Meal Plan:</strong>
      <ul>
        {Object.entries(data.rooms.mealPlan).map(
          ([key, value]) => value && <li key={key}>{key}</li>
        )}
      </ul>
    </div>
  </div>
);

const UserForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserValidationSchema),
    defaultValues: {
      date: null,
      rooms: {
        types: {
          standardDoubleWithFan: false,
          deluxeDouble: false,
          deluxeTriple: false,
          superiorDouble: false,
          superiorTriple: false,
        },
        standardDoubleWithFanCount: null,
        deluxeDoubleCount: null,
        deluxeTripleCount: null,
        superiorDoubleCount: null,
        superiorTripleCount: null,
        mealPlan: {
          RO: false,
          BB: false,
          HB: false,
          FB: false,
        },
      },
      guests: {
        adults: "",
        kids: "",
        nights: "",
      },
      payment: {
        method: "",
        currency: "",
      },
      totalAmount: {
        lkr: "",
        usd: "",
      },
      bookingSource: "",
      conversion: {
        rate: "",
        date: null,
      },
      cardType: "",
      conditions: {
        roomChanges: false,
        datesReduction: false,
        checkInPayment: false,
        foodPayment: false,
      },
      certificationDate: null,
      guestSignature: null,
    },
  });

  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    setFormData(data);
    Notification.success("Form validated successfully");
    window.print();
  };

  const handlePrint = handleSubmit(onSubmit, (errors) => {
    console.error("Validation errors:", errors);
    Notification.error("Please fill all required fields before printing");
  });

  return (
    <div className="max-w-[80vw] mx-auto my-10 p-6 bg-white rounded-xl shadow-2xl px-10 py-10">
      <form onSubmit={handlePrint}>
        <h2 className="text-2xl font-bold mb-2 text-center">
          GUEST REGISTRATION
        </h2>
        <p className="text-lg font-medium text-center mb-6">
          ATTERIYA CHILL - ARUGAMBE (ATTERIYA GREEN PVT LTD)
        </p>
        <div className="lg:space-y-2 max-lg:space-y-1">
          <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 lg:gap-4 max-lg:gap-2">
            <TextInput
              label="Guest Full Name"
              name="name"
              register={register}
              errors={errors}
              placeholder="Enter your full name"
            />
            <TextInput
              label="Guest Home Country"
              name="country"
              register={register}
              errors={errors}
              placeholder="Enter your home country"
            />
          </div>
          <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 lg:gap-4 max-lg:gap-2">
            <TextInput
              label="Passport No/ Identification No"
              type="number"
              name="user_id_number"
              register={register}
              errors={errors}
              placeholder="Enter your identification number"
            />
            <TextInput
              type="tel"
              label="Mobile/ Whatsapp"
              name="number"
              register={register}
              errors={errors}
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="pb-1">
            <TextInput
              type="email"
              label="Email Address"
              name="email"
              register={register}
              errors={errors}
              placeholder="Enter your Email Address"
            />
          </div>
          <div className="grid lg:grid-cols-2 max-lg:grid-cols-1 lg:gap-4 max-lg:gap-2">
            <CalendarInput
              label="Select Check-In date"
              name="checkInDate"
              control={control}
              errors={errors}
              placeholder="Check-In date"
            />
            <CalendarInput
              label="Select Check-Out"
              name="checkOutDate"
              control={control}
              errors={errors}
              placeholder="Check-Out date"
            />
          </div>
          <div className="pt-4 pb-1">
            <RoomTypeSelection control={control} errors={errors} />
          </div>
          <div className="pt-4 pb-1 grid lg:grid-cols-2 max-lg:grid-cols-1 lg:gap-4 max-lg:gap-2">
            <GuestSelection control={control} errors={errors} />
            <NightSelection control={control} errors={errors} />
          </div>
          <div className="pt-4 pb-1">
            <PaymentSelection control={control} errors={errors} />
          </div>
          <div className="pt-4 pb-1">
            <TotalAmount control={control} errors={errors} />
          </div>
          <div className="pt-4 pb-1">
            <ConversionRateAndDate control={control} errors={errors} />
          </div>
          <div className="pt-4 pb-1">
            <CardTypeSelection control={control} errors={errors} />
          </div>
          <div className="pt-4 pb-1">
            <BookingSourceSelection control={control} errors={errors} />
          </div>
          <div className="pt-4 pb-1">
            <ConditionsAgreement control={control} errors={errors} />
          </div>
          <div className="pt-4 pb-1">
            <GuestCertification control={control} errors={errors} />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Print
            </button>
          </div>
        </div>
      </form>

      {formData && <PrintableForm data={formData} />}
    </div>
  );
};

export default UserForm;
