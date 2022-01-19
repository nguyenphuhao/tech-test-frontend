import React from 'react'



export const Header: React.FunctionComponent = (props) => {

    return (
        <div className="header">
                {props.children}
        </div>
    )
}