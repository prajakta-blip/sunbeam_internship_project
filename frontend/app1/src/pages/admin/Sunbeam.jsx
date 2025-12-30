import { useState } from "react";
import Footer from "../../components/Footer";

import img1 from "../../assets/sunbeam1.png";
import img2 from "../../assets/sunbeam2.png";
import img3 from "../../assets/sunbeam3.png";

import "./Sunbeam.css";

function Sunbeam() {
  const images = [img1, img2, img3];
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Sunbeam Institute of Information Technology</h2>

        <p>
          The Sunbeam campus at Rajiv Gandhi Infotech Park, Hinjawadi is spread
          over an area of 1 Acre which includes modern labs, classrooms and
          Wi-Fi enabled campus. The institute offers industry-focused training
          programs with strong placement support.
        </p>

        {/* ===== IMAGE GALLERY ===== */}
        <div className="gallery-wrapper">
          <div className="gallery-container">
            <button className="arrow" onClick={prev}>
              ‹
            </button>

            <div className="gallery-track">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Sunbeam Campus"
                  className={
                    i === index
                      ? "gallery-img active"
                      : "gallery-img"
                  }
                />
              ))}
            </div>

            <button className="arrow" onClick={next}>
              ›
            </button>
          </div>
        </div>
        {/* ===== END GALLERY ===== */}
      </div>

      <Footer />
    </>
  );
}

export default Sunbeam;
