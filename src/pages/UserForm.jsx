import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserValidationSchema } from "../validation/userValidation";
import { jsPDF } from "jspdf";

import TextInput from "../components/TextInput";
import Notification from "../components/Notification";
import CalendarInput from "../components/CalendarInput";
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

const SectionCard = ({ title, children }) => (
  <div className="bg-white/80 p-6 rounded-2xl shadow-md border border-blue-100 mb-6">
    <h3 className="text-xl font-bold text-blue-800 mb-4 border-b-2 border-blue-200 pb-2 flex items-center gap-2">
      <span className="inline-block w-1.5 h-6 bg-blue-500 rounded-full mr-2"></span>
      {title}
    </h3>
    {children}
  </div>
);

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
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    // Colors
    const primaryBlue = "#1e40af";
    const secondaryBlue = "#3b82f6";
    const bgGray = "#f8fafc";
    const textGray = "#475569";
    const borderGray = "#e2e8f0";

    // Fonts & Margins
    const marginX = 15;
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - 2 * marginX;
    let y = 15;

    // Header
    const addHeader = () => {
      // Logo placeholder (blue rectangle)
      doc.setFillColor(primaryBlue);
      doc.roundedRect(marginX, y, 25, 25, 2, 2, "F");

      // Title & Subtitle
      doc.setFontSize(24);
      doc.setTextColor(primaryBlue);
      doc.setFont(undefined, "bold");
      doc.text("GUEST REGISTRATION", marginX + 35, y + 10);

      doc.setFontSize(11);
      doc.setTextColor(textGray);
      doc.setFont(undefined, "normal");
      doc.text("ATTERIYA CHILL - ARUGAMBE", marginX + 35, y + 18);
      doc.text("(ATTERIYA GREEN PVT LTD)", marginX + 35, y + 24);

      // Header separator
      doc.setDrawColor(borderGray);
      doc.setLineWidth(0.5);
      doc.line(marginX, y + 32, pageWidth - marginX, y + 32);

      return y + 40;
    };

    // Section Header
    const addSectionHeader = (title, y) => {
      doc.setFillColor(secondaryBlue);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.roundedRect(marginX, y, contentWidth, 8, 2, 2, "F");
      doc.text(title, marginX + 5, y + 5.5);
      return y + 12;
    };

    // Guest Information Section
    const addGuestInfo = (y) => {
      y = addSectionHeader("GUEST INFORMATION", y);

      doc.setFillColor(bgGray);
      doc.roundedRect(marginX, y, contentWidth, 45, 2, 2, "F");

      const infoGrid = [
        [
          ["Full Name:", String(data.name || "-")],
          ["Mobile:", String(data.number || "-")],
        ],
        [
          ["Country:", String(data.country || "-")],
          ["Email:", String(data.email || "-")],
        ],
        [
          ["ID No:", String(data.user_id_number || "-")],
          [
            "Check-In:",
            data.checkInDate ? data.checkInDate.toLocaleDateString() : "-",
          ],
        ],
        [
          [
            "Check-Out:",
            data.checkOutDate ? data.checkOutDate.toLocaleDateString() : "-",
          ],
        ],
      ];

      doc.setFontSize(10);
      doc.setTextColor(textGray);

      infoGrid.forEach((row, i) => {
        row.forEach((item, j) => {
          doc.setFont(undefined, "bold");
          doc.text(
            String(item[0]),
            marginX + 5 + (j * contentWidth) / 2,
            y + 8 + i * 10
          );
          doc.setFont(undefined, "normal");
          doc.text(
            String(item[1]),
            marginX + 30 + (j * contentWidth) / 2,
            y + 8 + i * 10
          );
        });
      });

      return y + 50;
    };

    // Room Details Section
    const addRoomDetails = (y) => {
      y = addSectionHeader("ROOM & GUEST DETAILS", y);

      doc.setFillColor(bgGray);
      doc.roundedRect(marginX, y, contentWidth / 2 - 5, 45, 2, 2, "F");

      doc.setFontSize(10);
      doc.setTextColor(textGray);

      // Room Types
      let roomTypes = Object.entries(data.rooms.types)
        .filter(([, v]) => v)
        .map(
          ([key]) =>
            `${key.replace(/([A-Z])/g, " $1").trim()}: ${String(
              data.rooms[`${key}Count`] || 1
            )}`
        );

      doc.setFont(undefined, "bold");
      doc.text("Room Types:", marginX + 5, y + 8);
      doc.setFont(undefined, "normal");
      roomTypes.forEach((type, i) => {
        doc.text(String(type), marginX + 10, y + 16 + i * 6);
      });

      // Guest Count
      doc.setFont(undefined, "bold");
      doc.text("Guest Count:", marginX + 5, y + 35);
      doc.setFont(undefined, "normal");
      doc.text(
        `Adults: ${String(data.guests.adults || "-")}    Kids: ${String(
          data.guests.kids || "-"
        )}    Nights: ${String(data.nights || "-")}`,
        marginX + 10,
        y + 41
      );

      return y;
    };

    // Payment Information Section
    const addPaymentInfo = (y) => {
      doc.setFillColor(bgGray);
      doc.roundedRect(
        marginX + contentWidth / 2 + 5,
        y,
        contentWidth / 2 - 5,
        45,
        2,
        2,
        "F"
      );

      const startX = marginX + contentWidth / 2 + 10;
      const paymentInfo = [
        ["Payment Method:", String(data.payment.method || "-")],
        ["Currency:", String(data.payment.currency || "-")],
        ["Card Type:", String(data.cardType || "-")],
        ["Amount (LKR):", String(data.totalAmount.lkr || "-")],
        ["Amount (USD):", String(data.totalAmount.usd || "-")],
        ["Exchange Rate:", String(data.conversion.rate || "-")],
        [
          "Conv. Date:",
          data.conversion.date
            ? data.conversion.date.toLocaleDateString()
            : "-",
        ],
      ];

      doc.setFontSize(10);
      doc.setTextColor(textGray);

      paymentInfo.forEach((item, i) => {
        doc.setFont(undefined, "bold");
        doc.text(String(item[0]), startX, y + 8 + i * 5);
        doc.setFont(undefined, "normal");
        doc.text(String(item[1]), startX + 35, y + 8 + i * 5);
      });

      return y + 50;
    };

    // Footer
    const addFooter = (y) => {
      doc.setDrawColor(borderGray);
      doc.setLineWidth(0.5);
      doc.line(marginX, y, pageWidth - marginX, y);

      doc.setFontSize(10);
      doc.setTextColor(textGray);

      // Certification Date
      doc.text("Certification Date:", marginX, y + 10);
      doc.text(
        data.certificationDate
          ? data.certificationDate.toLocaleDateString()
          : "-",
        marginX + 30,
        y + 10
      );

      // Signature
      doc.text("Signature:", marginX + contentWidth / 2, y + 10);
      doc.line(
        marginX + contentWidth / 2 + 20,
        y + 10,
        pageWidth - marginX - 20,
        y + 10
      );

      // Generated timestamp
      doc.setFontSize(8);
      doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        pageWidth - marginX,
        y + 20,
        { align: "right" }
      );
    };

    // Generate the PDF
    y = addHeader();
    y = addGuestInfo(y);
    y = addRoomDetails(y);
    y = addPaymentInfo(y);
    addFooter(y + 10);

    // Save the PDF
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden border border-blue-200">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-8 px-4">
            <h2 className="text-4xl font-extrabold text-center text-white mb-2 tracking-wide drop-shadow-lg">
              GUEST REGISTRATION
            </h2>
            <p className="text-lg font-medium text-center text-blue-100">
              ATTERIYA CHILL - ARUGAMBE (ATTERIYA GREEN PVT LTD)
            </p>
          </div>

          <form onSubmit={handlePrint} className="p-8">
            <div className="space-y-8">
              <SectionCard title="Guest Information">
                <div className="grid lg:grid-cols-2 gap-6">
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
                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                  <TextInput
                    label="Passport No/ Identification No"
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
                <div className="mt-6">
                  <TextInput
                    type="email"
                    label="Email Address"
                    name="email"
                    register={register}
                    errors={errors}
                    placeholder="Enter your Email Address"
                  />
                </div>
              </SectionCard>

              <SectionCard title="Booking Details">
                <div className="grid lg:grid-cols-2 gap-6">
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
              </SectionCard>

              <SectionCard title="Room Selection">
                <RoomTypeSelection control={control} errors={errors} />
              </SectionCard>

              <SectionCard title="Guest & Stay Details">
                <div className="grid lg:grid-cols-2 gap-6">
                  <GuestSelection control={control} errors={errors} />
                  <NightSelection control={control} errors={errors} />
                </div>
              </SectionCard>

              <SectionCard title="Payment Information">
                <PaymentSelection control={control} errors={errors} />
                <div className="mt-6">
                  <TotalAmount control={control} errors={errors} />
                </div>
                <div className="mt-6">
                  <ConversionRateAndDate control={control} errors={errors} />
                </div>
                <div className="mt-6">
                  <CardTypeSelection control={control} errors={errors} />
                </div>
              </SectionCard>

              <SectionCard title="Additional Information">
                <BookingSourceSelection control={control} errors={errors} />
                <div className="mt-6">
                  <ConditionsAgreement control={control} errors={errors} />
                </div>
                <div className="mt-6">
                  <GuestCertification control={control} errors={errors} />
                </div>
              </SectionCard>

              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75V4.5A2.25 2.25 0 0015 2.25H9A2.25 2.25 0 006.75 4.5v2.25"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 17.25v2.25A2.25 2.25 0 009 21.75h6a2.25 2.25 0 002.25-2.25v-2.25"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9.75h16.5M6.75 12.75h.008v.008H6.75v-.008zm0 3h.008v.008H6.75v-.008zm3-3h.008v.008H9.75v-.008zm0 3h.008v.008H9.75v-.008zm3-3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3-3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>
                  Generate & Print Registration Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden">
        {formData && <PrintableForm data={formData} />}
      </div>
    </div>
  );
};

export default UserForm;
