'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import {h2SectionAboutPanorama} from '../animate-heading/data';
import AnimateFade from '../animate-fade';
import SvgCirclesKaleidoscope from './svg-circles-kaleidoscope';

const SectionAboutPanorama = () => {
  return (
    <section className={styles.section_about_panorama}>
      <div className={styles.section_about_panorama_content}>
        <div className={styles.section_about_panorama_content_heading}>
          <div className={styles.heading}>
            <div className={styles.heading_img}>
              {/* <Image
                src="/images/img_about_panorama_640x640.png"
                alt="Emilie Claesens creative designer freelance - photo noir et blanc avec sphères blanches lumineuses dans les bras"
                fill
                priority
                style={{objectFit: 'cover'}}
              /> */}
              <SvgCirclesKaleidoscope />
            </div>
            <div className={styles.heading_title}>
              <AnimateStagger>
                {h2SectionAboutPanorama.map((text, index) => (
                  <AnimateHeading key={index} {...text} />
                ))}
              </AnimateStagger>
            </div>
          </div>
        </div>
        <div className={styles.section_about_panorama_content_body}>
          <div className={styles.body}>
            <div className={styles.body_item}>
              <div className={styles.body_item_text}>
                <AnimateStagger>
                  <AnimateFade>
                    <p className={styles.text}>
                      Que ce soit au sein d&apos;une agence créative ou en tant
                      que directrice artistique d&apos;un site e-commerce,
                      j&apos;ai eu le privilège de travailler avec des marques
                      emblématiques, des sociétés cotées et des PME dans des
                      secteurs variés comme le luxe, l&apos;ameublement ou
                      l&apos;alimentaire.
                    </p>
                    <p className={styles.text}>
                      Ce parcours m&apos;a offert une vision 360° des défis et
                      des meilleures pratiques liés à la conception et au
                      développement de l&apos;identité de marque.
                    </p>
                    <p className={styles.text}>
                      Mon objectif est d&apos;allier esthétisme et
                      fonctionnalité, tout en garantissant que chaque support de
                      communication visuelle (logo, UI/UX, webdesign, réseaux
                      sociaux, motion design, illustration, etc.) réponde aux
                      objectifs business.
                    </p>
                  </AnimateFade>
                </AnimateStagger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAboutPanorama;
