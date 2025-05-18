'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeParallax() {
  const leftMountainRef = useRef(null);
  const rightMountainRef = useRef(null);
  const leftTreeRef = useRef(null);
  const rightTreeRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const text2Ref = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Function chạy animation entry
  const runEntryAnimation = () => {
    const entryTL = gsap.timeline();

    entryTL
      .from(leftTreeRef.current, {
        x: -200,
        y: -200,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, 0)
      .from(rightTreeRef.current, {
        x: 200,
        y: -200,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, 0)
      .from(leftMountainRef.current, {
        x: -200,
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, 0.1)
      .from(rightMountainRef.current, {
        x: 200,
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, 0.1)
      .from(logoRef.current, {
        scale: 2,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      }, 0.2);
  };

  // Fake loading 2s rồi bật entry animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
      runEntryAnimation();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Scroll animation timeline (không thay đổi)
  useEffect(() => {
    if (!isLoaded) return; // chỉ chạy khi đã load xong

    const tl = gsap.timeline({
      scrollTrigger: {
        start: "top top",
        end: "+=400",
        scrub: true,
      },
    });

    tl.to(leftTreeRef.current, { x: -100,y:-100 }, 0)
      .to(logoRef.current, { y: 200, opacity: 0 }, 0)
      .to(leftMountainRef.current, { x: -200 }, 0)
      .to(rightMountainRef.current, { x: 50 }, 0)
      .to(rightTreeRef.current, { x: 60 }, 0)
      .to(textRef.current, { scale:0 }, 0)
      .to(text2Ref.current, { y:-100 }, 0);
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <h2 className="text-2xl font-bold animate-pulse">Loading...</h2>
        </div>
      )}

      <div className='h-[2000px]'>
        <div className="relative h-[700px] w-full max-w-[1400px] mx-auto bg-sky-100 overflow-hidden">
          {/* Background nền */}
          <div className="absolute inset-0 z-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/zenchain/bg.png`}
              alt="Background"
              fill
              className="object-cover w-full h-full"
            />
          </div>

          {/* Núi trái dưới */}
          <div
            ref={leftMountainRef}
            className="absolute bottom-0 left-0 w-1/2 max-w-[300px] z-10 blur-[2px]"
          >
            <Image
              src="/zenchain/mountainright.png"
              alt="Left Mountain"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>

          {/* Núi phải dưới */}
          <div
            ref={rightMountainRef}
            className="absolute bottom-0 right-0 w-1/2 max-w-[150px] z-10 blur-[2px]"
          >
            <Image
              src="/zenchain/mountainleft.png"
              alt="Right Mountain"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>

          {/* Cây trái trên */}
          <div
            ref={leftTreeRef}
            className="absolute top-[-4px] left-[-4px] w-1/3 max-w-[700px] z-20"
          >
            <Image
              src="/zenchain/cayphai.png"
              alt="Left Tree"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>

          {/* Cây phải trên */}
          <div
            ref={rightTreeRef}
            className="absolute top-0 right-0 w-1/4 max-w-[500px] z-20"
          >
            <Image
              src="/zenchain/caytrai.png"
              alt="Right Tree"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>

          {/* Logo cổng trời ở giữa */}
          <div
            ref={logoRef}
            className="absolute bottom-[-10px] left-1/2 w-1/3 max-w-[500px] -translate-x-1/2 z-30"
          >
            <Image
              src="/zenchain/logo1.png"
              alt="Torii Gate"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <div
            ref={textRef}
            className="absolute top-1/4 left-1/2  -translate-x-1/2 tracking-[0.2em] z-30"
          >
            <h1 className='uppercase text-[120px] font-bold '>Zenchain</h1>
          </div>
          <div
            ref={text2Ref}
            className="absolute -bottom-[100px] left-1/2  -translate-x-1/2 tracking-[0.2em] z-30"
          >
            <h1 className='uppercase text-[60px] font-bold '>Article contest</h1>
          </div>
        </div>
      </div>
    </>
  );
}
