import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import CartDrawer from "@/components/customer/CartDrawer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#0D0B14",
          paddingTop: 64,        /* exact navbar height */
          paddingBottom: 80,     /* space for mobile bottom nav */
        }}
      >
        {children}
      </main>
      <MobileNav />
    </>
  );
}
