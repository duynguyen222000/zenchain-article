'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ZenChainArticle from '@/components/ArticleContest';

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

    tl.to(leftTreeRef.current, { x: -100, y: -100 }, 0)
      .to(logoRef.current, { y: 200, opacity: 0 }, 0)
      .to(leftMountainRef.current, { x: -200 }, 0)
      .to(rightMountainRef.current, { x: 50 }, 0)
      .to(rightTreeRef.current, { x: 60 }, 0)
      .to(textRef.current, { scale: 0 }, 0)
      .to(text2Ref.current, { y: -100 }, 0);
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <h2 className="text-2xl text-black font-bold animate-pulse">Loading Zenchain Article...</h2>
        </div>
      )}

      <div className=' w-full max-w-[1400px] mx-auto px-4'>
        <div
          className="fixed inset-0 -z-10 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url('https://zenbridge.zenchain.io/images/bg-dark.svg')",
          }}
        />
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full bg-sky-100 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={`/zenchain-article/zenchain/bg.png`}
              alt="Background"
              fill
              className="object-cover w-full h-full"
            />
          </div>

          {/* Núi trái dưới */}
          <div
            ref={leftMountainRef}
            className="absolute bottom-0 left-0 w-1/2 max-w-[20%] z-10 blur-[2px] 
               sm:max-w-[30%] md:max-w-[25%] lg:max-w-[20%]"
          >
            <Image
              src="/zenchain-article/zenchain/mountainright.png"
              alt="Left Mountain"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>

          {/* Núi phải dưới */}
          <div
            ref={rightMountainRef}
            className="absolute bottom-0 right-0 w-1/2 max-w-[150px] z-10 blur-[2px]
               sm:max-w-[200px] md:max-w-[180px] lg:max-w-[150px]"
          >
            <Image
              src="/zenchain-article/zenchain/mountainleft.png"
              alt="Right Mountain"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>

          {/* Cây trái trên */}
          <div
            ref={leftTreeRef}
            className="absolute top-[-4px] left-[-4px] w-1/3 max-w-[700px] z-20
               sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]"
          >
            <Image
              src="/zenchain-article/zenchain/cayphai.png"
              alt="Left Tree"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>

          {/* Cây phải trên */}
          <div
            ref={rightTreeRef}
            className="absolute top-0 right-0 w-1/4 max-w-[500px] z-20
               sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]"
          >
            <Image
              src="/zenchain-article/zenchain/caytrai.png"
              alt="Right Tree"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>

          {/* Logo cổng trời ở giữa */}
          <div
            ref={logoRef}
            className="absolute bottom-[-10px] left-1/2 w-1/3 max-w-[500px] -translate-x-1/2 z-30
               sm:max-w-[500px] md:max-w-[450px] lg:max-w-[500px]"
          >
            <Image
              src="/zenchain-article/zenchain/logo1.png"
              alt="Torii Gate"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>

          {/* Text Zenchain */}
          <div
            ref={textRef}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30
               text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] uppercase font-bold tracking-[0.2em]"
          >
            Zenchain
          </div>

          {/* Text Article contest */}
          <div
            ref={text2Ref}
            className="absolute -bottom-[100px] left-0 w-full text-center z-40
               text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] uppercase font-bold"
          >
            Article contest
          </div>

          {/* Gradient mask */}
          <div className="absolute bottom-0 left-0 w-full h-32 z-30 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </div>
        </div>

        <ZenChainArticle />

      </div>
    </>
  );
}
