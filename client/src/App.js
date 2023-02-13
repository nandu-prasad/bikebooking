import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "./App.css";

function App() {
  const [booking, setBooking] = useState({
    sdate: "",
    edate: "",
    customer: ""
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setBooking({ ...booking, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { sdate, edate, customer } = booking;
    const res = await fetch("http://localhost:5000/api/auth/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sdate: sdate,
        edate: edate,
        customer: customer
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Slot Already Taken , Please Select Another Slot");
    } else {
      window.alert("Successfully Booked");
    }
  };

  return (
    <div className="App">
      <h1>BIKE BOOKING SYSTEM</h1>
      <form>
        <div>
          <div style={{ marginTop: "3%" }}>
            <DateTimePicker
              onChange={(sdate) => setBooking({ ...booking, sdate })}
              value={booking.sdate}
            />
          </div>
          <div style={{ marginTop: "3%" }}>
            <DateTimePicker
              onChange={(edate) => setBooking({ ...booking, edate })}
              value={booking.edate}
            />
          </div>

          <div style={{ marginTop: "3%" }}>

          <select
          name="customer"
          required
          className="form-control"
          style={{ width: "130px", height: "30px" , borderRadius: "5px", textAlign: "center" }}
          value={booking.customer}
          onChange={handleInputs}>
            <option>Father</option>
            <option>Sister</option>
            <option>Nandu</option>

          </select>
          </div>
          <br />
          <center style={{ marginTop: "1%" }}>
            <button
              type="submit"
              style={{
                width: "100px",
                height: "30px",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
                fontWeight:"bold"
              }}
              onClick={PostData}
              className="blob-btn btn-style"
            >
              submit
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}

export default App;
