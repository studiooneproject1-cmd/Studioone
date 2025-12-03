import ContactCard from "@/components/contact-card";
import ProcessSectionWrapper from "@/components/wrappers/ProcessSectionWrapper";
import { faComments, faLightbulb, faPencilRuler } from "@fortawesome/free-solid-svg-icons";
import { getTranslations } from "next-intl/server";

export default async function ContactList() {
  const t = await getTranslations("contacts");

  const Contacts = [
    {
      number: 1,
      title: t("locationTitle"),
      text: t("locationText"),
      icon: faComments,
    },
    {
      number: 2,
      title: t("onlineChannelsTitle"),
      text: t("onlineChannelsText"),
      icon: faLightbulb,
    },
    {
      number: 3,
      title: t("phoneTitle"),
      text: t("phoneText"),
      icon: faPencilRuler,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-[80%] mx-auto">
      <ProcessSectionWrapper>
        {Contacts.map((contact) => (
          <ContactCard
            key={contact.number}
            number={contact.number}
            title={contact.title}
            text={contact.text}
            icon={contact.icon}
          />
        ))}
      </ProcessSectionWrapper>
    </div>
  );
}
