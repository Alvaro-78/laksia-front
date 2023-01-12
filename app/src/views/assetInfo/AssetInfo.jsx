// Import the components from React
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import components
import { SideBar } from '../../components/sideBar/SideBar';
import { Button } from '../../components/button/Button';
import { AddElement } from '../../components/addElement/AddElement';
import { CardImg } from '../../components/cardImg/CardImg';

// The mainClass contains the shared elements of the App
import mainClass from '../main.module.css';
// Import de .css (the stylesheet from this page)
import classes from './AssetInfo.module.css';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';

// Function will print and called on App
export const AssetInfo = () => {
	// Get params from url
	const { assetName } = useParams();

	// Get info from Redux store
	const assets = useSelector((state) => state.assetReducer.assets);
	const infoAsset = assets.find((asset) => asset.name === assetName);

	return (
		<>
			<div className={mainClass['background-container']}>
				<SideBar />
				<div className={classes['scroll-container']}>
					<BreadCrumb />
					<div className={classes['grid-container']}>
						{/* Row 1 Column 1 */}
						<div className={classes['title-container-grid']}>
							<h1 className={classes['title']}>Información del Asset</h1>
						</div>
						{/* Row 2 Column 1*/}
						<div className={classes['main-title-name']}>
							<h1 className={classes['title']}>{infoAsset.name}</h1>
							<div className={classes['info-container']}>
								<div className={classes['fest-input']}>Descripción.</div>
								<div className={classes['fest-input']}>
									{infoAsset.description}
								</div>
							</div>
						</div>
						{/* Row 3 */}
						<div className={classes['button-container']}>
							<Button
								styles={classes['button']}
								route="Editar"
								state={infoAsset}>
								Editar
							</Button>
						</div>
						{/* Row 4 */}
						<div className={classes['title-asset-box']}>
							<h1
								className={`${classes['title']} ${classes['title-asset-clean']}`}>
								Activo en
							</h1>
						</div>
						{/* Row 1 Column 2 & Row 2 Column 2 & Row 4 Column 2 & Row 4 Column 2 */}
						<div className={classes['asset-box']}>
							<div className={classes['asset-box-container']}>
								<div className={classes['asset-img']} />
								<div>Asset Preview</div>
							</div>
						</div>
						{/* Row 5 */}
						{/* Mostrar Assets */}
						<div className={classes['assets-display']}>
							{infoAsset.active.map((asset) => {
								return (
									<div className={classes['assets']}>
										<Link
											to="/#"
											style={{
												textDecoration: 'none',
												color: 'black',
											}}
											key={infoAsset.id}>
											<CardImg
												src={infoAsset.img}
												alt={'logo-conciertos'}
												styles={classes['create-asset']}
												name={asset}
											/>
										</Link>
									</div>
								);
							})}
							{/* Añadir Asset */}
							<AddElement
								title="Añadir"
								width="10vw"
								height="10vw"
								iconS="100px"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
