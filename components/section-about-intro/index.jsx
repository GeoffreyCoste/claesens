'use client';

import styles from './style.module.scss';
import {bricolage_grotesque} from '@/app/fonts';
import clsx from 'clsx';
import {useMedia} from '@/hooks/useMedia';
import SvgBackground from './svg-background';
import {imgClipData} from './data';
import SvgImgClip from '../svg-img-clip';
import AnimateFade from '../animate-fade';
import AnimateStagger from '../animate-stagger';
import SvgEllipticSphere from './elliptic-sphere';

const SectionAboutIntro = () => {
  const {isHydrated, matches} = useMedia();
  const {mobile} = matches;

  const [img1, img2] = imgClipData;

  return (
    <section className={styles.section_about_intro}>
      <div className={styles.section_about_intro_content}>
        <div className={styles.section_about_intro_content_heading}>
          <div className={styles.heading}>
            <div className={styles.heading_background}>
              <SvgBackground />
            </div>
            <h2
              className={clsx(
                bricolage_grotesque.className,
                styles.heading_title
              )}
              aria-label="Créativité belge & savoir-faire français"
            >
              <div className={styles.title_container}>
                <div className={styles.title_item}>
                  <span className={styles.item_text}>Créativité belge</span>
                </div>
                <div className={styles.title_item}>
                  <div className={styles.item_img}>
                    {isHydrated && (
                      <SvgImgClip
                        imgSrc={mobile ? img1.imgSrc[0] : img1.imgSrc[1]}
                        filter={img1.filter}
                        clipPathId={img1.clipPathId}
                        clipPathData={img1.clipPathData}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.title_item}>
                  {mobile && <span className={styles.item_text}>&</span>}
                  <span className={styles.item_text}>
                    {mobile ? (
                      <>
                        savoir-faire français
                        <span className={styles.dot}>.</span>
                      </>
                    ) : (
                      <>
                        & savoir-faire français
                        <span className={styles.dot}>.</span>
                      </>
                    )}
                  </span>
                </div>
                <div className={styles.title_item}>
                  <div className={styles.item_img}>
                    {isHydrated && (
                      <SvgImgClip
                        imgSrc={mobile ? img2.imgSrc[0] : img2.imgSrc[1]}
                        filter={img2.filter}
                        clipPathId={img2.clipPathId}
                        clipPathData={img2.clipPathData}
                      />
                    )}
                  </div>
                </div>
              </div>
            </h2>
          </div>
        </div>
        <div className={styles.section_about_intro_content_body}>
          <div className={styles.body}>
            <AnimateStagger>
              <AnimateFade>
                <p>
                  Avec plus de <strong>10 ans d&apos;expérience</strong>,
                  notamment dans le e-commerce, je transforme des idées en
                  solutions visuelles innovantes.
                </p>
                <p
                  className={styles.text}
                  aria-label="Bienvenue dans ma sphère créative !"
                >
                  Bienvenue dans ma <strong>sphère créative</strong> !
                </p>
              </AnimateFade>
            </AnimateStagger>
          </div>
          <div className={styles.sphere}>
            <SvgEllipticSphere />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAboutIntro;
