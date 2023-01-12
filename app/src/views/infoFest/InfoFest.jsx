import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AddElement } from '../../components/addElement/AddElement';
import { SideBar } from '../../components/sideBar/SideBar';
import { CardImg } from '../../components/cardImg/CardImg';
import { Button } from '../../components/button/Button';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';
import { Modal } from '../../components/modal/Modal';

import { PlaceIcon } from '../../assets/icons/PlaceIcon';
import { LanguageIcon } from '../../assets/icons/LanguageIcon';
import { ConfirmationIcon } from '../../assets/icons/ConfirmationIcon';
import { PlayIcon } from '../../assets/icons/PlayIcon';
import { WatchIcon } from '../../assets/icons/WatchIcon';

// The mainClass contains the shared elements of the App
import mainClass from '../main.module.css';
import classes from './InfoFest.module.css';
import buttonClass from '../../components/button/Button.module.css';

// Redux actions
import { startDeleteCustomer } from '../../redux/actions/customerActions';
import { startGetRooms } from '../../redux/actions/roomActions';

export const InfoFest = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { providerName } = useParams();

	const customerInfo = useSelector((state) =>
		state.customerReducer.customers.find(
			(customer) => customer.name === providerName
		)
	);

	const rooms = useSelector((state) => state.roomReducer.rooms);

	const [modalVisibility, setModalVisibility] = useState(false);

	const handleDelete = () => {
		dispatch(startDeleteCustomer(customerInfo._id));
		navigate('/provider-main-page');
	};

	useEffect(() => {
		if (rooms.length === 0) {
			dispatch(startGetRooms(customerInfo._id));
		} else if (rooms[0].customerId !== customerInfo._id) {
			dispatch(startGetRooms(customerInfo._id));
		}
	}, []);

	return (
		<>
			{modalVisibility && (
				<Modal
					setModalVisibility={setModalVisibility}
					handleFunction={handleDelete}
					message={
						'¿Estás seguro de que quieres eliminar el festival?\n(Se eliminarán los espacios y conciertos asociados.)'
					}
					mode="delete"
				/>
			)}
			<div className={mainClass['background-container']}>
				<SideBar />
				<div className={mainClass['scroll-container']}>
					<BreadCrumb />
					<div className={classes['grid-container']}>
						{/* Row 1 */}
						<div className={classes['title-container-grid']}>
							<h1 className={classes['title']}>Información del Festival</h1>
							<h1>Información de un Festival ya creado</h1>
						</div>

						{/* Row 2 Column 1*/}
						<div className={classes['main-title-name']}>
							<h1 className={classes['title']}>{customerInfo.name}</h1>
							<div className={classes['info-container']}>
								<div className={classes['fest-input']}>Descripción</div>
								<div className={classes['fest-input']}>
									{customerInfo.description}
								</div>
							</div>
						</div>

						{/* Row 2 Column 2*/}
						<div className={classes['logo']}>
							<div className={classes['logo-container']}>
								<div className={classes['logo-banner-container']}>
									<CardImg
										name=""
										alt="portada"
										styles={classes['card-img']}
										src={customerInfo.logo}
									/>
									<div>Logo</div>
								</div>
							</div>
						</div>
						{/* Row 3 Column 1 */}
						<div className={classes['info']}>
							<div className={classes['info-container']}>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<PlaceIcon />
									</div>
									{customerInfo.localization}
								</div>
								{/* Check is the input is empty (then dont show anything) */}
								{Boolean(customerInfo.link) && (
									<div className={classes['fest-input']}>
										<div className={classes['icon']}>
											<LanguageIcon />
										</div>
										{customerInfo.link}
									</div>
								)}
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<ConfirmationIcon />
									</div>
									{customerInfo.ticket}
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<PlayIcon />
									</div>
									{customerInfo.video}
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<WatchIcon />
									</div>
									{customerInfo.date}
								</div>
							</div>
						</div>

						{/* Row 3 Column 2 */}
						<div className={classes['banner']}>
							<div className={classes['logo-container']}>
								<div className={classes['logo-banner-container']}>
									<CardImg
										name=""
										alt="portada"
										styles={classes['card-img']}
										src={customerInfo.banner}
									/>
									<div>Banner</div>
								</div>
							</div>
						</div>

						{/* Row 4 */}
						<div className={mainClass['button-container']}>
							<Button
								styles={mainClass['button']}
								route="Editar"
								state={customerInfo}>
								Editar
							</Button>
							<button
								className={`${buttonClass['button-display']} ${mainClass['button']} ${classes['button-delete']}`}
								onClick={() => setModalVisibility(true)}>
								Eliminar
							</button>
						</div>

						{/* Row 5 */}
						<div className={classes['title-concert-box']}>
							<h1 className={classes['title']}>Mis espacios</h1>
						</div>

						{/* Row 6 */}
						<div className={classes['space-display']}>
							{rooms.map((room) => {
								return (
									<Link
										key={room._id}
										to={`${room.name}`}
										style={{ textDecoration: 'none', color: 'black' }}>
										<CardImg
											src={room.image}
											alt={'logo espacios'}
											styles={classes['spaces-logo']}
											name={room.name}
										/>
									</Link>
								);
							})}
							<Link
								to="AnadirEspacio"
								style={{ textDecoration: 'none' }}
								state={customerInfo}>
								<AddElement
									text="Añadir espacio"
									width="15vw"
									height="15vw"
									iconS="100px"
									fill="#414141"
								/>
							</Link>
						</div>

						{/* Row 7 */}
						<div className={classes['title-asset-box']}>
							<h1 className={classes['title']}>Cargar Assets</h1>
						</div>

						{/* Row 8 */}
						<div className={classes['assets']}>
							<AddElement
								text="Añadir asset"
								width="15vw"
								height="15vw"
								iconS="100px"
								fill="#414141"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
