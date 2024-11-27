import { createRoot } from 'react-dom/client'
import Router from '@/router'

const container = document.getElementById('root')
if (!container) {
  throw new Error('root container not found')
}
const root = createRoot(container)
root.render(<Router></Router>)
