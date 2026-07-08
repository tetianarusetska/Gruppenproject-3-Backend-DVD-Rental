import { Link } from "react-router-dom"

export default function Content() {
    return (
        <div className='bg-(--bgColor) py-8 px-12 h-full w-full flex flex-col justify-between'>
            <Section1 />
            <Section2 />
        </div>
    )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}

const Section2 = () => {

    return (
        <div className='flex flex-col justify-start items-start gap-10 text-(--mainColor)'>
            <h1 className='text-[8vw] leading-[0.8] mt-10 font-["Kosmos"] text-purple-600'>RetroVision Video</h1>
            <div className='flex flex-row justify-between items-end'>
                <p className='text-[8vw] leading-[0.8] mt-10 font-[BebasNeue]'> Dein Film. Deine Wahl.</p>
                <p className='font-bold font-[BebasNeue]'>©2026</p>
            </div>
        </div>
    )
}

const Nav = () => {
    return (
        <div className='flex shrink-0 gap-20'>
            <div className='flex flex-col gap-2 font-["BebasNeue"] text-[26px] text-(--mainColor)'>
                <Link to="/" className='mb-1  uppercase text-[28px]'>MENU</Link>
                <Link to="/">MenuPunkt 1</Link>
                <Link to="/">MenuPunkt 2</Link>
                <Link to="/">MenuPunkt 3</Link>
            </div>
            <div className='flex flex-col gap-2 font-["BebasNeue"] text-[26px] text-(--mainColor)'>
                <Link to="/" className='mb-1 uppercase text-[28px]'>MENU</Link>
                <Link to="/">MenuPunkt 1</Link>
                <Link to="/">MenuPunkt 2</Link>
            </div>
            <div className='flex flex-col gap-2 font-["BebasNeue"] text-[26px] text-(--mainColor)'>
                <h3 className='mb-1 uppercase   text-[28px]'>Rechtliches</h3>
                <Link to="/">Impressum</Link>
                <Link to="/">Datenschutz</Link>
                <Link to="/">Kontakt</Link>
            </div>
        </div>
    )
}