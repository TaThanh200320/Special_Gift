import Image from "next/image";

export const LandingPage: React.FC = () => {
  return (
    <section className="w-full body">
      <Image
        src={
          "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDB6NDQwZm1pbXprdnU3bmw4M3RpYXZyaHY3Nm93dDljd2tyM2xqOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2dQ3FMaMFccpi/giphy.webp"
        }
        width={800}
        height={800}
        alt="Image"
        className="w-screen h-screen object-cover"
      ></Image>
    </section>
  );
};
