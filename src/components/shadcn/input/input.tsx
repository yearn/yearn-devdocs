import * as React from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Button } from '../button/button'
import styles from './index.module.css'
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onPasswordVisible?: (name: string) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, onPasswordVisible, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)

    function handlePasswordEye() {
      setIsVisible((prevState) => !prevState)
      if (isVisible && onPasswordVisible) {
        onPasswordVisible(props.name || '')
      }
    }

    if (type === 'password') {
      return (
        <div style={{ position: 'relative', width: 'max-content' }}>
          <input
            ref={ref}
            type={type}
            className={`${styles.Input} ${className}`}
            {...props}
          />
          {type === 'password' ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handlePasswordEye}
              className={styles.passwordButton}
            >
              {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </Button>
          ) : null}
        </div>
      )
    }

    return (
      <input
        ref={ref}
        type={type}
        className={`${styles.Input} ${className}`}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export default Input
