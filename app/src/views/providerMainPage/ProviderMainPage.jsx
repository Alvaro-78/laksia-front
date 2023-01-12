import React from 'react';

import { SideBar } from '../../components/sideBar/SideBar';
import { ShowCardImg } from '../../components/showCardImg/ShowCardImg';

// The mainClass contains the shared elements of the App
import mainClass from '../main.module.css';
// The view with their own class
import classes from './ProviderMainPage.module.css';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';

export const ProviderMainPage = () => {
	return (
		<>
			<div className={mainClass['background-container']}>
				<SideBar />
				<div className={`${mainClass['scroll-container']}`}>
					<BreadCrumb />
					<div className={classes['main-title']}>
						<h1 className={classes['boldFestival']}>Mis Festivales</h1>
					</div>
					<ShowCardImg />
				</div>
			</div>
		</>
	);
};
