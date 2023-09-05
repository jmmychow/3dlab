import { useState } from 'react';
import FrontDiv from "./FrontDiv";
import VrlabDiv from "./VrlabDiv";

export default function TopDiv() {
    const [ content, setContent ] = useState(0);
    const [ facilities, setFacilities ] = useState([]);

    return (
        <>
            <FrontDiv content={content} setContent={setContent} facilities={facilities} setFacilities={setFacilities} />
            <VrlabDiv setContent={setContent} setFacilities={setFacilities} />
        </>
    );
}