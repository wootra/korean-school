import { NavLink, To, useNavigate } from 'react-router-dom';
import './Nav.css';
import { twMerge } from 'tailwind-merge';
import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navs: [string, To][] = [
    ['Home', '/'],
    ['Classes', '/classes'],
    ['Admin', '/admin'],
    ['Sign In', '/sign-in'],
] as const;

const MobileMenu = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <Dialog>
            <Sheet open={open} onOpenChange={open => setOpen(open)}>
                <SheetTrigger asChild className='w-12 block md:hidden'>
                    <Button variant='ghost' size='icon'>
                        <img
                            src='/logo.png'
                            alt='logo'
                            className='w-full h-full'
                        />
                    </Button>
                </SheetTrigger>
                <SheetContent side='left' className='max-w-52'>
                    <ul className='flex flex-col'>
                        {navs.map(([text, to]) => (
                            <Button
                                key={to as string}
                                variant='ghost'
                                onClick={() => {
                                    navigate(to);
                                    setOpen(false);
                                }}
                            >
                                {text}
                            </Button>
                        ))}
                    </ul>
                </SheetContent>
            </Sheet>
        </Dialog>
    );
};
const KoreanSchoolTextLogo = () => (
    <div className='flex flex-col font-black font-mono leading-none my-auto md:leading-normal'>
        <span aria-hidden>San Antonio</span>
        <span aria-hidden>Korean School</span>
    </div>
);
const Nav = () => {
    return (
        <>
            <nav className='text-white grid grid-cols-[200px_1fr_2rem_2rem] md:grid-cols-[200px_1fr_2rem_2rem] gap-4 px-2'>
                <div className='flex flex-row'>
                    <div>
                        <img
                            src='/logo.png'
                            alt='logo'
                            className='w-12 flex-shrink-0 hidden md:block'
                        />
                        <MobileMenu />
                    </div>

                    <KoreanSchoolTextLogo />
                </div>
                <div className='text-right'>
                    <ul className='hidden md:flex flex-row gap-4 ml-auto h-full'>
                        {navs.map(([text, to]) => (
                            <LinkTo key={to as string} to={to} text={text} />
                        ))}
                    </ul>
                </div>
                <Button variant='ghost' size='icon'>
                    <img src='/logo.png' alt='logo' className='w-full h-full' />
                </Button>
                <Button variant='ghost' size='icon'>
                    <img src='/logo.png' alt='logo' className='w-full h-full' />
                </Button>
            </nav>
        </>
    );
};

const LinkTo = ({ text, to }: { text: string; to: To }) => {
    return (
        <li className='h-full'>
            <NavLink
                to={to}
                className='flex h-full transition-all'
                aria-label={text}
            >
                {text}
                <span>{text}</span>
            </NavLink>
        </li>
    );
};
export default Nav;
