import Link from 'next/link';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa'

export function Footer() {
    return (
        <div className='bg-zinc-700 px-8 py-28 text-white flex flex-col justify-center items-center gap-4'>
            <p className='font-bold text-xl'>© RHEINGOLD SALON GMBH & CO. KG</p>
            <div className='flex space-x-4'>
                <Link href="https://www.instagram.com/rheingold_salon/" target='_blank'>
                    <FaInstagram className='size-8' />
                </Link>
                <Link href="https://www.linkedin.com/company/rheingold-salon/" target="_blank">
                    <FaLinkedinIn className='size-8' />
                </Link>
            </div>
            <p>
                <Link className='font-bold text-lg' href="/datenschutz">Datenschutz</Link> -
                <Link className='font-bold text-lg' href="/impressum"> Impressum</Link> -
                <Link className='font-bold text-lg' href="/kontakt"> Kontakt</Link></p>
        </div>
    );
}
