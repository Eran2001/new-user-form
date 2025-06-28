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
  <div className="hidden print:block print:m-0 print:p-4 print:max-w-full print:text-sm">
    <div className="text-right text-xs mb-2">
      <div>
        Date: {new Date().toISOString().slice(0, 19).replace("T", " ")} UTC
      </div>
    </div>

    <h2 className="text-xl font-bold text-center">GUEST REGISTRATION</h2>
    <p className="text-base font-medium text-center mb-4">
      ATTERIYA CHILL - ARUGAMBE (ATTERIYA GREEN PVT LTD)
    </p>

    {/* Main Grid Layout */}
    <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-sm">
      {/* Column 1: Guest Info */}
      <div>
        <h3 className="font-bold border-b mb-1">Guest Information</h3>
        <div>
          <strong>Name:</strong> {data.name}
        </div>
        <div>
          <strong>Country:</strong> {data.country}
        </div>
        <div>
          <strong>ID No:</strong> {data.user_id_number}
        </div>
        <div>
          <strong>Mobile:</strong> {data.number}
        </div>
        <div>
          <strong>Email:</strong> {data.email}
        </div>
        <div>
          <strong>Check-In:</strong> {data.checkInDate?.toLocaleDateString()}
        </div>
        <div>
          <strong>Check-Out:</strong> {data.checkOutDate?.toLocaleDateString()}
        </div>
      </div>

      {/* Column 2: Room & Guest Info */}
      <div>
        <h3 className="font-bold border-b mb-1">Room & Guest Details</h3>
        <div className="mb-2">
          <strong>Room Types:</strong>
          <ul className="pl-2">
            {Object.entries(data.rooms.types).map(
              ([key, value]) =>
                value && (
                  <li key={key} className="text-xs">
                    • {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                    {data.rooms[`${key}Count`]}
                  </li>
                )
            )}
          </ul>
        </div>
        <div>
          <strong>Adults:</strong> {data.guests.adults}
        </div>
        <div>
          <strong>Kids:</strong> {data.guests.kids}
        </div>
        <div>
          <strong>Nights:</strong> {data.nights}
        </div>
      </div>

      {/* Column 3: Payment & Conditions */}
      <div>
        <h3 className="font-bold border-b mb-1">Payment Information</h3>
        <div>
          <strong>Method:</strong> {data.payment.method}
        </div>
        <div>
          <strong>Currency:</strong> {data.payment.currency}
        </div>
        <div>
          <strong>Card Type:</strong> {data.cardType}
        </div>
        <div>
          <strong>LKR:</strong> {data.totalAmount.lkr || "N/A"}
        </div>
        <div>
          <strong>USD:</strong> {data.totalAmount.usd || "N/A"}
        </div>
        <div>
          <strong>Rate:</strong> {data.conversion.rate}
        </div>
        <div>
          <strong>Conv. Date:</strong>{" "}
          {data.conversion.date?.toLocaleDateString()}
        </div>

        <h3 className="font-bold border-b mb-1 mt-3">Conditions</h3>
        <ul className="pl-2">
          {Object.entries(data.conditions).map(
            ([key, value]) =>
              value && (
                <li key={key} className="text-xs">
                  • {key.replace(/([A-Z])/g, " $1").trim()}
                </li>
              )
          )}
        </ul>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-4 pt-2 border-t text-xs">
      <div>
        <strong>Certification Date:</strong>{" "}
        {data.certificationDate?.toLocaleDateString()}
      </div>
      <div className="mt-2">
        <strong>Signature:</strong> _______________________
      </div>
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
      // guestSignature: null,
    },
  });

  const [formData, setFormData] = useState(null);

  const generatePDF = (data) => {
    const doc = new jsPDF();
    const leftX = 14;
    const midX = 75;
    const rightX = 140;
    let y = 15;

    doc.setFontSize(16);
    doc.text("GUEST REGISTRATION", 105, y, null, null, "center");
    y += 8;
    doc.setFontSize(12);
    doc.text(
      "ATTERIYA CHILL - ARUGAMBE (ATTERIYA GREEN PVT LTD)",
      105,
      y,
      null,
      null,
      "center"
    );
    y += 10;

    const addColumnBlock = (x, startY, title, items) => {
      let currentY = startY;
      doc.setFontSize(13);
      doc.setFont(undefined, "bold");
      doc.text(title, x, currentY);
      currentY += 5;
      doc.setFontSize(11);
      doc.setFont(undefined, "normal");
      items.forEach((item) => {
        if (item.label) {
          doc.text(`${item.label}: ${item.value}`, x, currentY);
          currentY += 5;
        } else if (item.bullet) {
          doc.text(`• ${item.bullet}`, x + 4, currentY);
          currentY += 5;
        }
      });
      return currentY;
    };

    const guestY = addColumnBlock(leftX, y, "Guest Information", [
      { label: "Full Name", value: data.name },
      { label: "Country", value: data.country },
      { label: "ID No", value: data.user_id_number },
      { label: "Mobile", value: data.number },
      { label: "Email", value: data.email },
      { label: "Check-In", value: data.checkInDate?.toLocaleDateString() },
      { label: "Check-Out", value: data.checkOutDate?.toLocaleDateString() },
    ]);

    const roomTypes = Object.entries(data.rooms.types)
      .filter(([_, v]) => v)
      .map(([key]) => ({
        bullet: `${key.replace(/([A-Z])/g, " $1").trim()}: ${
          data.rooms[`${key}Count`] || 1
        }`,
      }));

    const roomY = addColumnBlock(midX, y, "Room & Guest Details", [
      { label: "Room Types", value: "" },
      ...roomTypes,
      { label: "Adults", value: data.guests.adults },
      { label: "Kids", value: data.guests.kids },
      { label: "Nights", value: data.nights },
    ]);

    const conditionItems = Object.entries(data.conditions)
      .filter(([_, v]) => v)
      .map(([key]) => ({ bullet: key.replace(/([A-Z])/g, " $1").trim() }));

    let paymentY = addColumnBlock(rightX, y, "Payment Information", [
      { label: "Method", value: data.payment.method },
      { label: "Currency", value: data.payment.currency },
      { label: "Card Type", value: data.cardType },
      { label: "LKR", value: data.totalAmount.lkr || "N/A" },
      { label: "USD", value: data.totalAmount.usd || "N/A" },
      { label: "Rate", value: data.conversion.rate },
      {
        label: "Conv. Date",
        value: data.conversion.date?.toLocaleDateString(),
      },
    ]);

    if (conditionItems.length > 0) {
      doc.setFontSize(13);
      doc.setFont(undefined, "bold");
      doc.text("Conditions", rightX, paymentY + 6);
      doc.setFontSize(11);
      doc.setFont(undefined, "normal");
      conditionItems.forEach((item, index) => {
        doc.text(`• ${item.bullet}`, rightX + 4, paymentY + 12 + index * 5);
      });
      paymentY += 12 + conditionItems.length * 5;
    }

    // Footer
    let footerY = Math.max(guestY, roomY, paymentY) + 10;
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text("Certification Date:", leftX, footerY);
    doc.setFont(undefined, "normal");
    doc.text(
      data.certificationDate?.toLocaleDateString() || "",
      leftX + 45,
      footerY
    );
    footerY += 8;
    doc.setFont(undefined, "bold");
    doc.text("Signature:", leftX, footerY);
    doc.setFont(undefined, "normal");
    doc.text("__________________________", leftX + 30, footerY);

    // Save
    doc.save("guest-registration.pdf");
  };

  const onSubmit = (data) => {
    setFormData(data);
    generatePDF(data);
  };

  const handlePrint = handleSubmit(onSubmit, (errors) => {
    console.error("Validation errors:", errors);
    Notification.error("Please fill all required fields before printing");
  });

  return (
    <>
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
      </div>
      <div className="hidden">
        {formData && <PrintableForm data={formData} />}
      </div>
    </>
  );
};

export default UserForm;
