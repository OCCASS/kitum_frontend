"use client"

import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

const Layout = () => {
    const [showSidebar, setShowSidebar] = useState(false)

    const closeSidebar = () => {
        document.body.classList.remove("overflow-hidden")
        setShowSidebar(false)
    }

    const toggleSidebar = () => {
        setShowSidebar(prev => {
            if (prev) {
                document.body.classList.remove("overflow-hidden")
            }
            else {
                document.body.classList.add("overflow-hidden")
            }
            return !prev
        })
    }

    return (
        <>
            <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
            <Sidebar close={closeSidebar} show={showSidebar} />
        </>
    )
}

export default Layout;
