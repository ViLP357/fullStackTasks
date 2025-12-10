import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { CounterContextProvider } from './NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <QueryClientProvider client = {queryClient}>
      <App />
    </QueryClientProvider>
  </CounterContextProvider>
)