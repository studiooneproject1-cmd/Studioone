import type { postData } from "@/types/index";

interface AboutProps {
  about: postData | null;
}

export default function AboutUsText({ about }: AboutProps) {

  
  const mobileText =
    about?.description && about.description.length > 250
      ? about.description.substring(0, 250) + "..."
      : about?.description;

  return (
    <div>
      <section className="w-full md:w-[40vw] h-full flex flex-col justify-center text-left p-4">
        
        <h2 className="text-lg font-bold mb-4 text-[#e1b261]">
          {about?.small_header}
        </h2>

        <h2 className="text-5xl font-bold mb-4">
          {about?.name}
        </h2>

        <section className="flex flex-row items-start justify-start gap-4 mb-4">

          <div className="w-1 bg-[#e1b261] self-stretch min-h-full py-2 rounded-full" />

          <p className="opacity-70 flex-1 text-sm md:text-lg  font-medium flex items-center">
          
            <span className="block md:hidden">{mobileText}</span>
            <span className="hidden md:block">{about?.description}</span>
          </p>

        </section>

      </section>
    </div>
  );
}
