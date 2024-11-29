import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { lazy } from 'react'

import AppLayout from '@/layouts/app-layout'

const UserFormPage = lazy(() => import('@/views/user'))
const ReadPage = lazy(() => import('@/views/read-voice'))
const MonologuePage = lazy(() => import('@/views/monologue-voice'))
const ChatPage = lazy(() => import('@/views/chat-voice'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/user" element={<UserFormPage />}></Route>
          <Route index path="/read" element={<ReadPage />}></Route>
          <Route index path="/monologue" element={<MonologuePage />}></Route>
          <Route index path="/chat" element={<ChatPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
