import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { lazy } from 'react'

import AppLayout from '@/layouts/app-layout'

const StayTunedPage = lazy(() => import('@/views/stay-tuned'))
const UserFormPage = lazy(() => import('@/views/user-form'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<StayTunedPage />}></Route>
          <Route path="/user" element={<UserFormPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
