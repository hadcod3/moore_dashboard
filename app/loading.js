'use client'
import Image from 'next/image'
import React from 'react'

export default function Loading() {

    return (
        <div className='w-full h-screen flex items-center justify-center bg-white absolute z-50'>
            <Image
                src="/assets/icons/logo.png"
                alt="Had Wedding Logo"
                width={50}
                height={50}
                className='animate-pulse'
            />
        </div>
    )
}