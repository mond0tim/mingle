"use client";

import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import React, { type JSX } from 'react';
import Ripple from "material-web-components-react/ripple";
import FocusRing from "material-web-components-react/focus-ring";
import { Jost, Pixelify_Sans,  } from 'next/font/google';

const pixelifySans = Pixelify_Sans({ subsets: ['latin', 'cyrillic' ]})
const jost = Jost({ subsets: ['latin', 'cyrillic' ]})


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ view = 'primary', fontFamily = 'Geist', ButtonRadius = 'lg', fontWeight = 'regular', size = 'default', children, className, ...props }, ref): JSX.Element => {
		return (
			<button
				ref={ref}
				className={cn(styles.btn, className, {
					[styles.primary]: view == 'primary',
					[styles.outline]: view == 'outline-solid',
					[styles.ghost]: view == 'ghost',
					[styles.geistSans]: fontFamily == 'Geist',
					[styles.geistMono]: fontFamily == 'GeistMono',
					[jost.className]: fontFamily == 'Jost',
					[pixelifySans.className]: fontFamily == 'PixelSans',
					[styles.oddval]: fontFamily == 'Oddval',
					[styles.oddvalItalic]: fontFamily == 'OddvalItalic',
					[styles.raydis]: fontFamily == 'Raydis',
					[styles.bold]: fontWeight == 'bold',
					[styles.regular]: fontWeight == 'regular',
					[styles.light]: fontWeight == 'light',
					[styles.r_none]: ButtonRadius == 'none',
					[styles.r_sm]: ButtonRadius == 'sm',
					[styles.r_md]: ButtonRadius == 'md',
					[styles.r_lg]: ButtonRadius == 'lg',
					[styles.size_default]: size === 'default',
					[styles.size_sm]: size === 'sm',
					[styles.size_lg]: size === 'lg',
					[styles.size_icon]: size === 'icon',
				})}
				{...props}
			>
				{children}
				<Ripple />
				<FocusRing></FocusRing>
			</button>
		);
	}
);

Button.displayName = 'Button';