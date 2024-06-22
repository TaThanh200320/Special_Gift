import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#F6F7F2] overflow-x-hidden overflow-y-hidden">
      <section className="w-full mx-auto min-h-[100vh] xl:max-w-[1230px] xxl:max-w-[1320px] px-[16px] md:px-[30px] xl:px-0">
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
    </div>
  );
}
