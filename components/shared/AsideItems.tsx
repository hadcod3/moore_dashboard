"use client";
import { asideLinks } from '@/constants'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AsideItems = () => {
    const pathname = usePathname();

    return (
        <ul className='flex items-center justify-center flex-col h-40'>
            {asideLinks.map((link) => {
                const isActive = pathname === link.route
                return (
                    <li 
                    key={link.route}
                    className={`${
                        isActive && 'text-primary-500'
                    } h-full flex flex-col`}
                    >
                        <Link href={link.route} className='flex items-center justify-center h-[30px] w-[30px]'>
                            <Image src={`/assets/icons/${link.ic}`} alt={link.label} width={20} height={20}/>
                            {/* {link.label} */}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default AsideItems
