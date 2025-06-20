"use client";

import { FE_DASHBOARD, FE_LOGIN } from "@/app/constant/endpoint-fe";
import { URL_DEFAULT_PROFILE, URL_SIPD_LOGO } from "@/app/constant/general";
import { SURE_TO_LOGOUT } from "@/app/constant/message";
import { UserResponse } from "@/app/dto/response/user-response";
import { removeCookieLogin } from "@/app/util/cookie";
import { showConfirmDialog } from "@/app/util/sweet-alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuPortal, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OfficeTopbarProps {
    setIsSidebarOpen: () => void;
}

export default function OfficeTopbar(props: Readonly<OfficeTopbarProps>) {
    const [user, setUser] = useState<UserResponse>();
    const [isDropdownProfileOpen, setIsDropdownProfileOpen] = useState<boolean>(false);
    const [urlLogo, setUrlLogo] = useState<string>(URL_SIPD_LOGO);
    const router = useRouter();

    useEffect(() => {
        const fetchUserByHeader = async (): Promise<void> => {
            const response: UserResponse = {
                id: 1,
                name: "Super Admin",
                username: "superadmin",
                role: {
                    id: 1,
                    name: "superadmin",
                },
            };
            setUser(response);
        };

        fetchUserByHeader();
        setUrlLogo(URL_SIPD_LOGO);
    }, []);

    const handleLogout = async () => {
        setIsDropdownProfileOpen(false);
        const result = await showConfirmDialog(SURE_TO_LOGOUT);
        if (result.isConfirmed) {
            try {
                removeCookieLogin();
            } catch (error) {
                console.error(error);
            } finally {
                router.push(FE_LOGIN);
            }
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-start items-center">
                    <button onClick={props.setIsSidebarOpen} className="p-2 mr-2 rounded-lg cursor-pointer md:hidden text-primary-700 hover:text-primary-600 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100">
                        <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <svg aria-hidden="true" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Toggle sidebar</span>
                    </button>
                    <Link href={FE_DASHBOARD} className="flex items-center">
                        <Image key={"logo"} className="w-auto h-9 mr-3" src={urlLogo} alt="SIPD Logo" width={100} height={36} priority unoptimized />
                        <span className="hidden md:block self-center text-primary-800 text-xl font-semibold whitespace-nowrap">Penggajian</span>
                    </Link>
                </div>
                <div className="flex items-center gap-1">
                    <button type="button" className="p-2 text-primary-700 rounded-lg hover:text-primary-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300">
                        <span className="sr-only">View notifications</span>
                        <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                    <button type="button" className="p-2 text-primary-700 rounded-lg hover:text-primary-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300">
                        <span className="sr-only">View notifications</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <DropdownMenu open={isDropdownProfileOpen} onOpenChange={() => setIsDropdownProfileOpen(!isDropdownProfileOpen)}>
                        <DropdownMenuTrigger type="button" className="outline-none hover:bg-gray-100 px-2 py-1 rounded-lg">
                            <span className="sr-only">Open user menu</span>
                            <Image className="w-8 h-8 rounded-full border border-gray-200 object-cover" src={URL_DEFAULT_PROFILE} alt="profile" width={100} height={100} priority unoptimized />
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuContent className="mt-5 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow rounded-lg">
                                <div className="py-3 px-4">
                                    <span className="block text-sm font-semibold text-gray-900">{user?.name}</span>
                                    <span className="block text-sm text-gray-900 truncate">{user?.username}</span>
                                </div>
                                <ul className="py-1 text-gray-700">
                                    <li>
                                        <Link href="/office/user/profile" onClick={() => setIsDropdownProfileOpen(false)} className="block py-2 px-4 text-sm text-gray-700 hover:text-white hover:bg-primary-700 transition ease-in duration-200">
                                            My profile
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="py-1 text-gray-700">
                                    <li>
                                        <Link onClick={handleLogout} href="#" className="block py-2 px-4 text-sm text-gray-700 hover:text-white hover:bg-primary-700 transition ease-in duration-200">
                                            Keluar
                                        </Link>
                                    </li>
                                </ul>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
