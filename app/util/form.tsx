import type { FC } from "react";

import type { WrapperProps } from '~/types/base';

interface FormInterface extends WrapperProps {
  className?: string
  action?: string
}

const Form: FC<FormInterface> = props => {
  return (
    <form { ...props }>
      { props.children }
    </form>
  )
}

export default Form;
