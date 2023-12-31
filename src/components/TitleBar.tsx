import React, { ReactNode } from 'react';
import { IoIosArrowBack } from 'react-icons/io';


interface TitleBarProps {
    children: ReactNode;
}

const TitleBar: React.FC<TitleBarProps> = ({ children }) => {
    return (
        <div className='flex justify-between items-center'>
            {/* back icon */}
            <div onClick={( )=> {
                window.history.back();
            }}><IoIosArrowBack /></div>
            
            <h1>{children}</h1>
            <div></div>
        </div>
    );
};

export default TitleBar;
