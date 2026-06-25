import FooterSimple from "@/components/shared/FooterSimple";

export default function DashboardLayout({ children }) {
  return (
    <>
      {children}
      <FooterSimple />
    </>
  );
}
