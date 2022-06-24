import type { FC } from "react";
import type { WrapperProps } from '~/types/base';
import Overlay from '~/util/overlay';

type State = {
  hasError: boolean,
  error?: Error
}

// Error Boundry function
export const ErrorBoundry: FC<State> = ({ error }) => {
  return (
    <Modal>
      <h1 className="text-xl font-medium leading-normal text-zinc-800">Error:</h1>
      <p>{ error && error.message }</p>
    </Modal>
  )
}

const Modal: FC<WrapperProps> = ({ children }) => {
  return (
    <Overlay>
      <div className="mx-auto w-11/12 sm:w-3/4 lg:w-1/2 py-16 sm:py-20 modal-dialog relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          { children }
        </div>
      </div>
    </Overlay>
  )
}

export default Modal;
