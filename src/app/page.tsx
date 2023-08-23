import Image from 'next/image'
import logo from '@/src/assets/logo.png'
import { Button } from '@nextui-org/react'

export default function Home() {
  return (
    <main className='w-full h-full'>
      <div className='flex flex-row items-center'>
        <Image src={logo}
          width={64}
          height={64}
          alt='logo'
        />
        <h1 className='text-4xl'>Kolect</h1>
      </div>
      <div className='bg-white rounded p-7 h-9'>
        <Button>
          Login
        </Button>
        <Button>
          Create Account
        </Button>
      </div>
    </main>
  )
}
