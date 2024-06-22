"use client";

import { AnimatePresence, Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Image from "next/image";
import { TrueGift } from "./TrueGift";

export const LandingPage: React.FC = () => {
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [hideAll, setHideAll] = useState(false);
  const [showTrueGift, setShowTrueGift] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowText1(true), 500),
      setTimeout(() => (setShowText2(true), setShowText1(false)), 2000),
      setTimeout(() => (setShowHeart(true), setShowText2(false)), 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleClick = () => {
    setIsBlurred(false);
    setHideAll(true);
    setTimeout(() => {
      setShowTrueGift(true), setShowFireworks(true);
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const heartVariants: Variants = {
    initial: { scale: 1 },
    beat: {
      scale: [1, 1.05, 1.1, 1.05, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  const AnimatedText = ({
    text,
    className,
  }: {
    text: string;
    className?: string;
  }) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`text-shadow-glow ${className}`}
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
  );

  if (showTrueGift) {
    return <TrueGift showFireworks={showFireworks} />;
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="relative top-0 left-0 w-full h-full flex justify-center items-center">
        <Image src="/yay.gif" width={800} height={800} alt="Image" />
        <motion.div
          className="absolute inset-0 backdrop-filter backdrop-blur-sm"
          animate={{ opacity: isBlurred ? 1 : 0 }}
          transition={{ duration: 3 }}
        ></motion.div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <AnimatePresence>
          {!hideAll && showText1 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <AnimatedText
                text="Hey bae!"
                className="text-center text-4xl font-bold text-pink-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!hideAll && showText2 && (
            <motion.div
              key="text2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <AnimatedText
                text="I have a special gift for you!"
                className="text-center text-4xl font-semibold text-purple-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!hideAll && showHeart && (
            <motion.div
              key="heart"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                variants={heartVariants}
                animate="beat"
                onClick={handleClick}
                className="text-center text-6xl cursor-pointer"
              >
                ❤️{" "}
                <AnimatedText
                  text="Click me!"
                  className="text-4xl font-semibold text-500"
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <TrueGift />
    </section>
  );
};
