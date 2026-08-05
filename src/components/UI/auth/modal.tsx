import { FC } from "react";

const Modal: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 bg-black/20 backdrop-blur-xs w-screen h-screen z-10 flex justify-center items-center">
      {children}
    </div>
  );
};

export default Modal;
