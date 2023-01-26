//styles imports
import styles from './Button.module.css';

interface Props {
    children: React.ReactNode
    type?: "submit"
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    tag?: Boolean
}

//if type is not set, default will be type="button",
//if tag inputted as prop, button will be smaller tag size
export default function Button({children, type, onClick, tag, ...rest}: Props) {
  return (
    <button
        type={type || "button"}
        onClick={onClick}
        className={tag ? styles.small : styles.button}
        {...rest}
    >
        {children}
    </button>
  )
}
