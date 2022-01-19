import React from 'react'

interface SideBarProps {
    headingText?: string;
}

export function SideBar({ headingText = 'Header' }: SideBarProps) {

    return (
        <div className="sidebar">
            <div className='icon-circle'></div>
            <div className='icon-circle'></div>
            <div className='icon-circle'></div>
            <div className='icon-circle'></div>
            <div className='icon-circle icon-circle__bottom'></div>
        </div>
    )
}