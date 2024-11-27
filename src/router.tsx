import { Route, BrowserRouter, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/app-layout'
import { lazy } from 'react'

const UserForm = lazy(() => import('@/views/user-form'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/aaa" element={<UserForm />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
