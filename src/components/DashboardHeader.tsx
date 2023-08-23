import React, { ReactNode } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

interface DashboardHeaderProps {
    children: ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ children }) => {
    return (
        <div className='flex justify-between items-center m-special-x'>
            <h1 className='amount'>{children}</h1>
            <RxHamburgerMenu />
        </div>
    );
};

export default DashboardHeader;
