import ProcessCard from "@/components/process-card";
import ProcessSectionWrapper from "@/components/wrappers/ProcessSectionWrapper";
import { faComments, faLightbulb, faPencilRuler, faClipboardList, faTools, faCheckDouble, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

export default function OurProcess() {
  const t = useTranslations("process");

  const processSteps = [
    { number: 1, title: t("steps.1.title"), text: t("steps.1.text"), icon: faComments },
    { number: 2, title: t("steps.2.title"), text: t("steps.2.text"), icon: faLightbulb },
    { number: 3, title: t("steps.3.title"), text: t("steps.3.text"), icon: faPencilRuler },
    { number: 4, title: t("steps.4.title"), text: t("steps.4.text"), icon: faClipboardList },
    { number: 5, title: t("steps.5.title"), text: t("steps.5.text"), icon: faTools },
    { number: 6, title: t("steps.6.title"), text: t("steps.6.text"), icon: faCheckDouble },
    { number: 7, title: t("steps.7.title"), text: t("steps.7.text"), icon: faHeadset }
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="flex flex-col items-center gap-3">
        <h1 className="text-lg font-semibold text-[#e1b261]">{t("sectionTitle")}</h1>
        <h2 className="text-4xl our-services-header ">{t("sectionSubtitle")}</h2>
      </section>

      <ProcessSectionWrapper>
        {processSteps.map((step) => (
          <ProcessCard
            key={step.number}
            number={step.number}
            title={step.title}
            text={step.text}
            icon={step.icon}
          />
        ))}
      </ProcessSectionWrapper>
    </div>
  );
}
