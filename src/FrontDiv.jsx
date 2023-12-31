import React, { useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import videojs from 'video.js';
import VideoJS from './VideoJS';
import PannellumReact from './PannellumReact';
import Booking from './Booking';
import Welcome from './Welcome';
import assets from './assets.json';
import bk from './bookings.json';
import session from './session.json';

function HeaderDiv({dismiss}) {
    //const options = [ 'VIRTUAL REALITY LABORATORY', 'FACILITY BOOKING SYSTEM', 'ASSET LIBRARY' ];

    return (
        <div id="header-div" className="frame">
            {/*<div className="logo flex flex-nowrap text-3xl font-bold text-blue-700 tracking-tighter">The &nbsp;Earth&nbsp; University</div>*/}
            <div className="topui -mt-8 font-bold flex flex-nowrap text-3xl btn-inactive bg-neutral bg-opacity-0 text-orange-500">&nbsp;&nbsp;VIRTUAL REALITY<div className="text-white">&nbsp;&nbsp;LABORATORY</div>&nbsp;&nbsp;</div>
            <DismissDiv dismiss={dismiss} />
            {/*<div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn btn-ghost btn-xs bg-neutral bg-opacity-0 text-orange-500 tracking-wider">&nbsp;&nbsp;VIRTUAL REALITY <div className="text-white">LABORATORY</div>&nbsp;&nbsp;</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu rounded-box bg-opacity-30">
                    {options.map((a,i) => (i>0 ? <li className="btn btn-ghost btn-xs bg-neutral bg-opacity-0 m-1 tracking-wider whitespace-nowrap" onClick={(e)=>{setContent(i);e.stopPropagation();}}>{a}</li> : <></>))}
                </ul>
            </div>*/}
        </div>
    );
}

function DismissDiv({dismiss}) {
    return (
        dismiss ? <div className="btn mt-[3rem] btn-sm">Dismiss</div> : <></>
    )
}

function FacilityList({facilities, setFacilities}) {
    const selectables = [ "C A V E", "Workstation 1", "Workstation 2", "Workstation 3", "Workstation 4", "Workstation 5", "Workstation 6" ];
    const selectableList = [];

    selectables.forEach((element,i) => {
        let f = facilities;
        if (f.includes(element)) {
            selectableList.push(<li key={i} className="btn m-0.5 bg-orange-500 bg-opacity-90 hover:bg-orange-500 hover:bg-opacity-100 text-black border-none btn-active" onClick={(e) => {setFacilities(f.filter(b => b!=element));e.stopPropagation();}}>{element}</li>);
        } else {
//            selectableList.push(<li key={i} className="btn m-0.5 btn-ghost bg-opacity-30" onClick={() => setFacilities(f.concat([element]))}>{element}</li>);
            selectableList.push(<li key={i} className="btn m-0.5 btn-ghost bg-opacity-30" onClick={(e)=>{setFacilities([element]);e.stopPropagation();}}>{element}</li>);
        };
    });

    const isDesktop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

    return (
        isDesktop ? (
            <ul className="mt-8 menu menu-horizontal bg-opacity-30">
                { selectableList }
            </ul>
            ) : isTablet ? (
                    <>
                        <ul className="mt-8 menu menu-horizontal bg-opacity-30">
                            { selectableList.slice(0,4) }
                        </ul><br></br>
                        <ul className="menu menu-horizontal bg-opacity-30">
                            { selectableList.slice(4) }
                        </ul>
                    </>
                ) : (
                    <>
                        <ul className="mt-8 menu menu-horizontal bg-opacity-30">
                            { selectableList.slice(0,1) }
                        </ul><br></br>
                        <ul className="menu menu-horizontal bg-opacity-30">
                            { selectableList.slice(1,4) }
                        </ul><br></br>
                        <ul className="menu menu-horizontal bg-opacity-30">
                            { selectableList.slice(4) }
                        </ul>
                    </>
                )
    );
}

function AcademicNPersons({academic, setAcademic, personsLess10, setPersonsLess10}) {
    const titleStyle = "btn m-0.5 bg-opacity-0 hover:bg-opacity-0 border-none btn-inactive text-white text-base";
    const buttonOnStyle = "btn m-0.5 bg-orange-500 bg-opacity-90 hover:bg-orange-500 hover:bg-opacity-100 text-black border-none btn-active";
    const buttonOffStyle = "btn m-0.5 btn-ghost bg-opacity-30";

    return (
        useMediaQuery({ minWidth: 992 }) ? (
            <div className="flex flex-row justify-center">
                <div className="menu menu-horizontal bg-opacity-30">
                    <li className={titleStyle}>Academic</li>
                    <li className={(academic == true ? buttonOnStyle : buttonOffStyle)} onClick={(e)=>{setAcademic(true);e.stopPropagation();}}>Yes</li>
                    <li className={(academic == false ? buttonOnStyle : buttonOffStyle)} onClick={(e)=>{setAcademic(false);e.stopPropagation();}}>No</li>
                </div>
                <div className="menu menu-horizontal bg-opacity-30">
                    <li className={titleStyle}>Less than 10 persons</li>
                    <li className={(personsLess10 == true ? buttonOnStyle : buttonOffStyle)} onClick={(e)=>{setPersonsLess10(true);e.stopPropagation();}}>Yes</li>
                    <li className={(personsLess10 == false ? buttonOnStyle : buttonOffStyle)} onClick={(e)=>{setPersonsLess10(false);e.stopPropagation();}}>No</li>
                </div>
            </div>
        ) : (
            <>
                <div className="flex flex-col items-center">
                    <div className="menu menu-horizontal bg-opacity-30">
                        <li className={titleStyle}>Academic</li>
                        <li className={(academic == true ? buttonOnStyle : buttonOffStyle)} onClick={(e)=>{setAcademic(true);e.stopPropagation();}}>Yes</li>
                        <li className={(academic == false ? buttonOnStyle : buttonOffStyle)} onClick={(e)=>{setAcademic(false);e.stopPropagation();}}>No</li>
                    </div>
                    <div className="menu menu-horizontal bg-opacity-30">
                        <li className={titleStyle}>Less than 10 persons</li>
                        <li className={(personsLess10 == true ? buttonOnStyle : buttonOffStyle)} onClick={(e)=>{setPersonsLess10(true);e.stopPropagation();}}>Yes</li>
                        <li className={(personsLess10 == false ? buttonOnStyle : buttonOffStyle)} onClick={(e)=>{setPersonsLess10(false);e.stopPropagation();}}>No</li>
                    </div>
                </div>
            </>
        )
    );
}

function BookingMessage({message, facilities, bookings}) {
    if (message != null) {
        return (
            <div className="mt-10"><p>{message.replace("AM","10am-1pm").replace("PM","2pm-5pm")}</p></div>
        );
    }
}

function BookingSystem({setDismiss, facilities, setFacilities, bookings, setBookings}) {
    const [message, setMessage] = useState();
    const [academic, setAcademic] = useState(null);
    const [personsLess10, setPersonsLess10] = useState(null);

    setDismiss(true);

    // check if user has already logged in
    if (session) {
        return (
            <div >
                <FacilityList facilities={facilities} setFacilities={setFacilities}/>
                <AcademicNPersons academic={academic} setAcademic={setAcademic} personsLess10={personsLess10} setPersonsLess10={setPersonsLess10} />
                <Booking facilities={facilities} academic={academic} personsLess10={personsLess10} bookings={bookings} setBookings={setBookings} setMessage={setMessage} />
                <BookingMessage message={message} facilities={facilities} bookings={bookings} />
            </div>
        );
    }
    return (
        <div>
            <Login />
        </div>
    );
}

function AssetViewer({ asset, assetType, setAsset }) {
    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true, controls: true, responsive: true, fluid: true,
        sources: [{ src: assetType ? assets[assetType][asset].src : '', type: 'video/mp4'}]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    return (
        <div className="flex flex-row justify-center">
            {( asset > 0 ? <div className="w-15 flex"><a className="m-auto btn btn-circle" onClick={(e) => {setAsset(asset-1);e.stopPropagation()}} >❮</a></div> : <div className="w-5"></div>)}
            {(assetType == "Models" ? 
                <div className="w-[55rem] place-self-center text-center">
                    <model-viewer 
                        src={assets[assetType][asset].src} 
                        ar ar-modes="webxr scene-viewer quick-look" 
                        camera-controls 
                        poster={assets[assetType][asset].poster} 
                        shadow-intensity="1" 
                        camera-orbit={assets[assetType][asset].co} 
                        field-of-view={assets[assetType][asset].fov} />
                        {assets[assetType][asset].alt}
                </div>
                :
                (assetType == "Videos" ? 
                    <div className="w-[55rem] place-self-center text-center">
                        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                        {assets[assetType][asset].alt}
                    </div>
                    :
                    (assetType == "Photos" ? 
                        <div className="w-[55rem] place-self-center text-center">
                            <PannellumReact src={assets[assetType][asset].src}/>
                            {assets[assetType][asset].alt}
                        </div> 
                    : 
                        <div></div>
                    )
                )
            )}
            {( assetType ? asset < assets[assetType].length-1 ? <div className="w-15 flex" ><a className="m-auto btn btn-circle" onClick={(e) => {setAsset(asset+1);e.stopPropagation()}}>❯</a></div> : <div className="w-5"></div> : <div></div>)}
        </div>
    );
}

function AssetGrid({ assetType, setAsset }) {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const itemStyle = "rounded flex flex-col justify-center items-center text-center hover:bg-gray-100 hover:bg-opacity-20";

    return (
        assetType == null ? <div></div> :
            <div className={
                isDesktop ? 
                    "ml-16 mr-16 h-4/5 grid grid-flow-row auto-rows-max grid-cols-8 overflow-auto gap-8"
                    : isTablet ?
                        "ml-8 mr-8 h-4/5 grid grid-flow-row auto-rows-max grid-cols-6 overflow-auto gap-8"
                        :
                        "h-4/5 grid grid-flow-row auto-rows-max grid-cols-4 overflow-auto gap-8"
                }
            >
                {assets[assetType].map((a,i) => <div key={i} id="grid-item" className={itemStyle} onClick={(e) => {setAsset(i);e.stopPropagation()}} ><img className="rounded" src={a.poster}></img>{a.alt}</div>)}
            </div>
);
}
  
function AssetTypeSelect({assetType, setAssetType, setAsset}) {
    const assetTypes = [ "Models", "Videos", "Photos" ];
    const selectableList = [];

    assetTypes.forEach((element,i) => {
        if (assetType == element) {
            selectableList.push(<li key={i} className="btn m-1 bg-orange-500 bg-opacity-90 text-black border-none btn-active" onClick={(e) => {setAssetType(element);setAsset(null);e.stopPropagation()}}>{element}</li>);
        } else {
            selectableList.push(<li key={i} className="btn m-1 btn-ghost bg-opacity-30" onClick={(e) => {setAssetType(element);setAsset(null);e.stopPropagation()}}>{element}</li>);
        };
    });
    return (
        <ul className="mt-8 menu menu-horizontal gap-8">
            { selectableList }
        </ul>
    );
}

function AssetLibrary({setDismiss}) {
    const [assetType, setAssetType] = useState("Models");
    const [asset, setAsset] = useState();

    setDismiss(true);
    return (
        <>
            <AssetTypeSelect assetType={assetType} setAssetType={setAssetType} setAsset={setAsset}/>
            {( asset==null ? 
                <AssetGrid assetType={assetType} setAsset={setAsset} />
            :
                <AssetViewer asset={asset} assetType={assetType} setAsset={setAsset}/>
            )}
        </>
    );
}

function LeaveMessage({setDismiss, setFacilities}) {
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();

    function handleSubmit() {
        if (email && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && message) {
            window.sendMessageSucceed.showModal();
        } else {
            window.sendMessageFail.showModal();
        };
    };

    setDismiss(true);

    return (
        <div className="flex flex-col justify-center text-center w-full" onClick={(e)=>e.stopPropagation()}>
            <p>&nbsp;</p>
            <div >Leave Message</div>
            <p>&nbsp;</p>
            <div className="flex justify-center">
                <input type="text" placeholder="Enter email" className="input input-bordered w-full max-w-2xl bg-opacity-30 " onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <p>&nbsp;</p>
            <div className="flex justify-center">
                <textarea type="textarea" placeholder="Type message" className="input input-bordered w-full max-w-2xl h-[20rem] bg-opacity-30" onChange={(e)=>setMessage(e.target.value)}></textarea>
            </div>
            <p>&nbsp;</p>
            <div className="flex justify-center">
                <div className="btn m-1 bg-opacity-30" onClick={()=>{setDismiss(false);handleSubmit()}}>Submit</div>
                <div className="btn m-1 bg-opacity-30" onClick={()=>{setDismiss(false);setFacilities([])}}>Cancel</div>
            </div>

            <dialog id="sendMessageSucceed" className="modal">
                <form method="dialog" className="modal-box" onClick={()=>{setDismiss(false);setFacilities([])}}>
                    <h3 className="font-bold text-lg">Thank you</h3>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={()=>{setDismiss(false);setFacilities([])}}>close</button>
                </form>
            </dialog>

            <dialog id="sendMessageFail" className="modal">
                <form method="dialog" className="modal-box bg-red-500 bg-opacity-90">
                    <h3 className="font-bold text-lg">Input invalid</h3>
                    <div className="modal-action">
                        <button className="btn">Retry</button>
                        <button className="btn" onClick={()=>{setDismiss(false);setFacilities([])}}>Close</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}

function Documentation({setDismiss, facilities}) {
    setDismiss(true);
    return (
        <div id="welcome-div" className="font-sans text-base font-normal overflow-auto h-5/6 tracking-normal leading-normal" onClick={(e)=>e.stopPropagation()}>
                {
                    (facilities[0]=="drawer" ? 
                        <>
                        <div className="text-3xl font-bold">Training Materials</div><p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <div>Introduction to Unity</div>
                        <p>&nbsp;</p>
                        <div>Getting started with VotanicXR</div>
                        </>
                    :
                        (facilities[0]=="drawer1" ? 
                            <>
                            <div className="text-3xl font-bold">Votanic References</div>
                            <p>&nbsp;</p>
                            <div>Sample scene download</div>
                            </>
                        : 
                            (facilities[0] == "drawer2" ? 
                                <>
                                <div className="text-3xl font-bold">Photogrammetry & RealityCapture</div>
                                <p>&nbsp;</p>
                                <div>
                                    <a classname="underline underline-offset-1" href="https://www.artstation.com/artwork/RyqZLr" target="_blank">Case study - Ancient tree</a>
                                </div>
                                </>
                            : 
                                <>
                                <div className="text-3xl font-bold">Technical Documentation</div>
                                <p>&nbsp;</p>
                                <div>VR Lab Website Design and Implementation</div>
                                <div>Application development strategy</div>
                                </>
                            )
                        )
                    )
                }
        </div>
    );
}

export default function FrontDiv({ content, setContent, facilities, setFacilities }) {
    const location = useLocation();
    const [dismiss, setDismiss] = useState(content!=0);
    const [bookings, setBookings] = useState(bk);

    return (
        <div id="front-div" onClick={()=>{setDismiss(false);setContent(0);setFacilities([]);}}>
            <HeaderDiv dismiss={dismiss} />
            {(content==0 ?
                (facilities.length==1 && facilities[0]=="screen" ?
                    <div id="booking-div" className="flex flex-col items-center content"  onClick={(e)=>{setFacilities([]);e.stopPropagation()}}>
                        <Welcome setDismiss={setDismiss} />
                    </div>
                    :
                    (facilities[0]=="administrator" ? 
                        <div id="booking-div" className="flex flex-col items-center content"  onClick={(e)=>e.stopPropagation()}>
                            <LeaveMessage setDismiss={setDismiss} setFacilities={setFacilities}/>
                        </div>
                    :
                        (facilities.length==1 && facilities[0].includes("drawer") ? 
                            <div id="booking-div" className="flex flex-col items-center content"  onClick={(e)=>e.stopPropagation()}>
                                <Documentation setDismiss={setDismiss} facilities={facilities} setFacilities={setFacilities} />
                            </div>
                        :
                            <div></div>
                        )
                    )
                )
            :
                <div id="booking-div" className="flex flex-col items-center content"  onClick={(e)=>{e.stopPropagation()}}>
                {(content == 1 ? 
                    <BookingSystem setDismiss={setDismiss} facilities={facilities} setFacilities={setFacilities} bookings={bookings} setBookings={setBookings}/> 
                    :
                    <AssetLibrary setDismiss={setDismiss} /> 
                )}
                </div>
            )}
    </div>
    );
}