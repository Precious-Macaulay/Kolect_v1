'use client'
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { Avatar, Input } from '@nextui-org/react';
import { BiSearch } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';


export default function Customers () {
    return (<div className="h-screen w-screen p-special-m">
        <div className='flex justify-between items-center m-special-x'>
            <IoIosArrowBack />
            <h1>Customers</h1>
            <FaFilter />
        </div>
        <Input type='text' variant='faded' size='lg' placeholder='search' startContent={<BiSearch />} color='#F5F5F5' radius='sm' />
        <div className="bg-white w-full m-special-xl p-special-tiny flex justify-between items-center">
            <div className='flex flex-row items-center gap-special'>
            <Avatar name='B' />
            <div><h1 className="">Bola Ahmed</h1><p className="light-text">bolaahmed@gmail.com</p></div>
            </div>
            <IoIosArrowForward />
        </div>
    </div>);
}