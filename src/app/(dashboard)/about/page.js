"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import torinoBanner from "@public/Turin-airport-hero-image_mobile.webp";
import ceoAvatar from "@public/ceoAvatar.jpg";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }, 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`${styles.container} ${isVisible ? styles.animate : ""}`}
      >
        <div className={styles.contentSide}>
          <h2 className={styles.title}>
            درباره تورینو
            <br />
            همسفر هر سفر
          </h2>
          <p className={styles.desc}>
            فرقی ندارد که مقصدتان کجاست؛ شما شایسته سفری آسان، مطمئن و باکیفیت
            هستید.
          </p>
          <p className={styles.descDelay}>
            تورینو به عنوان همراهی مطمئن در صنعت گردشگری، تمامی نیازهای سفر شما
            را پوشش می‌دهد. از رزرو سریع بلیط و هتل تا برنامه‌ریزی دقیق تورهای
            مسافرتی، ما در هر قدم کنار شما هستیم تا با خیالی آسوده، فقط به لذت
            بردن از مسیر فکر کنید
          </p>

          <div className={styles.ceoBox}>
            <div className={styles.ceoImageWrapper}>
              <Image
                src={ceoAvatar}
                alt="مدیرعامل"
                width={109}
                height={193}
                className={styles.ceoImage}
              />
            </div>

            <div className={styles.ceoInfo}>
              <div className={styles.ceoHeader}>
                <strong>توحید علی‌اشرفی</strong>
                <span>مدیرعامل</span>
              </div>
              <p className={styles.ceoQuote}>
                متعهد به تحول تجربه سفر ایرانیان با تکیه بر نوآوری و تکنولوژی
                هستیم.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.imageSide}>
          <Image
            src={torinoBanner}
            alt="تورینو"
            width={532}
            height={495}
            className={styles.mainImage}
          />
        </div>
      </section>
      <section className={styles.containerText}>
        <div>
          <h2 className={styles.titleText}>مسیر امروز، مقصــد فردا</h2>
          <p className={`${styles.description} ${styles.smallText}`}>
            ما به چیزی فراتر از یک هدف فکر می‌کنیم: خلق تجربه‌ای شایسته از سفر
            برای مردم ایران. این تعهد ماست و برای انجام آن، دو ابزار قدرتمند در
            اختیار داریم:{" "}
            <span className={styles.bold}>نوآوری و هم‌افزایی.</span>
          </p>
        </div>

        <div>
          <h2 className={`${styles.titleText} ${styles.shortWidth}`}>
            پیشرو در تحول گردشگری ایران
          </h2>
          <p className={`${styles.description} ${styles.longWidth}`}>
            «تفکر پیشرو» از همان روز اول در تاروپود تورینو بوده و همین مدل فکری،
            ما را به جایگاه رتبه یک سفر بازار گردشگری رسانده است. چیزی که برای
            سال‌های آینده از خودمان انتظار داریم
            <span className={styles.bold}>
              «پیشروبودن در تحول صنعت گردشگری کشور»
            </span>{" "}
            است؛
            <br />
            تمرکز بر بهره‌گیری از هوش مصنوعی برای ارتقای تجربه سفر، توسعه همکاری
            با نخبگان صنعت فناوری و گردشگری و هم‌افزایی بیشتر با فعالان این
            زیست‌بوم، از مهم‌ترین اولویت‌های تورینو در ادامه مسیر است.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
