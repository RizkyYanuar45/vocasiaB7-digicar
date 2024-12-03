import * as React from "react";

const socialLinks = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5551c180f845518b6a222ca50871e7f6ae96ae72a5126d313f5a4640f341eac7?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
    name: "TikTok",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5d6e3cb9b8c38bdec6ef872f287ec880765db60d2df75700e22b196801392e87?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
    name: "Instagram",
    rounded: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/61c43e7a4b8816512745838fed9a13918ffa52c2914fa0b5b0137a585844832b?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
    name: "Facebook",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/61832238c7b9521041811d2d255896480b3e6d984264a3551b31106aa6a85d95?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
    name: "YouTube",
  },
];

const contactInfo = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7274bc5df446b909facae5deea651f254ad07f5e0a3de94d7d7cd28d0d5e192?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
    phone: "081122334455",
    hours: "Senin - Jumat : 05:00 - 22:00 WIB",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a09da4aa1a3359caedc0f876158eee98201f623a1196a0d4f6bd4b52a3219562?placeholderIfAbsent=true&apiKey=9af91ebbe5bc4a9dae2426d5e5853966",
    phone: "081122334455",
    hours: "Sabtu - Minggu : 07:00 - 22:00 WIB",
  },
];

export default function ContactSection() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="mt-11 text-5xl font-bold text-center border border-solid border-stone-50 text-stone-800 max-md:mt-10 max-md:text-4xl">
        Temukan Kami
      </h2>
      <div className="shrink-0 mt-8 max-w-full bg-rose-800 border-rose-800 border-solid border-[5px] h-[5px] w-[273px]" />
      <p className="mt-11 ml-5 text-2xl font-bold text-center text-black max-md:mt-10 max-md:text-xl">
        Anda mempunyai pertanyaan? Silakan hubungi kami melalui
      </p>

      <div className="flex flex-col md:flex-row gap-5 justify-between mt-20 max-w-full w-full max-md:mt-10">
        <div className="flex flex-col self-start w-full md:w-1/2">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`flex gap-10 ${
                index > 0 ? "mt-16" : ""
              } max-md:mr-2.5`}
            >
              <img
                loading="lazy"
                src={info.icon}
                className="object-contain shrink-0 self-start mt-2.5 w-10 aspect-[1.08]"
                alt={`Contact icon ${index + 1}`}
              />
              <div className="flex flex-col grow shrink-0 text-center text-black basis-0 w-fit">
                <div className="self-start text-2xl font-bold max-md:text-xl">
                  {info.phone}
                </div>
                <div className="mt-4 text-lg max-md:text-base">
                  {info.hours}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col text-2xl font-bold text-center text-black whitespace-nowrap w-full md:w-1/2">
          {socialLinks.map((social, index) => (
            <div
              key={index}
              className={`flex gap-6 ${index > 0 ? "mt-7" : ""} self-start`}
            >
              <img
                loading="lazy"
                src={social.icon}
                className={`object-contain shrink-0 aspect-[1.23] w-[43px] ${
                  social.rounded ? "rounded-[50px]" : ""
                }`}
                alt={`${social.name} icon`}
              />
              <div className="self-start">{social.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
