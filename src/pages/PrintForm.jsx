import React from "react";

const PrintForm = ({ data }) => {
  return (
    <div className="print-container">
      <div className="header">
        <h1>GUEST REGISTRATION</h1>
        <h2>ATTERIYA CHILL - ARUGAMBE (ATTERIYA GREEN PVT LTD)</h2>
      </div>

      <div className="guest-info">
        <h3>Guest Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Guest Name:</label>
            <span>{data.name}</span>
          </div>
          <div className="info-item">
            <label>Country:</label>
            <span>{data.country}</span>
          </div>
          <div className="info-item">
            <label>ID/Passport:</label>
            <span>{data.user_id_number}</span>
          </div>
          <div className="info-item">
            <label>Mobile:</label>
            <span>{data.number}</span>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <span>{data.email}</span>
          </div>
        </div>
      </div>

      <div className="booking-details">
        <h3>Booking Details</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Check-in:</label>
            <span>{data.checkInDate?.toLocaleDateString()}</span>
          </div>
          <div className="info-item">
            <label>Check-out:</label>
            <span>{data.checkOutDate?.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="room-details">
        <h3>Room Details</h3>
        <div className="info-grid">
          {data.rooms.types.standardDoubleWithFan && (
            <div className="info-item">
              <label>Standard Double with Fan:</label>
              <span>{data.rooms.standardDoubleWithFanCount}</span>
            </div>
          )}
          {/* Add other room types similarly */}
        </div>
      </div>

      <div className="payment-details">
        <h3>Payment Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Payment Method:</label>
            <span>{data.payment.method}</span>
          </div>
          <div className="info-item">
            <label>Currency:</label>
            <span>{data.payment.currency}</span>
          </div>
          <div className="info-item">
            <label>Total Amount (LKR):</label>
            <span>{data.totalAmount.lkr}</span>
          </div>
          <div className="info-item">
            <label>Total Amount (USD):</label>
            <span>{data.totalAmount.usd}</span>
          </div>
        </div>
      </div>

      <div className="signature-section">
        <div className="guest-signature">
          <label>Guest Signature</label>
          {data.guestSignature && (
            <img
              src={`data:image/png;base64,${data.guestSignature}`}
              alt="Guest Signature"
            />
          )}
        </div>
        <div className="certification-date">
          <label>Date:</label>
          <span>{data.certificationDate?.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PrintForm;
