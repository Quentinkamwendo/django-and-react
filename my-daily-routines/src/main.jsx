import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import router from './router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './ContextProvider'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Toaster />
        <RouterProvider router={router} />
      </ContextProvider>
    </QueryClientProvider>
    {/* <App /> */}
  </React.StrictMode>,
)
