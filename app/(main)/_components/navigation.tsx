"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const isResisingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<'aside'>>(null);
    const navbarRef = useRef<ElementRef<'div'>>(null);

    const [isReseting, setIsReseting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    },[isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile])

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation()

        isResisingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResisingRef.current) return;

        let newWidth = e.clientX;

        if (newWidth < 240) {
            newWidth = 240;
        }

        if (newWidth > 480) {
            newWidth = 480;
        }

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty('left', `${newWidth}px`);
            navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
        }
    }

    const handleMouseUp = () => {
        isResisingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsReseting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : `240px`;
            navbarRef.current.style.setProperty('width', isMobile ? '0' : `calc(100% - 240px)`);
            navbarRef.current.style.setProperty('left', isMobile ? '0' : `240px`);
            setTimeout(() => {
                setIsReseting(false)
            }, 300)
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsReseting(true);

            sidebarRef.current.style.width = `0`;
            navbarRef.current.style.setProperty('width', `100%`);
            navbarRef.current.style.setProperty('left', `0`);
            setTimeout(() => {
                setIsReseting(false)
            }, 300)
        }
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={
                    cn(
                        "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                        isReseting && 'transition-all duration-300 ease-in-out',
                        isMobile && 'w-0',
                    )
                }>
                <div
                    role='button'
                    onClick={collapse}
                    className={
                        cn(
                            "w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition cursor-pointer",
                            isMobile && 'opacity-100',

                        )
                    }
                >
                    <ChevronLeft className="w-6 h-6" />
                </div>
                <div>
                    <p>Action Item</p>
                </div>
                <div className="mt-4">
                    <p>Document</p>
                </div>
                <div 
                onMouseDown={handleMouseDown}
                onClick={resetWidth}
                className='opacity-0 group-hover/sidebar:opacity-10 transition-all cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0' />
            </aside>
            <div
                ref={navbarRef}
                className={
                    cn("absolute top-0 left-60 w-[calc(100%-240px)] z-[99999]",
                        isReseting && 'transition-all duration-300 ease-in-out',
                        isMobile && 'left-0 w-full')
                }
            >
                <nav className='bg-transparent px-3 py-2 w-full'>
                    {isCollapsed && <MenuIcon onClick={resetWidth} role='button' className="w-6 h-6 text-muted-foreground" />}
                </nav>

            </div>
        </>
    )

}
