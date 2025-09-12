import React from 'react'
import { tv } from 'tailwind-variants'

const Button = ({ children, variant, className, size, ...rest }) => {
  const button = tv({
    base: 'flex items-center gap-2 rounded-md px-3 py-1 text-[16px] transition hover:bg-opacity-70',
    variants: {
      color: {
        primary: 'bg-brand-primary text-brand-white',
        secondary: 'bg-transparent text-brand-dark-gray hover:text-opacity-70',
        tertiary:
          'bg-brand-light-gray text-brand-dark-blue hover:text-opacity-70',
        ghost: 'cursor-pointer text-brand-text-gray hover:text-opacity-70',
      },
      size: {
        small: 'w-full px-3 py-2 text-[14px]',
        larger: 'w-full px-3 py-2 text-[14px]',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  })

  return (
    <>
      <button className={button({ color: variant, className, size })} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button
