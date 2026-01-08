import React, { FC } from 'react';
import s from './Slider.module.css';

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

const Slider: FC<SliderProps> = ({
                                     value,
                                     onChange,
                                     min = 0,
                                     max = 100,
                                     step = 1
                                 }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className={s.slider_container}>
            <input
                className={s.slider_input}
                type="range"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
            />
        </div>
    );
};

export default Slider;
