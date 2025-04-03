'use client';

import styles from '../style.module.scss';
import {bricolage_grotesque} from '@/app/fonts';
import { useEffect, useRef } from "react";
import useMediaQueries from '@/hooks/useMediaQueries';
import clsx from 'clsx';
import { useScroll, useTransform, motion } from 'framer-motion';

const TextAlongPath = ({text, color, svg}) => {
    const containerRef = useRef();
    const paths = useRef([]);

    const {mobile, tablet} = useMediaQueries();

    const defaultConfig = {
        viewBox: "0 0 320 580",
        path: "M0,116.12c218.59,0,118.86,347.76,320,347.76",
        textPathIterations: 4,
        baseOffset: -42,
        spacing: 42,
        scrollFactor: 84
    };

    const config = svg ? (mobile ? svg.mobile : tablet ? svg.tablet : svg.desktop) : defaultConfig;

    const {viewBox, path, textPathIterations, baseOffset, spacing, scrollFactor} = config;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    useEffect(() => {
        const updateOffset = (e) => {
            paths.current.forEach((path, i) => {
                if (path) {
                    path.setAttribute("startOffset", `${baseOffset + (i * spacing) + (e * scrollFactor)}%`);
                }
            });
        };
    
        scrollYProgress.on("change", updateOffset);
    
        return () => {
            scrollYProgress.clearListeners("change");
        };
    }, [scrollYProgress, baseOffset, spacing, scrollFactor]);

    return (
        <motion.div ref={containerRef} className={styles.text_along_path}>
            <svg viewBox={viewBox}>
                <path fill="none" id="curve" d={path} />
                <text className={clsx(bricolage_grotesque.className, styles.svg_text)} style={{ fill: color }}>
                    {
                        [...Array(textPathIterations)].map((_, i) => (
                            <textPath
                                key={i}
                                ref={ref => paths.current[i] = ref}
                                startOffset={`${i * spacing}%`}
                                href="#curve"
                            >
                                {text}
                            </textPath>
                        ))
                    }
                </text>
            </svg>
        </motion.div>
    );
}

export default TextAlongPath;