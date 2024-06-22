import React from "react";

type BoxComponentProps = {
  children: React.ReactNode;
};

export const BoxComponent: React.FC<BoxComponentProps> = ({ children }) => {
  return (
    <div className="bg-[#F6F7F2] overflow-x-hidden overflow-y-hidden">
      <section className="w-full mx-auto min-h-[100vh] xl:max-w-[1230px] xxl:max-w-[1320px] px-[16px] md:px-[30px] xl:px-0">
        {children}
      </section>
    </div>
  );
};
