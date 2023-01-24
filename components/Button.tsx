import styles from '@/styles/Button.module.css';

interface Props {
    children: React.ReactNode
    type?: "submit"
}

export default function Button({children, type, ...rest}: Props) {
  return (
    <button type={type || "button"} className={styles.button} {...rest}>{children}</button>
  )
}
