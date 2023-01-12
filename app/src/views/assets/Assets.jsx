import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';

import { CardImg } from '../../components/cardImg/CardImg';
import { SideBar } from '../../components/sideBar/SideBar';

import classes from './Assets.module.css';

export const Assets = () => {
	const assets = useSelector((state) => state.assetReducer.assets);

	return (
		<>
			<div className={classes['background-container']}>
				<SideBar />
				<div className={` ${classes['scroll-container']}`}>
					<BreadCrumb />
					<div className={classes['main-title']}>
						<h1 className={classes['bold-title']}>Mis Assets</h1>
					</div>
					<div className={classes['grid-container']}>
						{assets.map((asset) => (
							<Link
								to={`${asset.name}`}
								style={{ textDecoration: 'none', color: 'black' }}
								key={asset.id}>
								<CardImg
									src={asset.img}
									alt={'logo-asset'}
									styles={classes['asset-logo']}
									name={asset.name}
								/>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
