import React from 'react';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';

import { SideBar } from '../../components/sideBar/SideBar';

import classes from './Notifications.module.css';

import notificationsSoon from '../../assets/img/notifications_soon.svg';

export const Notifications = () => {
	return (
		<>
			<div className={classes['background-container']}>
				<SideBar />
				<div className={` ${classes['scroll-container']}`}>
					<BreadCrumb />
					<div className={classes['main-title']}>
						<h1 className={classes['bold-title']}>Notificaciones</h1>
					</div>
					<div className={classes['image-container']}>
						<img src={notificationsSoon} />
					</div>
				</div>
			</div>
		</>
	);
};
