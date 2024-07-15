import styles from './style.module.scss';
import {h1SectionAbout} from '../animate-heading/data';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';

export default function SectionAboutIntro() {
  return (
    <section className={styles.section_about_intro}>
      <div className={styles.section_about_intro_content}>
        <div className={styles.section_about_intro_wrapper}>
          Ooops! Content needed
        </div>
        <div className={styles.section_about_intro_wrapper}>
          <AnimateStagger>
            {h1SectionAbout.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
            <AnimateFade>
              <div className={styles.section_about_intro_item}>
                <p className={styles.section_about_intro_text}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                  nihil a deleniti est impedit veritatis quasi! Deserunt dolorum
                  quos aliquid nam maxime quo, accusantium laborum dolore atque
                  vel voluptatem cupiditate! Dolorem esse, recusandae ipsam
                  laborum totam molestiae mollitia velit inventore dolores ab ut
                  reprehenderit aspernatur reiciendis nam illum itaque ad? Ea
                  laudantium enim corporis error dignissimos vitae commodi
                  assumenda aspernatur? Culpa necessitatibus beatae ipsa non,
                  velit obcaecati exercitationem commodi, magni omnis
                  consectetur, laborum dolores. Cum aliquid, ut alias, enim rem
                  fugit labore nesciunt earum repellat ducimus harum qui
                  reprehenderit similique.
                </p>
                <p className={styles.section_about_intro_text}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  impedit ex nisi, suscipit mollitia incidunt! Consectetur sed
                  velit, sapiente quasi blanditiis recusandae, officia possimus
                  sit ipsa cupiditate veniam! Vel, officiis. Ipsum tempore quod
                  qui eaque similique iste eius doloribus laudantium quasi
                  accusamus. Officia explicabo in, dolore, cupiditate,
                  perspiciatis nisi vel aperiam voluptas ipsa odio accusantium
                  aliquid quasi hic? Saepe, dolorum? Vero sed molestiae cumque
                  ad illum, perferendis nemo sequi tempore quia adipisci iste
                  quibusdam. Pariatur nisi laborum neque, aut veniam modi soluta
                  totam consequuntur cupiditate consectetur facere in voluptas
                  eligendi.
                </p>
                <p className={styles.section_about_intro_text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis corporis perspiciatis error? Magnam, voluptate illum?
                  Enim nam modi corrupti laboriosam? Voluptate molestiae sit
                  eius unde ad explicabo atque, autem laudantium. Laboriosam
                  nemo, perferendis, nesciunt necessitatibus, rerum tempora
                  praesentium corrupti voluptate consectetur provident sint hic
                  molestias odio? Illo minus quae sequi amet, ipsam dicta
                  accusamus perferendis? Ab obcaecati sequi sint eveniet. Neque
                  deserunt excepturi cumque, reiciendis eligendi dolores dolore
                  quisquam quasi quidem, ratione placeat architecto pariatur
                  explicabo veritatis adipisci vitae a ipsum alias accusamus
                  ducimus itaque aliquid! Nesciunt optio quidem mollitia.
                </p>
              </div>
            </AnimateFade>
          </AnimateStagger>
        </div>
      </div>
    </section>
  );
}
