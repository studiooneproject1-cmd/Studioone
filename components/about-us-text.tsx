import type { postData } from "@/types/index";

interface AboutProps {
  about: postData | null;
}

export default function AboutUsText({ about }: AboutProps) {
  return (
    <div>
      <section className="w-full md:w-[40vw] h-full flex flex-col justify-center text-center md:text-left p-4 ">
        <h2 className="text-lg font-bold mb-4 text-[#e1b261]">
          {about?.small_header}
        </h2>
        <h2 className="text-5xl font-bold mb-4">{about?.name}</h2>
        <section className="flex items-center justify-start gap-4 mb-4">

          <div className="w-1 bg-[#e1b261] h-40 rounded-full" />


          <p className="opacity-70 flex-1 flex items-center text-lg font-medium ">
            {about?.description}
          </p>
        </section>
      </section>
    </div>
  );
}
