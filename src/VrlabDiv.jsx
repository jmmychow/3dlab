import * as THREE from 'three';
import React, { useRef, useEffect, useState, Suspense } from 'react';
//import parse from 'html-react-parser';
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Html, ScrollControls, useScroll, useGLTF, useAnimations } from "@react-three/drei";
import { Selection, Select, EffectComposer, Bloom, Outline, Vignette, BrightnessContrast, HueSaturation } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, BlendFunction } from 'postprocessing';
import { getProject, val } from "@theatre/core";
import theatreState from "./theatreState.json";
import { SheetProvider, PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import { LoadingScreen } from "./LoadingScreen";

const selectables = [ 
  "C_A_V_E", "Workstation_1", "Workstation_2", "Workstation_3", "Workstation_4", "Workstation_5", "Workstation_6",
  "rack001", "rack002", 
  "screen", "administrator", 
  "drawer", "drawer1", "drawer2", "drawer3",
  "textPlate", "textPlate001", "textPlate002", "textPlate003", "textPlate004", "textPlate005", "textPlate006", "textPlate007", "textPlate008"
  ];
let sheet;

function ClickableMesh({props, node, setContent, setFacilities, setSelected}) {
  const [hovered, hover] = useState(null);

  function handleOver(name) {
    const n = parseInt(name.substring(11,12));
    if (n) {
      if (n < 7) {
        setSelected("Workstation "+String(n));
      } else if (n == 7) {
        setSelected("Floor");
      } else if (n == 8) {
        setSelected("Seat");
      }
    } else {
      setSelected("C A V E");
    }
  }

  if (node.name.substring(0,9) == "textPlate") {
    return (
      <mesh {...props}
        name={node.name} 
        visible={true} 
        scale={node.scale} 
        position={node.position} 
        quaternion={node.quaternion} 
        geometry={node.geometry} 
        material={node.material} 
        onPointerOver={(e) => {handleOver(node.name);e.stopPropagation();}}
        onPointerOut={() => setSelected(null)}
      />
    );
  } else {
    return (
      <Select enabled={hovered}>
        <mesh {...props}
          name={node.name} 
          visible={true} 
          scale={node.scale} 
          position={node.position} 
          quaternion={node.quaternion} 
          geometry={node.geometry} 
          material={node.material} 
          onClick={(e) => {clickObject(e, setContent, setFacilities);e.stopPropagation();}} 
          onPointerOver={(e) => {hover(true);e.stopPropagation();}}
          onPointerOut={() => hover(false)}
        />
      </Select>
    );
  }
}

const Model = ( {setContent, selected, setSelected, setFacilities } ) => {
  const { scene, animations, nodes } = useGLTF('vrlab-v1.glb');
  const { actions } = useAnimations( animations, scene );
  const annotations = [];
  
  console.log(scene);

  const video = document.getElementById('earthVideo');
  video.play();
  const earthTexture = new THREE.VideoTexture( video );
  const earthMaterial = new THREE.MeshBasicMaterial({color:0xaaaaaa, map:earthTexture});

  useEffect(() => {
    actions.earthAction.play();
  }, [actions]);

  scene.traverse((o) => {
    if (o.name == "earth") {
      o.material = earthMaterial;
    }
    if (o.name == "C_A_V_E") {
      o.material = new THREE.MeshBasicMaterial({color:0x00000});
    }
    if (selectables.includes(o.name)) {
      o.visible = false;
    }
    if (o.isMesh) {
      o.material.dithering = true;
    }
    if (o.userData.prop) {
      if (selected && selected == o.userData.prop) {
        annotations.push(
          <Html
            position={[o.position.x-0.3, o.position.y, o.position.z]}
            distanceFactor={12}
            zIndexRange={[5,0]}
            occlude={true}>
            <div className="annotation1">
            { (o.userData.prop1 ? o.userData.prop1 : "") }<br></br>
            { (o.userData.prop2 ? o.userData.prop2 : "") }<br></br>
            { (o.userData.prop3 ? o.userData.prop3 : "") }
            </div>
          </Html>
        );
      };
    };
  });

  return (
    <group>
      {selectables.map((n,i) => <ClickableMesh key={i} node={nodes[n]} setContent={setContent} setFacilities={setFacilities} setSelected={setSelected} /> )}
      <primitive object={scene} onClick={(e) => clickObject(e, setContent, setFacilities)} >
        {annotations}
      </primitive>
    </group>
  );
};

function Scene({ forward, backward, setBackward, setContent, setFacilities }) {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const { gl, scene, camera, size } = useThree();

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    if (forward == backward) {
      if (forward) {
        scroll.offset = scroll.scroll.current =  scroll.el.scrollTop = 0;
      } else {
        scroll.offset = scroll.scroll.current = 1;
        scroll.el.scrollTop = scroll.el.scrollHeight;
      }
      setBackward(!backward);
    } else {
      // update the "position" of the playhead in the sequence, as a fraction of its whole length
      const newOffset = ( forward ?  scroll.offset : 1-scroll.offset );
      sheet.sequence.position = newOffset * sequenceLength;
    }
    //earthRef.current.rotation.y -= 0.007;
  },1);

  const [selected, setSelected] = useState();

  /*const bloader = new THREE.CubeTextureLoader();
  const textureCube = bloader.load( [
    'space_right1.png', 'space_left2.png',
    'space_top3.png', 'space_bottom4.png',
    'space_front5.png', 'space_back6.png'
  ] );
  scene.background = textureCube;*/

  //gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMapping = THREE.ReinhardToneMapping;
  gl.toneMappingExposure = 1;

  return (
    <>
      <ambientLight />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0.95, 1.34, -1.12]}
        fov={70}
        near={0.1}
        far={100} />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false} >
          <HueSaturation blendFunction={BlendFunction.NORMAL} hue={0} saturation={0.2} />
          <Outline
            edgeStrength={1}
            edgeGlow={false}
            edgeThickness={0.25}
            pulseSpeed={0.0}
            visibleEdgeColor={0xffffff}
            hiddenEdgeColor={0x22090a}
          />
          <Model setContent={setContent} selected={selected} setSelected={setSelected} setFacilities={setFacilities} />
          <Bloom luminanceThreshold={0.8} mipmapBlur luminanceSmoothing={0.0} intensity={1} />
          <BrightnessContrast
            brightness={0.03} // brightness. min: -1, max: 1
            contrast={0.1} // contrast: min -1, max: 1
          />
          <Vignette />
        </EffectComposer>
      </Selection>
      {/*<mesh ref={earthRef} position={[11,1.6,-2.2]} rotation={[0,-3,0]}>
        <sphereGeometry args={[1,48,32]} />
        <Suspense fallback={null}>
          <VideoMaterial />
        </Suspense>
      </mesh>*/}
    </>
  );
}

function VideoMaterial() {
  const [video] = useState(() => {
    const vid = document.getElementById("earthVideo");
    vid.play();
    return vid;
  });
  const videoTexture = new THREE.VideoTexture( video );
  return <meshBasicMaterial map={videoTexture} />
}

function clickObject(e, setContent, setFacilities) {
  if ( selectables.slice(0,7).includes(e.object.name) ) {
    setContent(1);
    setFacilities([e.object.name.replace(/_/g,' ')]);
  } else if (selectables.slice(7,9).includes(e.object.name)) {
    setContent(2);
    setFacilities([e.object.name]);
  } else if (selectables.slice(9,11).includes(e.object.name)) {
    setContent(0);
    setFacilities([e.object.name]);
  } else if (selectables.slice(11,15).includes(e.object.name)) {
    setContent(0);
    setFacilities([e.object.name]);
  }
  e.stopPropagation();
}

export default function VrlabDiv({ setContent, setFacilities }) {
  const [ start, setStart ] = useState(false);
  const [ forward, setForward ] = useState(true);
  const [ backward, setBackward ] = useState(false);

  sheet = getProject("VR Lab", { state: theatreState }).sheet(
    "Scene"
  );

  return (
    <>
    <div id="vrlab-div">
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls pages={5}>
          <SheetProvider sheet={sheet}>
            <Suspense fallback={null}>
              <Scene forward={forward} backward={backward} setBackward={setBackward} setContent={setContent} setFacilities={setFacilities}/>
            </Suspense>
          </SheetProvider>
        </ScrollControls>
      </Canvas>
      <LoadingScreen started={start} onStarted={() => setStart(true)}/>
    </div>
    <div className="pt-2 pr-6 flex flex-nowrap justify-end text-xs frame2">Scroll direction&nbsp;<input type="checkbox" className="toggle toggle-xs" onClick={() => setForward(!forward)} /></div>
    </>
  );
}
