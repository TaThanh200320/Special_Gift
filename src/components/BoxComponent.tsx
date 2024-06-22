import React from "react";

type BoxComponentProps = {
  children: React.ReactNode;
};

export const BoxComponent: React.FC<BoxComponentProps> = ({ children }) => {
  return (
    <div
      className="overflow-x-hidden overflow-y-hidden"
      style={{
        backgroundImage: "url('https://i.giphy.com/U3qYN8S0j3bpK.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="w-full mx-auto min-h-[100vh] xl:max-w-[1230px] xxl:max-w-[1320px] px-[16px] md:px-[30px] xl:px-0">
        {children}
      </section>
    </div>
  );
};
