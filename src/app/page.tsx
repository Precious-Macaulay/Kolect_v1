import Image from 'next/image'
import logo from '@/src/assets/logo.png'

export default function Home() {
  return (
    <main>
      <div className='flex flex-row w-full'>
        <Image src={logo}
          width={64}
          height={64}
          alt='logo'
        />
        <div className='text-4xl'>Kolect</div>
      </div>
      <div>
        <div className='text-2xl'>Welcome to Kolect</div>
        <div className='text-xl'>A payment management</div>
      </div>
      <div className='bg-white rounded p-7'>
        <button className=''>
          Get Started
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Login
        </button>
      </div>
    </main>
  )
}
