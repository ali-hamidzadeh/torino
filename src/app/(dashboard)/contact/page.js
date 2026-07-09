import Image from "next/image";

import styles from "./page.module.css";
import banner from "@/components/icons/profile/contactbanner.jpg";
import { MdLocalPhone } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

export default function SupportBanner() {
  return (
    <div className={styles.container}>
      <section className={styles.banner}>
        <div className={styles.contentSide}>
          <h2 className={styles.title}>تماس با تورینو</h2>
          <p className={styles.text}>
            وظیفه تورینو به عنوان اولین بازار بزرگ سفر با قابلیت جستجو قیمت از
            بین صدها سایت و آژانس گردشگری، ایجاد بهترین و ارزشمندترین تجربه سفر
            با ارزانترین و بهترین قیمت برای شما است...
          </p>
        </div>
        <div className={styles.imageSide}>
          <Image src={banner} alt="contactbanner" width={1261} height={473} />
        </div>
      </section>
      <section className={styles.contactCard}>
        <div className={styles.header}>
          <h2 className={styles.title}>تماس با ما</h2>
          <p>
            سوال یا درخواستی دارید؟ در همه‌ی روزهای هفته و در هر ساعت از
            شبانه‌روز که بخواهید، می‌توانید از طریق راه‌های زیر با ما ارتباط
            بگیرید.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoSection}>
            <div className={styles.item}>
              <span>
                <MdLocationOn />
              </span>
              <div>
                <strong>آدرس دفتر حضوری:</strong>
                <br />
                خیابان شهید برادران سلیمانی غربی، کوچه شهید محمدحسین بلوچ شمالی،
                پلاک ۴، طبقه ۱
              </div>
            </div>
            <div className={styles.item}>
              <span>
                <MdLocationOn />
              </span>
              <div>
                <strong>آدرس دفتر پشتیبانی:</strong>
                <br />
                اکباتان، نبش اتوبان لشگری، کوی بیمه، خیابان بیمه چهارم، بن‌بست
                گل‌ها، پلاک ۱<br />
                کد پستی: ۱۳۹۳۷۳۳۶۹۱
              </div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.item}>
              <span>
                <MdLocalPhone />
              </span>
              <div>
                <strong>تلفن پشتیبانی:</strong>
                <br />
                ۰۲۱-۸۵۷۴
              </div>
            </div>
            <div className={styles.item}>
              <span>
                <AiOutlineMail />
              </span>
              <div>
                <strong>ایمیل:</strong>
                <br />
                support@torino.ir
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
