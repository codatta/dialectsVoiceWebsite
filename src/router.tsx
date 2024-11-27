import { Route, BrowserRouter, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/app-layout'
import { lazy } from 'react'

const StayTunedPage = lazy(() => import('@/views/stay-tuned'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<StayTunedPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
