export const getMonthName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", { month: "long" });
};

export const getTourDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const exactDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return exactDays;
};

export const translateVehicle = (vehicle) => {
  const vehicles = {
    bus: "اتوبوس",
    airplane: "پرواز",
    train: "قطار",
    ship: "کشتی",
    suv: "خودروی شاسی‌بلند",
    SUV: "خودروی شاسی‌بلند",
    van: "ون",
    minibus: "مینی‌بوس",
  };
  return vehicles[vehicle?.toLowerCase()] || vehicle;
};

export const getHotel = (options) => {
  if (!options) return null;

  const hotel = options.find(
    (opt) => opt.includes("هتل") || opt.includes("هفل"),
  );

  if (!hotel) return null;

  const numberMap = {
    سه: "3",
    چهار: "4",
    پنج: "5",
  };

  const star = Object.entries(numberMap).find(([word]) => hotel.includes(word));

  return star ? `هتل ${star[1]} س...` : "هتل";
};

export const translateCity = (city) => {
  const cities = {
    Tehran: "تهران",
    Isfahan: "اصفهان",
    Shiraz: "شیراز",
    Mashhad: "مشهد",
    Tabriz: "تبریز",
    Ahvaz: "اهواز",
    Kerman: "کرمان",
    Rasht: "رشت",
    Yazd: "یزد",
    Qom: "قم",
    Urmia: "ارومیه",
    Zahedan: "زاهدان",
    Hamadan: "همدان",
    Arak: "اراک",
    Bandar_Abbas: "بندرعباس",
    Sanandaj: "سنندج",
    Madrid: "مادرید",
    Sulaymaniyah: "سلیمانیه",
    Hewler: "هولر",
    Mazandaran: "مازندران",
    Offroad: "تور آفرود",
    Italy: "ایتالیا",
  };
  return cities[city] || city;
};
