import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid'

import { useNavigate } from 'react-router-dom';

import '../../css/theme.css'

import User from '../../scripts/auth/user'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      User.logout()
    } catch (error) {
      console.log(error)
    } finally {
      navigate('/login')
    }
  }

  return (
    <header className="bg-white border-b-2 border-teal-500 drop-shadow z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="p-1.5">
            <span className='font-bold text-2xl'>ONDONTO</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="/pacientes" className="text-sm font-semibold leading-6 text-gray-900">
            Pacientes
          </a>
          <a href="/calendario" className="text-sm font-semibold leading-6 text-gray-900">
            Calendário
          </a>
          <a href="/financeiro" className="text-sm font-semibold leading-6 text-gray-900">
            Financeiro
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </a>
          <a href="/usuarios" className="text-sm font-semibold leading-6 text-gray-900">
            Usuários
          </a>
        </Popover.Group>  
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
            Logout <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span>LOGO</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/pacientes"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Pacientes
                </a>
                <a
                  href="/calendario"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Calendário
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Pagamentos
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Dashboard
                </a>
                <a
                  href="/usuarios"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Usuários
                </a>
              </div>
              <div className="py-6">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}