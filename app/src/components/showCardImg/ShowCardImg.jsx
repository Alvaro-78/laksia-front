import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CardImg } from '../cardImg/CardImg';
import { AddElement } from '../addElement/AddElement';

import classes from './ShowCardImg.module.css';

export const ShowCardImg = () => {
	// Checking the width of the window for AddElement media queries
	const [windowWide, setWindowWide] = useState(window.innerWidth);

	const customers = useSelector((state) => state.customerReducer.customers);
	useEffect(() => {
		const detectSize = () => {
			setWindowWide(window.innerWidth);
		};
		window.addEventListener('resize', detectSize);
		return () => {
			window.removeEventListener('resize', detectSize);
		};
	}, []);

	// dispatch(getFestivales(festivales));
	// dispatch(getAssets(assets));
	// Render the component
	return (
		<>
			<div className={classes['grid-container']}>
				{customers === undefined ? (
					<div className="container">Sin Datos</div>
				) : (
					<>
						{customers.map((customer) => (
							<Link
								className={classes['link-style']}
								to={`${customer.name}`}
								key={customer._id}>
								<CardImg
									styles={classes['img']}
									src={customer.banner}
									alt={'imagen festival'}
									name={customer.name}
								/>
							</Link>
						))}
						<Link to="AnadirFestival" style={{ textDecoration: 'none' }}>
							<AddElement
								text="Añadir festival"
								width={
									windowWide < 992
										? '50vw'
										: windowWide < 1800
										? '25vw'
										: '18vw'
								}
								height={
									windowWide < 992
										? '85vw'
										: windowWide < 1800
										? '35vw'
										: '25vw'
								}
								iconS="100px"
								fill="#414141"
							/>
						</Link>
					</>
				)}
			</div>
		</>
	);
};
