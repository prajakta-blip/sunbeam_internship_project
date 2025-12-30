import Navbar from "./Navbar";
import Footer from "./Footer";

function FooterLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default FooterLayout;
