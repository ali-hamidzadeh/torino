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
    SUV: "خودروی شاسی‌بلند",
    van: "ون",
    minibus: "مینی‌بوس",
  };
  return vehicles[vehicle] || vehicle;
};

export const getHotel = (options) => {
  if (!options) return null;

  const hotel = options.find(
    (opt) => opt.includes("هتل") || opt.includes("هفل"),
  );

  if (!hotel) return null;

  const numberMap = {
    یک: "1",
    دو: "2",
    سه: "3",
    چهار: "4",
    پنج: "5",
    شش: "6",
    هفت: "7",
    هشت: "8",
    نه: "9",
  };

  const star = Object.entries(numberMap).find(([word]) => hotel.includes(word));

  return star ? `هتل ${star[1]} س...` : "هتل";
};
