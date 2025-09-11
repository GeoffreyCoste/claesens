'use client'

import styles from './style.module.scss';
import {forwardRef} from 'react';
import {useMedia} from '@/hooks/useMedia';
import AnimateFade from '@/components/animate-fade';
import AnimateHeading from '@/components/animate-heading';
import AnimateStagger from '@/components/animate-stagger';
import ButtonCopy from '@/components/button-copy';

const AsideFooterBody = forwardRef(function AsideFooterBody(
  {headings, paragraph, withRef = false},
  ref
) {
  const {isHydrated, matches} = useMedia();
  const {xs} = matches;

  const updatedHeadings =
    isHydrated && xs && headings[0].split && headings[0].separator
      ? [
          {
            ...headings[0],
            text: headings[0].text.split(headings[0].separator).join('')
          }
        ]
      : headings;

  const content = (
    <AnimateStagger>
      {updatedHeadings.map((heading, index) => (
        <AnimateHeading key={index} {...heading} />
      ))}
      <AnimateFade>
        <p className={styles.text}>{paragraph}</p>
      </AnimateFade>
    </AnimateStagger>
  );

  return (
    <div className={styles.aside_footer_body}>
      {withRef ? <div ref={ref}>{content}</div> : content}

      <ButtonCopy />
    </div>
  );
});

export default AsideFooterBody;
