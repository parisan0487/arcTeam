"use client"
import React from "react"
import { motion } from "framer-motion"
import {
  Code,
  Smartphone,
  Cpu,
  Monitor,
  Headphones,
  Users,
} from "lucide-react"

const servicesData = [
  {
    id: "web-mobile",
    title: "طراحی وب و موبایل",
    description:
      "طراحی و توسعه وب‌سایت‌های واکنشگرا و اپلیکیشن‌های موبایل با UI/UX مدرن و عملکرد بالا.",
    services: [
      {
        icon: <Code className="w-12 h-12 text-[#00e0ca]" />,
        title: "طراحی وب‌سایت",
        desc: "سایت‌های مدرن، سریع و بهینه برای انواع کسب‌وکارها.",
      },
      {
        icon: <Smartphone className="w-12 h-12 text-[#00e0ca]" />,
        title: "اپلیکیشن اندروید و iOS",
        desc: "اپلیکیشن‌های با کارایی بالا و تجربه کاربری عالی.",
      },
    ],
  },
  {
    id: "ai-data",
    title: "هوش مصنوعی و داده",
    description:
      "استفاده از هوش مصنوعی، یادگیری ماشین و تحلیل داده‌ها برای بهبود کسب‌وکار شما.",
    services: [
      {
        icon: <Cpu className="w-12 h-12 text-[#00e0ca]" />,
        title: "هوش مصنوعی",
        desc: "راهکارهای هوشمند مبتنی بر یادگیری عمیق و پردازش داده‌ها.",
      },
      {
        icon: <Users className="w-12 h-12 text-[#00e0ca]" />,
        title: "تحلیل داده‌ها",
        desc: "تحلیل داده‌های بزرگ برای تصمیم‌گیری دقیق‌تر.",
      },
    ],
  },
  {
    id: "backend-desktop",
    title: "برنامه دسکتاپ و بک‌اند",
    description:
      "توسعه نرم‌افزارهای دسکتاپ و سرویس‌های بک‌اند قدرتمند، امن و مقیاس‌پذیر.",
    services: [
      {
        icon: <Monitor className="w-12 h-12 text-[#00e0ca]" />,
        title: "نرم‌افزار دسکتاپ",
        desc: "برنامه‌های دسکتاپ با رابط کاربری حرفه‌ای و عملکرد بالا.",
      },
      {
        icon: <Code className="w-12 h-12 text-[#00e0ca]" />,
        title: "بک‌اند",
        desc: "توسعه API‌ها و سیستم‌های بک‌اند پایدار و ایمن.",
      },
    ],
  },
  {
    id: "support-consulting",
    title: "پشتیبانی و مشاوره",
    description:
      "ارائه خدمات مشاوره‌ای و پشتیبانی حرفه‌ای برای تضمین موفقیت پروژه شما.",
    services: [
      {
        icon: <Headphones className="w-12 h-12 text-[#00e0ca]" />,
        title: "پشتیبانی فنی",
        desc: "پاسخگویی سریع و رفع مشکلات فنی در کمترین زمان.",
      },
      {
        icon: <Users className="w-12 h-12 text-[#00e0ca]" />,
        title: "مشاوره تخصصی",
        desc: "برنامه‌ریزی و راهنمایی استراتژیک برای پروژه‌ها.",
      },
    ],
  },
]

const ServicesSection = () => {
  return (
    <section className="py-20 px-6 sm:px-12 text-right">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-extrabold text-[#00e0ca] mb-12 text-center"
        >
          خدمات ما
        </motion.h2>

        <div className="flex flex-col gap-16">
          {servicesData.map(({ id, title, description, services }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-400 mb-8 max-w-3xl">{description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {services.map(({ icon, title, desc }, idx) => (
                  <div
                    key={idx}
                    className="bg-[#121a1e] rounded-2xl p-6 shadow-lg hover:shadow-[#00e0ca]/50 transition-shadow cursor-pointer flex items-start gap-4"
                  >
                    <div className="flex-shrink-0">{icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
