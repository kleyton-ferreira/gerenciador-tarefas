import { NavLink } from 'react-router-dom'
import { tv } from 'tailwind-variants'

const SidebarButton = ({ children, to }) => {
  const sidebar = tv({
    base: 'flex items-center gap-2 transition-all hover:bg-brand-primary hover:bg-opacity-30 hover:text-brand-white',
    variants: {
      color: {
        unselected:
          'rounded-[10px] bg-transparent px-6 py-3 text-[16px] font-semibold text-brand-dark-blue',
        selected:
          'rounded-[10px] bg-brand-primary bg-opacity-15 px-6 py-3 text-[16px] font-semibold text-brand-primary',
      },
    },
  })

  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          sidebar({ color: isActive ? 'selected' : 'unselected' })
        }
      >
        {children}
      </NavLink>
    </>
  )
}

export default SidebarButton
