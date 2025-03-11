"use server"

import { getDictionary } from '@/dictionaries';
import Link from 'next/link';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa'

export async function Footer({ params }: { params: Promise<{ lang: "de" | "en" }> }) {
    const lang = (await params).lang
    const dict = (await getDictionary(lang)).footer


    return (
        <div className='w-screen'>
            <div className='bg-zinc-700 py-28 text-white flex flex-col justify-center items-center gap-4'>
                <p className='font-bold text-lg md:text-xl'>© RHEINGOLD SALON GMBH & CO. KG</p>
                <div className='flex space-x-4'>
                    <Link href="https://www.instagram.com/rheingold_salon/" target='_blank'>
                        <FaInstagram className='size-8' />
                    </Link>
                    <Link href="https://www.linkedin.com/company/rheingold-salon/" target="_blank">
                        <FaLinkedinIn className='size-8' />
                    </Link>
                </div>
                <p>
                    <Link className='font-bold text-lg' href="/datenschutz">{dict.data}</Link> -
                    <Link className='font-bold text-lg' href="/impressum"> {dict.impressum}</Link> -
                    <Link className='font-bold text-lg' href="/kontakt"> {dict.contact}</Link></p>
            </div>
        </div>
    );
}
