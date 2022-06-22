import {
  Link,
  useLocation
} from "@remix-run/react";

type ButtonProps = {
  onClick: () => void,
  value?: String,
  className?: String
}

export const CloseButton = () => {
  const location = useLocation();

  return (
    <Link 
      to={ location.pathname.split('/').slice(0, -1).join('/') }
      className="inline-block px-6 py-2.5 bg-zinc-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-700 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out">
      Close
    </Link>
  )
}

const Button = (props: ButtonProps) => {
  return (
    <button 
      className="inline-block px-6 py-2.5 mr-5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
      onClick={ props.onClick }>
      { props.value }
    </button>
  )
}

type FooterProps = {
  close: boolean
  buttons: ButtonProps[]
};

const ModalFooter = (props: FooterProps) => {
  return (
    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
      { props.buttons.map((buttonProps: ButtonProps, i) => {
        return (
          <Button key={`modal-footer-button-${i}`} { ...buttonProps }></Button>
        )
      }) }
      { props.close ? <CloseButton /> : null }
    </div>
  )
};

export default ModalFooter;
