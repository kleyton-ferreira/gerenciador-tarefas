import React from 'react'

import Sidebar from './components/Sidebar/Sidebar'
import Task from './components/Task/Task'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Task />
    </div>
  )
}

export default App
