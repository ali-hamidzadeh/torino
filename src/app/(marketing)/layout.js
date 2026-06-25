import FooterFull from "@/components/shared/FooterFull";

export default function MarketingLayout({ children }) {
  return (
    <>
      {children}
      <FooterFull />
    </>
  );
}