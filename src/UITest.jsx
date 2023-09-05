import React, { useState } from 'react';

function UITest() {
    const options = [ { value:0, label:'VR LAB' },{ value:1, label:'BOOKING' },{ value:2, label:'ASSETS'} ];
    const optionList = [];
    const [item, setItem] = useState(options[0]);

    options.map((a) => {
        optionList.push(
            <li><a onClick={() => setItem(a)}>{a.label}</a></li>
        );
    });
    return (
        <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1 bg-neutral bg-opacity-30">{item.label}</label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-26 bg-neutral bg-opacity-30">
            {optionList}
        </ul>
        </div>
    );
}

export default UITest;