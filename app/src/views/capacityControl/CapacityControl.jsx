import React from 'react';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';

import { SideBar } from '../../components/sideBar/SideBar';

import classes from './CapacityControl.module.css';

import capacityControlSoon from '../../assets/img/capacityControl_soon.svg';

export const CapacityControl = () => {
	return (
		<>
			<div className={classes['background-container']}>
				<SideBar />
				<div className={` ${classes['scroll-container']}`}>
					<BreadCrumb />
					<div className={classes['main-title']}>
						<h1 className={classes['bold-title']}>Control de aforos</h1>
					</div>
					<div className={classes['image-container']}>
						<img src={capacityControlSoon} />
					</div>
				</div>
			</div>
		</>
	);
};
