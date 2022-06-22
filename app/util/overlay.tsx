import type { FC } from "react";
import type { WrapperProps } from '~/types/base';

const Overlay: FC<WrapperProps> = ({ children }) => {
  return (
    <div className="overlay z-50 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto">
      { children }
    </div>
  )
}

export default Overlay;
