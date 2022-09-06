import { Container } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import Day from './components/Day';
import Slots from './components/Slots';

const days = ["MON 5", "TUE 6", "WED 7", "THU 8", "FRI 9", "SAT 10", "SUN 11"]
const timeSlots = ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM","12PM - 1PM", "1PM - 2PM", "2PM - 3PM", "3PM - 4PM", "4PM - 5PM", "5PM - 6PM", "6PM - 7PM", "7PM - 8PM"]

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const changeSelectedIndex = (value) => {
    setSelectedIndex(value)
  }

  return (
    <div className="App">
      <div className='heading'>SCHEDULER</div>
      <Container maxWidth='xl'>
        <div className='container'>
            {days.map((day, index) => (
              <div className='days' key={day}>
                <Day day = {day} selected = {selectedIndex === index} changeSelectedIndex = {changeSelectedIndex} />
                  <div className='time-slots'>
                    {timeSlots.map((time) => (
                      <Slots key={time} day={day} timeSlot = {time} />
                    ))}
                  </div>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
