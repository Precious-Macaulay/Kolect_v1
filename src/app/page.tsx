'use client'

import Image from 'next/image'
import logo from '@/src/assets/logo.png'
import { Button, Link } from '@nextui-org/react'

export default function Home() {
  return (
    <main className='w-screen h-screen flex flex-col justify-between items-center'>
      <div>
      </div>
      <div className='flex flex-row items-center justify-center'>
        <Image src={logo}
          width={44}
          height={44}
          alt='logo'
        />
        <span className='font-semibold m-special'>Kolect</span>
      </div>
      <div className='relative bg-white flex flex-col h-40 rounded p-special m-special gap-1'>
        <Button className='line-button' as={Link} href='/login'>
          Login
        </Button>
        <Button className='solid-button' as={Link} href='/register'>
          Create An Account
        </Button>
      </div>
    </main>
  )
}
