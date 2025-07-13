"use client";

import { motion } from "framer-motion";

const timeline = [
    {
        side: "right",
        title: "آغاز از یک نیاز واقعی",
        desc: "همه‌چیز از یک مسئله واقعی در حوزه مسکن آغاز شد؛ مشکلی که خود ما نیز با آن درگیر بودیم و لمسش کرده بودیم. راه‌حل خلاقانه‌ای به ذهن‌مون رسید که به نظرمون می‌تونست زندگی خیلی‌ها رو تغییر بده. راه حلی که دانش‌بنیان شد.",
    },
    {
        side: "left",
        title: "ورود از مسیر آموزش",
        desc: "ما دو دوستیم با سال‌ها سابقه تدریس و فعالیت تو دنیای برنامه‌نویسی. تا حالا بیشتر وقت‌مون صرف آموزش و توسعه بوده، اما این بار تصمیم گرفتیم خودمون وارد بازی بشیم و دانش و تجربه‌مون رو در عمل به‌کار بگیریم تا چیزی بسازیم که بهش باور داریم.",
    },
    {
        side: "right",
        title: "تولد آرک",
        desc: "اینطوری بود که «آرک» متولد شد 😁 یه تیم کوچیک ولی پرانرژی که با ترکیب تجربه، خلاقیت و دغدغه‌مندی، دنبال ساختن راه‌حل‌هایی واقعی برای نیازهای واقعی‌ه. در ادامه طرح‌های هیجان‌انگیز دیگه‌ای هم مطرح شد که داریم روش کار می‌کنیم و به آینده امیدواریم.",
    },
];

export default function ArkStory() {
    return (
        <section className="relative py-20  text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center mb-16 ">سرگذشت آرک</h2>

                <div className="relative grid grid-cols-9 gap-y-16">
                    {/* خط عمودی تایم‌لاین */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#019297] z-0" />

                    {timeline.map((item, index) => {
                        const isLeft = item.side === "left";
                        const animationProps = {
                            initial: { opacity: 0, x: isLeft ? -100 : 100 },
                            whileInView: { opacity: 1, x: 0 },
                            transition: { duration: 0.7, delay: index * 0.2 },
                            viewport: { once: true },
                        };

                        return (
                            <div key={index} className="contents">
                                {isLeft ? (
                                    <>
                                        <div className="col-span-4 flex justify-end">
                                            <motion.div
                                                {...animationProps}
                                                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-[300px] text-right"
                                            >
                                                <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#019297] via-[#73ED7C] to-[#019297]">{item.title}</h3>
                                                <p className="text-sm">{item.desc}</p>
                                            </motion.div>
                                        </div>
                                        <div className="col-span-1 flex justify-center items-start relative">
                                            <div className="w-4 h-4 bg-[#019297] rounded-full z-10 mt-2" />
                                        </div>
                                        <div className="col-span-4" />
                                    </>
                                ) : (
                                    <>
                                        <div className="col-span-4" />
                                        <div className="col-span-1 flex justify-center items-start relative">
                                            <div className="w-4 h-4 bg-[#019297] rounded-full z-10 mt-2" />
                                        </div>
                                        <div className="col-span-4 flex justify-start">
                                            <motion.div
                                                {...animationProps}
                                                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-[300px] text-right"
                                            >
                                                <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#019297] via-[#73ED7C] to-[#019297]">{item.title}</h3>
                                                <p className="text-sm">{item.desc}</p>
                                            </motion.div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
