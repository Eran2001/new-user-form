import * as yup from "yup";

export const UserValidationSchema = yup.object({
  name: yup.string().required("Full Name is required!"),
  country: yup.string().required("Home country is required!"),
  email: yup
    .string()
    .required("Email Address is required!")
    .email("Enter a valid email address"),

  number: yup
    .string()
    .required("Mobile number is required!")
    .matches(
      /^(?:\+94|94|0)?7[01245678]\d{7}$/,
      "Enter a valid Sri Lankan mobile number"
    ),
  user_id_number: yup
    .string()
    .required("Identification is required!")
    .matches(
      /^(?:\d{9}[VXvx]|\d{12}|[A-Z]{1,2}\d{6,7})$/,
      "Enter a valid NIC or Passport number"
    ),
  description: yup.string(),
  terms: yup.bool().oneOf([true], "You must accept the terms"),
  checkInDate: yup
    .date()
    .required("Check-In date is required!")
    .typeError("Please enter a valid date")
    .min(new Date(), "Date cannot be in the past"),
  checkOutDate: yup
    .date()
    .required("Check-Out date is required!")
    .typeError("Please enter a valid date")
    .min(new Date(), "Date cannot be in the past"),
  guests: yup.object({
    adults: yup
      .number()
      .typeError("Adult count is required")
      .min(1, "At least 1 adult is required")
      .required("Adult count is required"),
    kids: yup
      .number()
      .typeError("Kids count is required")
      .min(0, "Kids count cannot be negative")
      .required("Kids count is required"),
  }),
  nights: yup
    .number()
    .typeError("Number of nights is required")
    .min(1, "At least 1 night is required")
    .required("Number of nights is required"),
  payment: yup.object({
    method: yup
      .string()
      .required("Payment method is required")
      .oneOf(["CASH", "CARD"], "Invalid payment method"),
    currency: yup
      .string()
      .required("Currency is required")
      .oneOf(["LKR", "USD"], "Invalid currency"),
  }),
  totalAmount: yup.object({
    lkr: yup
      .number()
      .transform((value) => (isNaN(value) || value === "" ? undefined : value))
      .typeError("LKR amount is required")
      .min(0, "Amount cannot be negative")
      .nullable(),
    usd: yup
      .number()
      .transform((value) => (isNaN(value) || value === "" ? undefined : value))
      .typeError("USD amount is required")
      .min(0, "Amount cannot be negative")
      .nullable(),
  }),
  conversion: yup.object({
    rate: yup
      .number()
      .typeError("Conversion rate is required")
      .required("Conversion rate is required")
      .positive("Conversion rate is requirede"),
    date: yup
      .date()
      .typeError("Date is required")
      .required("Date is required")
      // Either remove .nullable() completely, or use this approach:
      .nullable()
      .test("required", "Date is required", (value) => value !== null),
  }),
  cardType: yup
    .string()
    .required("Card type is required")
    .oneOf(["VISA", "MASTER", "AMEX"], "Invalid card type"),
  bookingSource: yup
    .string()
    .required("Booking source is required")
    .oneOf(["BOOKING.COM", "DIRECT", "TRAVEL_AGENT"], "Invalid booking source"),
  conditions: yup.object({
    roomChanges: yup
      .boolean()
      .oneOf([true], "You must agree to room changes policy"),
    datesReduction: yup
      .boolean()
      .oneOf([true], "You must agree to dates policy"),
    checkInPayment: yup
      .boolean()
      .oneOf([true], "You must agree to check-in payment policy"),
    foodPayment: yup
      .boolean()
      .oneOf([true], "You must agree to food payment policy"),
  }),
  certificationDate: yup
    .date()
    .nullable()
    .test("required", "Date is required", (value) => value !== null),
  guestSignature: yup
    .array()
    .required("Guest signature is required")
    .test("not-empty", "Signature is required", (value) => {
      return value && value.length > 0;
    }),
  rooms: yup.object({
    types: yup
      .object({
        standardDoubleWithFan: yup.boolean(),
        deluxeDouble: yup.boolean(),
        deluxeTriple: yup.boolean(),
        superiorDouble: yup.boolean(),
        superiorTriple: yup.boolean(),
      })
      .test(
        "at-least-one-room",
        "Please select at least one room type",
        (obj) => obj && Object.values(obj).some((val) => val === true)
      ),
  }),
});
