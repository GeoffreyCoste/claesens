import styles from './style.module.scss';
import {useState, useRef, useEffect, useCallback} from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import {menuButtons} from './data';
import MenuButton from './menu-button';

const Collapsible = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const collapsibleRef = useRef(null);
  const btnToggleRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonsRef = useRef([]);
  const animRef = useRef(null);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = useCallback(
    (event) => {
      const menu = menuRef.current;
      if (isMenuOpen && menu && !menu.contains(event.target)) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen, menuRef]
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', closeMenu);
      return () => {
        document.removeEventListener('click', closeMenu);
      };
    }
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    const collapsible = collapsibleRef.current;
    const btnToggle = btnToggleRef.current;
    const menu = menuRef.current;
    const menuButtons = menuButtonsRef.current;

    if (!collapsible || !btnToggle || !menu || !menuButtons) return;

    // Initial menu state (hidden)
    gsap.set(menu, {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#fce300',
      border: '1px solid #fce300',
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: -1
    });

    animRef.current = gsap
      .timeline({paused: true})
      .to(menu, {
        zIndex: 4,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(collapsible, {
        filter: 'url(#blur)',
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(
        menu,
        {
          width: '100%',
          height: '185px',
          top: '85px',
          ease: 'power2.out'
        },
        '<'
      )
      .to(
        menu,
        {
          borderRadius: '10px',
          duration: 0.3,
          ease: 'power2.out'
        },
        '-=0.2'
      )
      .to(collapsible, {
        filter: 'none',
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(menu, {
        backgroundColor: '#1e1e1e',
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(
        menuButtons,
        {
          opacity: 1,
          transform: 'translateY(0)',
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '>'
      );

    return () => {
      animRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      animRef.current.play();
    } else {
      animRef.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div ref={collapsibleRef} className={styles.collapsible}>
      <button
        ref={btnToggleRef}
        className={clsx(styles.button, {[styles.active]: isMenuOpen})}
        onClick={toggleIsMenuOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setIsMenuOpen((prev) => !prev);
        }}
        aria-expanded={isMenuOpen}
      >
        <div className={styles.button_round}></div>
        <p className={styles.button_title}>hello@claesens.fr</p>
        <div className={styles.button_arrow}>
          <span></span>
          <span></span>
        </div>
      </button>

      <div ref={menuRef} className={styles.menu}>
        {menuButtons.map((btn, i) => (
          <MenuButton
            key={`btn-menu-${i}`}
            title={btn.title}
            icon={btn.icon}
            action={btn.action}
            ref={(el) => (menuButtonsRef.current[i] = el)}
          />
        ))}
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="blur">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Collapsible;
