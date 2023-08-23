import React, { ReactNode } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

interface DashboardHeaderProps {
    children: ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ children }) => {
    return (
        <div className='flex justify-between items-center m-special-x'>
            <h1 className='amount'>{children}</h1>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                    as="span" 
                    color={undefined}
                    >
                       <RxHamburgerMenu />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="settings">Settings</DropdownItem>
                    <DropdownItem key="logout" className="text-danger" color="danger">
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            
        </div>
    );
};

export default DashboardHeader;
