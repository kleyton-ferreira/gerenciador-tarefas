import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import Home from './pages/Home/Home'
import TaskDetailsPage from './pages/TaskDetailsPage/TaskDetailsPage'
import TaskPages from './pages/TaskPages/TaskPages'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/cu',
    element: <Home />,
  },

  {
    path: '/Task',
    element: <TaskPages />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailsPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: '#00ADB5',
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
