import React from 'react';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';

import { SideBar } from '../../components/sideBar/SideBar';

import classes from './Anallitics.module.css';

import analiticsSoon from '../../assets/img/analitics_soon.svg';

export const Analitics = () => {
	return (
		<>
			<div className={classes['background-container']}>
				<SideBar />
				<div className={` ${classes['scroll-container']}`}>
					<BreadCrumb />
					<div className={classes['main-title']}>
						<h1 className={classes['bold-title']}>Mis Analíticas</h1>
					</div>
					<div className={classes['image-container']}>
						<img src={analiticsSoon}/>
					</div>
				</div>
			</div>
		</>
	);
};
