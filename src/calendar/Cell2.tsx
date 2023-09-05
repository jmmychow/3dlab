import clsx from "clsx";

type bookingProp = {
  bookings: { _id:String, date:String, email:String, facility:String };
}

interface Props extends React.PropsWithChildren {
  className?: string;
  bookedAM?: [bookingProp["bookings"]];
  bookedPM?: [bookingProp["bookings"]];
  onClick?: (index:number) => void;
  onMouse?: (over:String) => void;
}

const Cell2: React.FC<Props> = ({onClick, onMouse, children, className, bookedAM, bookedPM}) => {
  return (
    <div className={clsx("grid grid-row-2 grid-flow-col gap-2", className)}>
          <div className="h-10 row-span-2 font-bold flex items-center justify-center select-none transition-colors">
            {children}
          </div>
          <div
            onClick={(onClick && children ? (e) => onClick(children) : undefined)}
            className={clsx(
              "flex items-center justify-center select-none transition-colors w-7 h-5",
              {
                "cursor-pointer hover:bg-gray-100 hover:text-black active:bg-gray-200" :
                  (bookedAM ? bookedAM.length < 1 : false),
                "text-white bg-blue-900 hover:bg-blue-700" : 
                  (bookedAM ? bookedAM.length > 0 && bookedAM[0].email == "right@hksyu.edu" : false),
                "text-white bg-red-900 hover:bg-red-700" : 
                  (bookedAM ? bookedAM.length > 0 && bookedAM[0].email != "right@hksyu.edu" : false),
              }
            )}
            onMouseOver={(onMouse && children && bookedAM && bookedAM.length > 0 ? () => onMouse(bookedAM[0].email) : undefined)}
            onMouseOut={(onMouse  && children && bookedAM && bookedAM.length == 0 ? () => onMouse() : undefined)}
          >
            {(children ? "am": "")}
          </div>
          <div
            onClick={(onClick && children ? (e) => onClick(children+0.5) : undefined)}
            className={clsx(
              "flex items-center justify-center select-none transition-colors w-7 h-5",
              {
                "cursor-pointer hover:bg-gray-100 hover:text-black active:bg-gray-200":
                  (bookedPM ? bookedPM.length < 1 : false),
                "text-white bg-blue-900 hover:bg-blue-700": 
                  (bookedAM ? bookedPM.length > 0 && bookedPM[0].email == "right@hksyu.edu" : false),
                "text-white bg-red-900 hover:bg-red-700": 
                  (bookedAM ? bookedPM.length > 0 && bookedPM[0].email != "right@hksyu.edu" : false),
              }
            )}
            onMouseOver={(onMouse && children && bookedAM && bookedAM.length > 0 ? () => onMouse(bookedAM[0].email) : undefined)}
            onMouseOut={(onMouse  && children && bookedAM && bookedAM.length == 0 ? () => onMouse() : undefined)}
          >
            {(children ? "pm" : "")}
          </div>
    </div>
  );
};

export default Cell2;
