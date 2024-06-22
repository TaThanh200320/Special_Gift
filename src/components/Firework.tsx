"use client";

import React, { useEffect, useRef } from "react";

import JSConfetti from "js-confetti";

export function Fireworks() {
  const jsConfettiRef = useRef<JSConfetti | null>(null);

  useEffect(() => {
    jsConfettiRef.current = new JSConfetti();

    const createFireworks = () => {
      if (jsConfettiRef.current) {
        jsConfettiRef.current.addConfetti({
          emojis: ["🎉", "✨", "💥", "🎆", "🌟", "❤️"],
          emojiSize: 20,
          confettiNumber: 100,
        });
      }
    };

    createFireworks();
  }, []);

  return null;
}
