import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
	view?: 'outline-solid' | 'primary' | 'ghost';
	fontWeight?: 'bold' | 'regular' | 'light';
	fontFamily?: 'Jost' | 'Geist' | 'GeistMono' | 'PixelSans' | 'Oddval' | 'OddvalItalic' | 'Raydis';
	ButtonRadius?: 'none' | 'sm' | 'md'| 'lg';
	size?: 'default' | 'sm' | 'lg' | 'icon' | string;
}