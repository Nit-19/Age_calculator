import React, { useState } from "react";

export default function Card() {
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [age, setAge] = useState({ years: '- -', months: '- -', days: '- -' });
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });

  const validateInputs = () => {
    const { day, month, year } = dob;
    const newErrors = { day: '', month: '', year: '' };
    let isValid = true;

    if (!day || day < 1 || day > 31) {
      newErrors.day = 'Must be a valid day';
      isValid = false;
    }

    if (!month || month < 1 || month > 12) {
      newErrors.month = 'Must be a valid month';
      isValid = false;
    }

    if (!year || year >= new Date().getFullYear()) {
      newErrors.year = 'Must be in the past';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateAge = () => {
    if (!validateInputs()) {
      setAge({ years: '- -', months: '- -', days: '- -' });
      return;
    }

    const { day, month, year } = dob;
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months = (months + 12) % 12;
    }

    if (days < 0) {
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += lastMonth.getDate();
    }

    setAge({ years, months, days });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDob({ ...dob, [name]: value });
  };

  return (
    <div>
      <div className="main">
        <div className="card">
          <div className="input_div">
            <div className="direction">
              <label htmlFor="day" style={{ color: errors.day ? 'red' : 'gray', fontSize: "10px", letterSpacing: "2px", lineHeight: "22px" }}>DAY</label>
              <input
                type="text"
                className="input"
                placeholder="DD"
                id="day"
                name="day"
                value={dob.day}
                onChange={handleInputChange}
                style={{ borderColor: errors.day ? 'red' : 'gray', color: "black" }}
              />
              <span>{errors.day && <div style={{ color: 'red', fontFamily: "Poppins-Italic", fontSize: "8px", lineHeight: "22px" }}>{errors.day}</div>}</span>
            </div>
            <div className="direction">
              <label htmlFor="months" style={{ color: errors.month ? 'red' : 'gray', fontSize: "10px", letterSpacing: "2px", lineHeight: "22px" }}>MONTH</label>
              <input
                type="text"
                className="input"
                placeholder="MM"
                id="months"
                name="month"
                value={dob.month}
                onChange={handleInputChange}
                style={{ borderColor: errors.month ? 'red' : 'gray', color: "black" }}
              />
              {errors.month && <div style={{ color: 'red', fontFamily: "Poppins-Italic", fontSize: "8px", lineHeight: "22px" }}>{errors.month}</div>}
            </div>
            <div className="direction">
              <label htmlFor="years" style={{ color: errors.year ? 'red' : 'gray', fontSize: "10px", letterSpacing: "2px", lineHeight: "22px" }}>YEAR</label>
              <input
                type="text"
                className="input"
                placeholder="YYYY"
                id="years"
                name="year"
                value={dob.year}
                onChange={handleInputChange}
                style={{ borderColor: errors.year ? 'red' : 'gray', color: "black" }}
              />
              {errors.year && <div style={{ color: 'red', fontFamily: "Poppins-Italic", fontSize: "8px", lineHeight: "22px" }}>{errors.year}</div>}
            </div>
          </div>
          <div className="button">
            <button onClick={calculateAge}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="40"
                viewBox="0 0 46 44"
              >
                <g fill="none" stroke="#FFF" strokeWidth="2">
                  <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                </g>
              </svg>
            </button>
          </div>
          <div className="calculator">
            <h1 style={{ color: 'rgb(134, 25, 250)' }}>{age.years} <span className="black">years</span></h1>
            <h1 style={{ color: 'rgb(134, 25, 250)' }}>{age.months} <span className="black">months</span></h1>
            <h1 style={{ color: 'rgb(134, 25, 250)' }}>{age.days} <span className="black">days</span></h1>
          </div>
        </div>
      </div>
    </div>
  );
};