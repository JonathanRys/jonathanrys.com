import { Link } from "@remix-run/react";
import { useQueryString } from '~/utils';

type ButtonProps = {
  onClick: () => void
  value?: String
  className?: String
  submit?: boolean
}

export const CloseButton = () => {
  const queryString = useQueryString();

  return (
    <Link 
      to={ queryString.get('redirectTo') || '/' }
      className="inline-block px-6 py-2.5 bg-zinc-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-700 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out">
      Close
    </Link>
  )
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={ props.submit ? 'submit' : 'button' }
      className="inline-block px-6 py-2.5 ml-5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={ props.onClick }>
      { props.value }
    </button>
  )
}

type FooterProps = {
  close?: boolean
  buttons: ButtonProps[]
};

const ModalFooter = (props: FooterProps) => {
  return (
    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
      { props.close ? <CloseButton /> : null }
      { props.buttons.map((buttonProps: ButtonProps, i) => {
        return (
          <Button key={`modal-footer-button-${i}`} { ...buttonProps }></Button>
        )
      }) }
    </div>
  )
};

export default ModalFooter;
