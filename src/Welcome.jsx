export default function Welcome() {
    return (
        <div id="welcome-div" className="font-sans text-base font-normal overflow-auto h-5/6 tracking-normal leading-normal" onClick={(e)=>e.stopPropagation()}>
            <div className="text-3xl font-bold tracking-wider"><a className="hover:text-orange-500 text-orange-500">VIRTUAL REALITY</a> LABORATORY</div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <div className="text-3xl font-bold">Who we are</div>
            <p>&nbsp;</p>
            <p>The primary objective of the Virtual Reality Laboratory (VR Lab) is to support research endeavours, facilitate learning and teaching initiatives, and promote various university-wide engagements. The establishment of the VR Lab aligns closely with HKSYU's overarching strategic and academic development plans, thereby propelling the realms of applied digital humanities and social sciences to unprecedented heights. By seamlessly integrating the University's liberal arts, digital humanities, and cutting-edge technological advancements, the VR Lab fosters a conducive environment for collaborative projects among academia, students, local society, and industries. The key areas of focus encompass the following:</p>
            <p>&nbsp;</p>
            <div className="grid grid-cols-12 gap-8 list-decimal">
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">Collaborative Research Activities</div>The VR Lab actively encourages and facilitates collaborative research endeavours, fostering interdisciplinary investigations and knowledge exchange among scholars, researchers and professionals.</div>
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">Learning and Teaching Activities</div>With a strong emphasis on educational pursuits, the VR Lab supports innovative learning and teaching methodologies by leveraging virtual reality technologies, thereby enhancing the educational experience for students.</div>
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">University-wide Activities</div>The VR Lab serves as a central hub for various university-wide activities, including workshops, seminars, and conferences, fostering a vibrant intellectual community and promoting cross-disciplinary interactions among faculty, students, and external stakeholders.</div>
            </div>
            <p>&nbsp;</p>
            <p>We eagerly anticipate the opportunity to engage in fruitful discussions regarding potential collaborations with your department/organization.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <div className="text-3xl font-bold">What we have</div>
            <p>&nbsp;</p>
            <p>The VR Lab is equipped with a comprehensive array of cutting-edge technological resources to support its research and development endeavours. These resources include:</p>
            <p>&nbsp;</p>
            <div className="grid grid-cols-12 gap-8 list-decimal">
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">Cave Automatic Virtual Environment (CAVE)</div>It is a cutting-edge technology that creates a fully immersive virtual reality experience by projecting high-resolution graphics onto multiple walls and floors of a specially designed room, allowing users to interact with virtual environments in a three-dimensional space.</div>
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">High-speed PC Workstations</div>Our VR Lab is equipped with six high-speed PC workstations that are specifically tailored for immersive experience development. These advanced workstations are equipped with powerful 3D/Game engines such as Unity Engine, Unreal Engine, and Blender, enabling us to create and design immersive experiences for a wide range of applications and purposes.</div>
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">Seminar/Workshop Space</div>The VR Lab encompasses a dedicated seminar/workshop space furnished with an overhead projector and a sound system, providing a versatile environment conducive to a multitude of learning and teaching activities. This well-equipped space enables the facilitation of engaging seminars and workshops, fostering an interactive and immersive educational experience for participants.</div>
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">Photogrammetry Technology</div>The VR Lab provides specialized consultancy services pertaining to photogrammetry, a technique employed to digitize physical objects with utmost precision for computer-based representation. Photogrammetry serves as a valuable tool for creating detailed and accurate digital models of various real-life objects, encompassing organic forms, intricate mechanical components, and architectural structures. Through its photogrammetry consultancy, the VR Lab offers expertise and guidance in harnessing this technology to achieve optimal outcomes in the realm of digital modelling and preservation.</div>
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">WebGL Technology</div>The VR Lab offers expert consultancy services in the domain of WebGL technology, enabling the transformation of VR environments developed using Unity Engine into web-accessible applications. This technology is particularly suited for web-enabled experiences such as virtual tours, virtual museums, and lightweight games.</div>
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">Virtual Asset Library</div>The VR Lab encompasses a comprehensive Virtual Asset Library that houses a wide range of valuable digital resources. These assets include digital models, 360 videos, and photos, which are readily available for download.</div>
            <li className="ml-8"></li><div className="col-span-11"><div className="font-bold">Other VR/AR Devices</div>Within the VR Lab, an assortment of diverse portable VR/AR devices is made available, including VR headsets, wearable computers, 3D glasses, and other similar technologies. These devices serve as valuable tools for research and development endeavours, allowing for the exploration, experimentation, and advancement of virtual and augmented reality applications within the academic context.</div>
            </div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>They will be pleased to assist you and address any queries or collaboration opportunities you may have.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <div className="text-3xl font-bold">How to book</div>
            <p>&nbsp;</p>
            <p>Booking procedures for the VR Lab follow a first-come, first-served basis, without the requirement for prior approval or subsequent confirmation. The lab operates on a two-session framework, namely the AM and PM sessions, available every working day from Monday to Friday, excluding public holidays.</p>
            <p>&nbsp;</p>
            <p>The AM session spans from 10:00 to 13:00, while the PM session ranges from 14:00 to 17:00. The booking process is streamlined, requiring a single click to reserve a slot and another click to cancel if necessary.</p>
            <p>&nbsp;</p>
            <p>Bookings can be made within a one-month timeframe starting from the present date. It is important to note that bookings, along with associated contact information, are openly accessible for viewing. In the event of scheduling conflicts, users are expected to independently resolve such clashes to ensure the smooth operation of the VR Lab.</p>
        </div>
    );
}