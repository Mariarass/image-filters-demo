import React, { FC, ReactNode } from 'react';
import s from './LaptopContainer.module.css'
interface LaptopContainerProps {
    children: ReactNode;
}

const LaptopContainer: FC<LaptopContainerProps> = ({ children }) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    );
};

export default LaptopContainer;
