'use client'

import { Html, OrbitControls, useProgress } from '@react-three/drei'
// import Image from 'next/image'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

type HomePortraitProps = React.ComponentProps<'div'>

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function Cube() {
  const ref = useRef(null)

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.z += delta * 2
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 2
  })

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color='red' />
    </mesh>
  )
}

function RubikCube() {
  const ref = useRef(null)

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 3
    ref.current.rotation.z += delta / 2
    ref.current.position.y = (Math.sin(state.clock.elapsedTime) * 2) / 2
  })

  const gltf = useLoader(GLTFLoader, '/3D/rubik-cube.gltf')

  return (
    <mesh ref={ref}>
      <primitive object={gltf.scene} scale={0.8} />
      {/* <meshStandardMaterial color='red' /> */}
    </mesh>
  )
}

export default function HomePortrait({ className }: HomePortraitProps) {
  return (
    <div
      className={twMerge(
        [
          'flex justify-center rounded-50',
          'h-[33.75rem] w-[33.75rem] overflow-hidden',
          'after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0',
          // 'after:pointer-events-none after:z-10 after:bg-radial-gradient',
          'after:pointer-events-none after:z-10',
        ],
        className
      )}
    >
      {/* <div
        className={twMerge([
          'relative mt-[5.375rem] h-[21.5rem] w-72',
          'bg-onyx rotate-inverted-y',
        ])}
      >
        <Image
          className='block object-cover object-[55%_22%]'
          src='/assets/felipe_1.jpg'
          alt='Felipe Mateus'
          priority
          fill
        />
      </div> */}
      <Canvas className='h-full w-full'>
        <directionalLight position={[0, 0, 2]} />
        <ambientLight intensity={0.4} />

        {/* <Cube /> */}
        <Suspense fallback={<Loader />}>
          <RubikCube />
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
