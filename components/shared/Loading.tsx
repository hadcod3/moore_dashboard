'use client'
import Image from 'next/image'
import React from 'react'

const Loading = () => {

    return (
        <div className='w-full h-screen flex items-center justify-center bg-white/50 absolute z-50'>
            <Image
                src="/assets/images/moore_logo_bw.png"
                alt="Had Wedding Logo"
                width={50}
                height={50}
                className='animate-spin'
            />
        </div>
    )
}
export default Loading