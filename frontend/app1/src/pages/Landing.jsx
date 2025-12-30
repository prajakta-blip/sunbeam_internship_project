import img1 from "../assets/sunbeam1.png";
import img2 from "../assets/sunbeam2.png";
import img3 from "../assets/sunbeam3.png";
import ImageScroller from "../components/ImageScroller";

function Landing() {
  return (
    <>
      <h2 className="text-center">Sunbeam Institute of Information Technology</h2>

      <p className="text-center">
        Industry focused IT training with strong placement support.
      </p>

      <ImageScroller images={[img1, img2, img3]} />
    </>
  );
}

export default Landing;
