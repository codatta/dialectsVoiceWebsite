import { Link, Outlet, useLocation } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex-1 bg-gradient-to-t from-white from-20% to-[#f8f7f5]">
        <Outlet />
      </div>
    </div>
  )
}

function Header() {
  const { pathname } = useLocation()
  const navs = [
    {
      url: '/read',
      label: '朗读'
    },
    { url: '/monologue', label: '自由录音' },
    { url: '/chat', label: '自由对话' },
    { url: '/user', label: '我的' }
  ]

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center bg-[#e7e5e2] text-[#000] shadow">
      {navs.map((nav) => (
        <Link
          to={nav.url}
          key={nav.label}
          className={`flex h-full items-center px-3 ${
            pathname === nav.url ? 'bg-[#f3f2f1] text-[#1570ef]' : ''
          }`}
        >
          {nav.label}
        </Link>
      ))}
    </header>
  )
}
