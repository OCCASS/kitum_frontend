"use client"

import React, {ReactNode, useState} from "react";
import Header from "./Header";
import Sidebar from "@/components/Sidebar/Sidebar";

const Layout = ({children}: { children: ReactNode }) => {
    const [showSidebar, setShowSidebar] = useState(false)

    const closeSidebar = () => {
        document.body.classList.remove("overflow-hidden")
        setShowSidebar(false)
    }

    const toggleSidebar = () => {
        setShowSidebar(prev => {
            if (prev) {
                document.body.classList.remove("overflow-hidden")
            } else {
                document.body.classList.add("overflow-hidden")
            }
            return !prev
        })
    }

    return (
        <>
            <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar}/>
            <Sidebar close={closeSidebar} show={showSidebar}/>
            <main className="w-full h-full-without-header md:ps-64">
                {children}
            </main>
        </>
    )
}

export default Layout;
