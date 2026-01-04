import javaImg from "../assets/Java.jpeg";
import nodeImg from "../assets/Node.png";
import mernImg from "../assets/Mern.jpg";
import reactImg from "../assets/React.jpg";
import defaultImg from "../assets/default-course.png"; // ✅ add one fallback image

// ✅ EXACT MATCH with DB courseName
const courseImages = {
  "Java advance": javaImg,
  "Java Advanced": javaImg,
  Java: javaImg,

  "Node JS": nodeImg,
  Node: nodeImg,

  Mern: mernImg,
  MERN: mernImg,
  "Full Stack MERN": mernImg,

  React: reactImg,
};

// ✅ SAFE IMAGE GETTER
export const getCourseImage = (courseName) => {
  return courseImages[courseName] || defaultImg;
};

export default courseImages;
