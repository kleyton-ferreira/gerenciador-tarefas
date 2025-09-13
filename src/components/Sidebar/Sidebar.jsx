import React from 'react'

import { CheksIcon, HomeIcon } from '../../assets/icons'
import SidebarButton from '../SidebarButton/SidebarButton'

const Sidebar = () => {
  return (
    <div className="h-screen w-80 bg-brand-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p className="text-[14px] text-brand-dark-blue">
          Um simples{' '}
          <strong className="text-brand-primary">
            organizador <span>de tarefas</span>{' '}
          </strong>{' '}
        </p>
      </div>
      <div className="space-y-2 p-2">
        <SidebarButton variant="unselected">
          <HomeIcon className="relative -top-0.5" /> Início
        </SidebarButton>
        <SidebarButton variant="selected">
          <CheksIcon /> Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
