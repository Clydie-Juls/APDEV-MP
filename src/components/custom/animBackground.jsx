import React from "react";

const AnimBackground = ({ children }) => {
  return (
    <div className=" w-screen h-screen relative grid">
      <img
        className=" w-full h-full object-cover absolute -z-10 brightness-[0.08]"
        src="/images/animBackground.gif"
        alt="cube background image"
      />
      {children}
    </div>
  );
};

export default AnimBackground;
