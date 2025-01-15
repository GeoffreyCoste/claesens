'use client';

import styles from './style.module.scss';
import {useState, useRef, useEffect} from 'react';
import {bricolage_grotesque} from '@/app/fonts';
import clsx from 'clsx';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import ButtonCopy from '../button-copy';
import Scene from './scene';

const words = [
  'd&apos;un projet',
  'd&apos;une envie',
  'd&apos;une idée',
  'd&apos;un besoin',
  'd&apos;une question',
  'd&apos;un bonjour'
];

gsap.registerPlugin(TextPlugin);

const SectionContact = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const textRef = useRef(null);
  const dotsRef = useRef([]);

  // Function to change words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length); // Move to next word
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean interval
  }, []);

  // Animation for each letter
  useEffect(() => {
    const dots = dotsRef.current;

    if (textRef.current) {
      gsap.to(textRef.current, {
        duration: 1,
        text: words[currentWordIndex],
        onComplete: () => {
          if (dots.length > 0) {
            // Animate dots after text
            dots.forEach((dot, index) => {
              gsap.fromTo(
                dot,
                {scale: 0},
                {
                  scale: 1.5,
                  duration: 1,
                  delay: index * 0.3, // Delay for each dot
                  yoyo: true, // Return to initial state
                  repeat: 1, // Repeate once for "pop" effect
                  ease: 'power2.inOut'
                }
              );
            });
          }
        }
      });
    }
  }, [currentWordIndex]);

  return (
    <section className={styles.section_contact}>
      <div className={styles.section_contact_overlay}>
        <div className={styles.section_contact_heading}>
          <h1
            className={clsx(bricolage_grotesque.className, styles.heading)}
            aria-label="Envie d'échanger autour d'un projet / une idée / un besoin / une envie / une question / un bonjour ?"
          >
            Envie d&apos;échanger autour
            <div className={styles.badge}>
              <div ref={textRef} className={styles.badge_label}>
                d&apos;un projet
              </div>
            </div>
          </h1>
        </div>
        <div className={styles.section_contact_subheading}>
          <div className={styles.dots_pulse}>
            {Array.from({length: 3}).map((_, index) => (
              <div
                key={`pulsing-dot-${index}`}
                ref={(el) => {
                  dotsRef.current[index] = el;
                }}
                className={styles.dot}
              ></div>
            ))}
          </div>
          <h2
            className={clsx(bricolage_grotesque.className, styles.subheading)}
            aria-label="Un email, et c'est parti !"
          >
            <span>un email,</span>
            <br />
            <span>et c&apos;est parti !</span>
          </h2>
          <div className={styles.button_custom}>
            <ButtonCopy btnLarge={true} />
          </div>
        </div>
      </div>
      <div className={styles.section_contact_canvas}>
        <Scene />
      </div>
    </section>
  );
};

export default SectionContact;
