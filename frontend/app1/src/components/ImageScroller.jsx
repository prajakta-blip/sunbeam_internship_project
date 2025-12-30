import { useState } from "react";

function ImageScroller({ images }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const next = () => {
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  return (
    <div style={styles.container}>
      <button style={{ ...styles.button, ...styles.left }} onClick={prev}>
        ‹
      </button>

      <img
        src={images[index]}
        alt="Sunbeam"
        style={styles.image}
      />

      <button style={{ ...styles.button, ...styles.right }} onClick={next}>
        ›
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    maxWidth: "900px",
    margin: "30px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  button: {
    position: "absolute",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    fontSize: "28px",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    cursor: "pointer",
    opacity: 0.7,
  },
  left: {
    left: "-20px",
  },
  right: {
    right: "-20px",
  },
};

export default ImageScroller;
