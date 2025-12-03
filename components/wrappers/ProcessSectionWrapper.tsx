import React, { ReactNode } from "react";

interface ProcessSectionWrapperProps {
  children: ReactNode;
}

const ProcessSectionWrapper: React.FC<ProcessSectionWrapperProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <section className="process-section py-24">
      <div className="container mx-auto px-6">
        <div
          className="
            grid gap-8
            sm:grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {childrenArray.map((child, idx) => (
            <div key={idx} className="w-full">
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSectionWrapper;
