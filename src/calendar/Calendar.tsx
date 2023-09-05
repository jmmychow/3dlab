import {
  addDays,
  subDays,
  addMonths,
  addHours,
  differenceInDays,
  format,
  setDate,
  startOfMonth,
  endOfMonth
} from "date-fns";
import Cell from "./Cell";
import Cell2 from "./Cell2";

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
  start: Date;
  facilities: [String];
  academic: Boolean;
  personsLess10: Boolean;
  bookings: { _id:String, date:String, email:String, facility:String };
  setBookings: ([bookings]) => void;
  setMessage: (String) => void;
  prefixDays: number;
  monthDays: number;
  startMonthDate: Date;
  endMonthDate: Date;
  suffixDays: number;
  handleClickDateType: (number) => void;
  handleMouseType: (String) => void;
};


const CalendarMonth: React.FC<Props> = ({prefixDays, monthDays, startMonthDate, endMonthDate, suffixDays, bookings, facilities, handleClickDateType, handleMouseType}) => {
  return (
    <div className="w-[500px] rounded-xl">
      <div className="grid grid-cols-7 items-center justify-center text-center">
        <Cell className="btn no-animation bg-opacity-0 hover:bg-opacity-0 border-none col-span-7">{format(startMonthDate, "LLLL yyyy")}</Cell>

        {weeks.map((week) => (
          ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(week)
            ? <Cell className="btn no-animation bg-opacity-70 bg-sky-200 hover:bg-sky-200 hover:bg-opacity-70 border-none m-0.5 text-black">{week}</Cell>
            : <Cell className="btn no-animation bg-opacity-0 hover:bg-opacity-0 border-none m-0.5"/>
        ))}

        {Array.from({ length: prefixDays }).map((_, index) => (
          <Cell2 className="btn no-animation bg-opacity-0 hover:bg-opacity-0 border-none m-0.5" key={index} />
        ))}

        {Array.from({ length: monthDays }).map((_, index) => {
          const date = index + 1;
          const currentAM = addDays(startOfMonth(startMonthDate), date-1);
          const currentPM = addHours(currentAM, 12);
          const bookedAM = bookings.filter(b => facilities.includes(b.facility) && b.date == currentAM.toString());
          const bookedPM = bookings.filter(b => facilities.includes(b.facility) && b.date == currentPM.toString());

          const weekDay = addDays(startOfMonth(startMonthDate), date-1).getDay();
          if (date < startMonthDate.getDate() || date > endMonthDate.getDate() || weekDay==0 || weekDay==6) {
            return (<Cell2 className="m-0.5" key={date} />);
          } else if (date % 2 == 0) {
            return (<Cell2 className="btn border-none m-0.5 text-gray-200 bg-gray-500 bg-opacity-80 hover:bg-gray-500 hover:bg-opacity-50" key={date} bookedAM={bookedAM} bookedPM={bookedPM} onClick={handleClickDateType} onMouse={handleMouseType} >{date}</Cell2>);
          } else {
            return (<Cell2 className="btn border-none m-0.5 text-gray-200 bg-gray-500 bg-opacity-30 hover:bg-white hover:bg-opacity-10" key={date} bookedAM={bookedAM} bookedPM={bookedPM} onClick={handleClickDateType} onMouse={handleMouseType} >{date}</Cell2>);
          }
        })}

        {Array.from({ length: suffixDays }).map((_, index) => (
          <Cell2 className="btn no-animation bg-opacity-0 hover:bg-opacity-0 border-none m-0.5" key={index} />
        ))}
      </div>
    </div>
  );
};


const Calendar: React.FC<Props> = ({ start, facilities, academic, personsLess10, bookings, setBookings, setMessage }) => {
  const startDate = startOfMonth(start);
  const endDate = addMonths(start,1);
  const monthdays = [];

  var s = startDate;
  var n = endOfMonth(start);

  monthdays.push(differenceInDays(n, s)+1);
  while (n < subDays(endDate,1)) {
    s = addDays(n,1);
    n = endOfMonth(s);
    monthdays.push(differenceInDays(n, s)+1);
  }

  const prefixDays1 = startDate.getDay();
  const suffixDays1 = 6 - endOfMonth(start).getDay();
  const prefixDays2 = s.getDay();
  const suffixDays2 = 6 - endOfMonth(endDate).getDay();

  const handleClickDate1 = (index: number) => {
    var date = setDate(start, index);
    if (index > Math.floor(index)) {
      date = addHours(date,12);
    }
    handleClickDate(date);
  };

  const handleClickDate2 = (index: number) => {
    var date = setDate(endDate, index);
    if (index > Math.floor(index)) {
      date = addHours(date,12);
    }
    handleClickDate(date);
  };

  const handleClickDate = (date: Date) => {
    var tbb = [];
    facilities.forEach(f => {
      const i = bookings.findIndex(b => b.date.toString() == date.toString() && b.facility == f);
      
      if (i < 0) {
        tbb.push({ "_id":"2943721", "date":date.toString(), "facility":f, "email":"right@hksyu.edu", "academic":academic, "personsLess10":personsLess10 });
      } else if (bookings[i].email == "right@hksyu.edu") {
        setBookings(bookings.toSpliced(i,1));
        bookings.splice(i,1);
        setMessage(f+" on "+format(date, "EEE dd MMM yyyy a")+" is cancelled");
      } else {
        setMessage(f+" on "+format(date, "EEE dd MMM yyyy a")+" has been booked by "+bookings[i].email);
      };
    });

    if (tbb.length == facilities.length) {
      if (typeof(academic) == 'boolean' && typeof(personsLess10) == 'boolean') {
        tbb.forEach(t => {
          setBookings(bookings => [...bookings, t]);
          setMessage(t.facility+" on "+format(date, "EEE dd MMM yyyy a")+" is booked");
        });
      } else {
        setMessage("Plesae answer whether it is academic and persons are less than 10.");
      }
    };
  };

  const showEmail = ({over}) => {
    if (over) {
      setMessage(over);
    } else {
      setMessage();
    }
  }

  if (monthdays.length == 2) {
    return (
      <div className="grid grid-cols-2 w-[1000px] rounded-xl">
        <CalendarMonth prefixDays={prefixDays1} monthDays={monthdays[0]} startMonthDate={start} endMonthDate={endOfMonth(start)} suffixDays={suffixDays1} bookings={bookings} facilities={facilities} handleClickDateType={handleClickDate1} handleMouseType={showEmail} />
        <CalendarMonth prefixDays={prefixDays2} monthDays={monthdays[1]} startMonthDate={startOfMonth(addDays(endOfMonth(start),1))} endMonthDate={subDays(endDate,1)} suffixDays={suffixDays2} bookings={bookings} facilities={facilities} handleClickDateType={handleClickDate2} handleMouseType={showEmail} />
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 w-[500px] rounded-xl">
        <CalendarMonth prefixDays={prefixDays1} monthDays={monthdays[0]} startMonthDate={start} endMonthDate={endOfMonth(start)} suffixDays={suffixDays1} bookings={bookings} facilities={facilities} handleClickDateType={handleClickDate1} handleMouseType={showEmail} />
      </div>
    );
  }
};

export default Calendar;
