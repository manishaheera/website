import React from 'react';
import {Suspense, useEffect, useState} from 'react';
import { Canvas, useLoader} from '@react-three/fiber';
import CanvasLoader from '../Loader';
import { OrbitControls, Preload} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const Computers = ({mobile}) => {


  const model = useLoader(GLTFLoader, './desktop_pc/scene.gltf')


  return (

    <mesh>
      <hemisphereLight intensity={4.9} groundColor="black"/>
      <pointLight intensity={1} /> 
      <spotLight position ={[-20,50,10]} angle={[0.12]} penumbra={1} intensity={1}  castShadow shadow-mapSize={1024} />
      <primitive object={model.scene} scale={mobile? 0.7 : 0.75} position={mobile? [0, -3, -2.2] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]}/>
    </mesh>
  )
}

const ComputersCanvas = () => {

  const [mobile, setMobile] = useState(false);

  useEffect(()=> {
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    setMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e) => {
      setMobile(e.matches);
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
  <Canvas frameloop="demand" camera={{position:[20,3,5], fov:25}} gl={{preserveDrawingBuffer:true}}>

    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2}/> 
      <Computers mobile={mobile}/>


    </Suspense>
    <Preload all />

  </Canvas>
  )
}

export default ComputersCanvas;
