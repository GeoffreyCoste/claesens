import { h2FooterAsideRealizationMask } from "@/components/animate-heading/data";
import AnimateHeading from "@/components/animate-heading";
import AnimateFade from "@/components/animate-fade";
import ButtonCopy from "@/components/button-copy";

const AsideFooterRealizationMaskContent = () => {
  return (
    <>
      {h2FooterAsideRealizationMask.map((text, index) => (
        <AnimateHeading key={index} {...text} />
      ))}
      <AnimateFade>
          <p>
            Une seule connexion suffit !
          </p>
      </AnimateFade>
      <ButtonCopy />
    </>
  );
};

export default AsideFooterRealizationMaskContent;