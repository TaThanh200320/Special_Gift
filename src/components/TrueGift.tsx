"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Fireworks } from "./Firework";
import Image from "next/image";
import SwiperCore from "swiper";
import { memories } from "@/data/memories";
import { motion } from "framer-motion";

SwiperCore.use([Navigation, Pagination, Autoplay]);

type TrueGiftProps = {
  showFireworks?: boolean;
};

export const TrueGift: React.FC<TrueGiftProps> = ({ showFireworks }) => {
  const [isMdScreen, setIsMdScreen] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showAnniversaryMessage, setShowAnniversaryMessage] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const AnimatedText = useCallback(
    ({ text, className }: { text: string; className?: string }) => (
      <motion.div
        key={animationKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`soft-glow ${className}`}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    ),
    [animationKey]
  );

  useEffect(() => {
    const startDate = new Date("2023-06-24T00:00:00");

    const updateTime = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });

      if (days === 365 && !showAnniversaryMessage) {
        setShowAnniversaryMessage(true);
        setAnimationKey((prev) => prev + 1);
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [showAnniversaryMessage]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="w-full">
      <div className="w-full text-white pb-4">
        <h2 className="text-center text-2xl font-bold mb-2">
          We&apos;ve been together
        </h2>
        <div className="text-center text-xl italic">
          {timeElapsed.days} days, {timeElapsed.hours} hours,{" "}
          {timeElapsed.minutes} minutes, {timeElapsed.seconds} seconds
        </div>
        {showAnniversaryMessage && (
          <div className="text-center mt-4 text-xl font-bold text-white">
            <div>🥳🥳🥳</div>
            <AnimatedText
              text="Greetings on our one-year anniversary!!!"
              className="text-2xl px-3 font-bold text-pink-500"
            />
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <Swiper
          className="h-[100vh] w-full md:w-1/2"
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Autoplay, Pagination, Navigation]}
          style={isMdScreen ? { width: "50%" } : { width: "100%" }}
          speed={500}
          pagination={{
            bulletClass: "swiper-pagination-bullet",
            clickable: true,
          }}
          loop={true}
          autoplay={true}
        >
          {memories.map((data, index) => (
            <SwiperSlide key={"memories" + index}>
              <Image
                src={data.src}
                width={600}
                height={800}
                alt="Image"
                className="h-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {showFireworks && <Fireworks />}
      </div>
    </section>
  );
};
