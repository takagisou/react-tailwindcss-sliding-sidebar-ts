import React, {FC} from "react";
import Transition from "./Transition";
import FocusTrap from "./FocusTrap";
import {Link} from "react-router-dom";

export type LinkItem = {
    name: string;
    path: string;
}

export type MenuProps = {
    links: LinkItem[];
    isClosed: boolean;
    setClosed: (closed: boolean) => void,
    isStatic: boolean;
}

const Menu: FC<MenuProps> = (props) => {
    const {links, isStatic, isClosed, setClosed, children} = props

    return (
        <div className="bg-gray-100 flex">
            <Transition
                show={isStatic || !isClosed}
                enter="transition-all duration-500"
                enterFrom="-ml-64"
                enterTo="ml-0"
                leave="transition-all duration-500"
                leaveTo="-ml-64"
            >
                <aside className={`z-20 bg-white w-64 min-h-screen flex flex-col ${
                    isStatic ? '' : 'fixed'
                }`}>
                    <FocusTrap isActive={!isStatic}>

                        <div className="bg-white border-r border-b px-4 h-10 flex items-center justify-between">
                            <span className="text-blue py-2">Application</span>
                            {!isStatic && (
                                <button
                                    aria-label="Close menu"
                                    title="Close menu"
                                    className="w-10 p-1"
                                    onClick={() => setClosed(true)}>
                                    <svg
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="border-r flex-grow">
                            <nav>
                                <ul>
                                    {links.map((link) => (
                                        <li className="p-3">
                                            <button>
                                                <Link to={link.path}>{link.name}</Link>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </FocusTrap>
                </aside>
            </Transition>
            <Transition
                appear={true}
                show={!isStatic && !isClosed}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-50"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-50"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black opacity-0"/>
            </Transition>
            <main className="flex-grow flex flex-col min-h-screen">
                <header className="bg-white border-b h-10 flex items-center justify-center">
                    {!isStatic && (
                        <button
                            tabIndex={1}
                            aria-hidden={!isClosed}
                            aria-label="Open menu"
                            title="Open menu"
                            className="w-10 p-1"
                            onClick={() => setClosed(false)}>
                            <svg
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    )}

                    {children}
                </header>
            </main>
        </div>
    )
}

export default Menu