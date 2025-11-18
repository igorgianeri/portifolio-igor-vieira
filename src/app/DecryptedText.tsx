'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view' | 'none';
  revealDirection?: 'left' | 'right' | 'center';
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 30,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  revealDirection = 'left',
}: Props) {
  const [display, setDisplay] = useState<string>(text.replace(/./g, ' '));
  const [running, setRunning] = useState(false);
  const ranOnce = useRef(false);
  const elRef = useRef<HTMLSpanElement | null>(null);

  const randomChar = () => characters[Math.floor(Math.random() * characters.length)];

  const reveal = (once = false) => {
    if (running) return;
    if (once && ranOnce.current) return;
    setRunning(true);
    let iter = 0;
    const len = text.length;
    const target = text.split('');
    const current = Array.from({ length: len }, () => randomChar());
    const interval = setInterval(() => {
      iter++;
      // compute progress
      const progress = Math.min(1, iter / maxIterations);
      // depending on direction, reveal positions
      for (let i = 0; i < len; i++) {
        let revealProb = progress;
        if (revealDirection === 'center') {
          const center = len / 2;
          const dist = Math.abs(i - center);
          revealProb = Math.max(0, progress - dist / len);
        } else if (revealDirection === 'right') {
          revealProb = Math.max(0, progress - (len - i) / len + 0.1);
        } // left default ok
        if (Math.random() < revealProb) current[i] = target[i];
        else current[i] = randomChar();
      }
      setDisplay(current.join(''));
      if (iter >= maxIterations) {
        clearInterval(interval);
        setDisplay(text);
        setRunning(false);
        ranOnce.current = true;
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(true);
              obs.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      if (elRef.current) obs.observe(elRef.current);
      return () => obs.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={elRef}
      className={`${parentClassName} ${className} ${encryptedClassName}`}
      onMouseEnter={() => { if (animateOn === 'hover') reveal(false); }}
      onClick={() => { if (animateOn === 'none') reveal(false); }}
      style={{ whiteSpace: 'pre' }}
    >
      {display}
    </span>
  );
}