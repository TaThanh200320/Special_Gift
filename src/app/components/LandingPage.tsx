import Image from "next/image";

export const LandingPage: React.FC = () => {
  return (
    <section className="w-full bg-white">
      <Image
        src={"test.png"}
        width={800}
        height={800}
        alt="Image"
        className="w-full h-full object-cover"
      ></Image>
    </section>
  );
};
