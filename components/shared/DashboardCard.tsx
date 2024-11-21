'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type DashboardCardProps = {
    title: string,
    value: number,
    unit: string
}

const DashboardCard = async ({ title, value, unit }: DashboardCardProps) => {

    return (
        <div className="relative overflow-hidden flex justify-center h-fit w-[200px] flex-col rounded-[15px] bg-white border border-grey-200 p-4 gap-y-2">
            <div className='w-full flex items-center justify-between'>
                <h2 className='h5-bold text-primary-300 font-playfair'>{title}</h2>
                <Link href={"/"} className='flex items-center justify-center h-[20px] w-[20px]'>
                    <Image src={`/assets/icons/ic_vertical_ellipsis.png`} alt={"menu"} width={18} height={18}/>
                </Link>
            </div>
            <h2 className='h2-bold text-secondary-300'>{value}</h2>
            <h5 className='text-base text-grey-300'>{unit}</h5>
            <div className='absolute left-0 w-[5px] h-28 rounded-tr-xl rounded-br-xl bg-primary-300'></div>
            <Image
                src="/assets/icons/logo.png"
                alt="Had Wedding Logo"
                width={120}
                height={120}
                className='absolute -right-8 -bottom-8 opacity-50'
            />
        </div>
    )
}

export default DashboardCard

