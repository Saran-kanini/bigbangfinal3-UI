import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

export default function BookingPage() {
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [bookingDate, setBookingDate] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [offerForDay, setOfferForDay] = useState('$0.0');
  const [rateForDay, setRateForDay] = useState('$186.86');
  const agencystoredId = localStorage.getItem('selectedAgencyId');
  const userstoredId = localStorage.getItem('user_Id');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgencyData();
  }, []);

  const fetchAgencyData = async () => {
    try {
      const response = await fetch(`https://localhost:7125/api/Agency/${agencystoredId}`);
      const data = await response.json();
      setOfferForDay(data.offer_For_Day);
      setRateForDay(data.rate_for_day);
    } catch (error) {
      console.error('Error while fetching agency data:', error);
    }
  };

  const handleNumberOfPersonsChange = (event) => {
    const value = Number(event.target.value);
    setNumberOfPersons(value > 4 ? 4 : value);
  };

  const handleNumberOfChildrenChange = (event) => {
    const value = Number(event.target.value);
    setNumberOfChildren(value > 4 ? 4 : value);
  };

  const handleBookingDateChange = (date) => {
    setBookingDate(date);
  };

  const handleProceedToPayment = async () => {
    try {
      const response = await fetch('https://localhost:7125/api/Bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_Date_Of_Booking: bookingDate,
          no_of_perons: numberOfPersons,
          no_of_childer: numberOfChildren,
          user: {
            user_Id: userstoredId,
          },
          agency: {
            agency_Id: agencystoredId,
          },
        }),
      });
      const data = await response.json();
      console.log('Payment Details:', data);
      setPaymentDetails(data);
    } catch (error) {
      console.error('Error while making API request:', error);
    }
  };

  const generatePaymentPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Payment Receipt', 15, 15);
    const tableData = [
      ['No of Person', paymentDetails?.no_of_perons || 'N/A'],
      ['No of Children', paymentDetails?.no_of_childer || 'N/A'],
      ['Rate per Day', rateForDay],
      ['Total Amount', paymentDetails?.booking_amount || 'N/A'],
      ['GST', '18%'],
      ['Total amount with GST', paymentDetails?.booking_amount_with_gst || 'N/A'],
    ];

    doc.autoTable({
      startY: 25,
      head: [['Description', 'Amount']],
      body: tableData,
    });

    doc.save('payment_receipt.pdf');
    navigate('/success');
  };

  return (
    <div className="container">
      <section className="py-5">
        <div className="row">
          <div className="col-md-7">
            <div className="card p-4">
              <h5 className="mb-3">Book Here!!</h5>
              <div className="mb-3">
                <label htmlFor="numberOfPersons" className="form-label">Number of Persons (Max 4):</label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPersons"
                  min="1"
                  max="4"
                  value={numberOfPersons}
                  onChange={handleNumberOfPersonsChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="numberOfPersonsRight" className="form-label">Number of Children (Max 4):</label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPersonsRight"
                  min="1"
                  max="4"
                  value={numberOfChildren}
                  onChange={handleNumberOfChildrenChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Booking Date:</label>
                <DatePicker
                  selected={bookingDate}
                  onChange={handleBookingDateChange}
                  placeholderText="Select booking date"
                  className="form-control"
                />
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-success" onClick={handleProceedToPayment}>
                  Proceed to payment
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card p-4">
              <h5 className="mb-3">Order Recap</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Package Price</span>
                <span>{rateForDay}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>No of Person</span>
                <span>{paymentDetails?.no_of_perons || 'N/A'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>No of Children</span>
                <span>{paymentDetails?.no_of_childer || 'N/A'}</span>
              </div>

<div className="d-flex justify-content-between mb-2">
  <span>Total Price for Persons</span>
  <span>{paymentDetails?.amount_for_person || 'N/A'}</span>
</div>
<div className="d-flex justify-content-between mb-2">
  <span>Total Price for Children</span>
  <span>{paymentDetails?.amount_for_childer || 'N/A'}</span>
</div>
<hr />
<div className="d-flex justify-content-between mb-2">
  <span>Total</span>
  <span>{paymentDetails?.booking_amount || 'N/A'}</span>
</div>
<div className="d-flex justify-content-between mb-2">
  <span>GST</span>
  <span>18%</span>
</div>
<hr />
<div className="d-flex justify-content-between mb-2">
  <span>Total Amount with GST</span>
  <span className="text-success">{paymentDetails?.booking_amount_with_gst || 'N/A'}</span>
</div>
<br />
<div className="text-center">
  <button className="btn btn-success" onClick={generatePaymentPDF}>
    Download Your Receipt
  </button>
</div>

            
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
