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
    <CenteredModal>
      <h1>Error:</h1>
      <p>{ error && error.message }</p>
      <div
        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="button"
          className="inline-block px-6 py-2.5 bg-zinc-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-700 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal">
          Close
        </button>
      </div>
    </CenteredModal>
  )
}

const CenteredModal: FC<WrapperProps> = ({ children }) => {
  return (
    <Overlay>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          { children }
        </div>
      </div>
    </Overlay>
  )
}

export default CenteredModal;
