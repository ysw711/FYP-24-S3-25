import React from "react";

import Navbar from "../containers/navbar/Navbar";
import ImageCaptioning from "../childUser/ImageCaptioning";
import Footer from "../containers/footer/Footer";

const ImageCaptioningPage = () => {
  return (
    <>
      <Navbar />
      <ImageCaptioning />
      <Footer />
    </>
  );
};

export default ImageCaptioningPage;
