import React from "react";
import Api from "../../Api";
const Image = ({ imgSrc, className }) => {
  return (
    <img
      className={className}
      src={
        imgSrc?.includes("/static/")
          ? imgSrc
          : `${Api.defaults.baseURL}/uploads/${imgSrc}`
      }
      alt={imgSrc}
    />
  );
};

export default Image;

// import React from "react";
// import Api from "../../Api";

// const Image = ({ imgSrc, className }) => {
//   // Check if imgSrc is an object and has properties
//   if (typeof imgSrc === "object" && imgSrc !== null) {
//     // Get an array of object values and access the first element
//     const values = Object.values(imgSrc);
//     const upload =
//       values.length > 0 ? parseInt(values[0]?.split("-")[0]) : null;

//     return (
//       <img
//         className={className}
//         src={
//           upload
//             ? `${Api.defaults.baseURL}/uploads/${values[0]}`
//             : `${Api.defaults.baseURL}/uploads/${upload}`
//         }
//         alt={upload}
//       />
//     );
//   }

//   // Default behavior if imgSrc is not an object
//   return <img className={className} src={imgSrc} alt={imgSrc} />;
// };

// export default Image;
