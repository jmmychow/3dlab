import React from "react";
import { format, addDays, startOfDay } from "date-fns";
import { useState } from "react";
import Calendar from "./calendar/Calendar";

const Booking = ({facilities, academic, personsLess10, bookings, setBookings, setMessage}) => {
  const start = startOfDay(addDays(new Date(),1));
  const [ currentDate, setCurrentDate ] = useState();

  return (
    <div className="-mt-8 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4"></div>
      <Calendar start={start} facilities={facilities} academic={academic} personsLess10={personsLess10} bookings={bookings} setBookings={setBookings} setMessage={setMessage}/>
    </div>
  );
};

export default Booking;