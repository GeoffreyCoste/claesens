import styles from '../style.module.scss';
import AnimateStagger from '@/components/animate-stagger';
import AnimateFade from '@/components/animate-fade';
import Badge from '@/components/badge';
import AnimateHeading from '@/components/animate-heading';

const TextBlock = ({title, badges, content, keyBasis}) => {
  return (
    <div className={styles.text_block}>
      <div className={styles.badges}>
        {badges.texts.map((text, index) => (
          <Badge
            key={`${keyBasis}-badge-${index}`}
            text={text}
            black={badges.black}
          />
        ))}
      </div>
      <AnimateStagger>
        {title.map((text, index) => (
              <AnimateHeading key={index} {...text} />
        ))}
        <AnimateFade>
          {content.map((item, index) => (
            <p key={`${keyBasis}-paragraph-${index}`} className={styles.paragraph}>
              {item}
            </p>
          ))}
        </AnimateFade>
      </AnimateStagger>
    </div>
  );
};

export default TextBlock;
