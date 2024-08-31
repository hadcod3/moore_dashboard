import React from 'react'
import AsideItems from './AsideItems'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

const Aside = () => {

    return (
        <nav className='fixed w-14 h-screen py-4 left-4'>
            <div className='h-full flex flex-col items-center justify-between py-3 border-2 rounded-xl'>
                <Link href="/" className="flex items-center gap-5">
                    <Image
                        src="/assets/icons/logo.png"
                        alt="Had Wedding Logo"
                        width={30}
                        height={30}
                    />
                </Link>
                <AsideItems/>
                <div className='w-8 h-8 flex items-center justify-center'>
                    <UserButton/>
                </div>
            </div>
        </nav>
    )
}

export default Aside
