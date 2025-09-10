import React from 'react'
import { Toaster } from 'sonner'

import Sidebar from './components/Sidebar/Sidebar'
import Task from './components/Task/Task'

function App() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: '#00ADB5',
          },
        }}
      />
      <Sidebar />
      <Task />
    </div>
  )
}

export default App
