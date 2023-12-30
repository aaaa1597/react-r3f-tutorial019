import React, { useEffect, useRef } from 'react';
import './App.css';
import { Canvas, useFrame, MeshProps  } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'

const useKeyboard = () => {
  type typekeyIndexPair = {[key: string]: number }
  const keyIndexPair: typekeyIndexPair = {'KeyA': 0, 'KeyD': 1,'KeyW': 2,'KeyS': 3,}
  const keyMap = useRef<boolean[]>([false,false,false,false])
  // Object.keys(keyIndexPair).forEach((key, value) => {
  //   console.log("key=" + key, " value=" + value, " keyIndexPair[xxx]=" + keyIndexPair[key]);
  // });

  useEffect(() => {
    const onDocumentKey = (e: KeyboardEvent) => {
      keyMap.current[keyIndexPair[e.code]]! = e.type === 'keydown'
    }
    document.addEventListener('keydown', onDocumentKey)
    document.addEventListener('keyup', onDocumentKey)
    return () => {
      document.removeEventListener('keydown', onDocumentKey)
      document.removeEventListener('keyup', onDocumentKey)
    }
  }, [])

  return keyMap.current
}

const Box = (props: MeshProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  const keyMap = useKeyboard()

  useFrame((_, delta) => {
    keyMap[0/*KeyA*/] && (ref.current.position.x -=1 * delta)
    keyMap[1/*KeyD*/] && (ref.current.position.x +=1 * delta)
    keyMap[2/*KeyW*/] && (ref.current.position.z -=1 * delta)
    keyMap[3/*KeyS*/] && (ref.current.position.z +=1 * delta)
  })

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  )
}

const App = () => {
  return (
    <div style={{ width: "75vw", height: "75vh" }}>
      <Canvas camera={{ position: [3, 1, 2] }}>
        <Box position={[-0.75, 0, 0]} name="A" />
        <Box position={[0.75, 0, 0]} name="B" />
        <OrbitControls />
        <gridHelper />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </div>
  );
}

export default App;
