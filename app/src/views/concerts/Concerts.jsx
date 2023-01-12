import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SideBar } from '../../components/sideBar/SideBar';
import { Button } from '../../components/button/Button';
import { CardImg } from '../../components/cardImg/CardImg';
import { AddElement } from '../../components/addElement/AddElement';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';
import { Modal } from '../../components/modal/Modal';

import { ConfirmationIcon } from '../../assets/icons/ConfirmationIcon';
import { LanguageIcon } from '../../assets/icons/LanguageIcon';
import { PlaceIcon } from '../../assets/icons/PlaceIcon';
import { PlayIcon } from '../../assets/icons/PlayIcon';
import { WatchIcon } from '../../assets/icons/WatchIcon';

// CSS classes
import mainClass from '../main.module.css';
import classes from './Concerts.module.css';
import buttonClass from '../../components/button/Button.module.css';

// Redux actions
import { startDeleteRoom } from '../../redux/actions/roomActions';
import { startGetConcerts } from '../../redux/actions/concertActions';

export const Concerts = () => {
	const dispatch = useDispatch();

	const location = useLocation();
	const navigate = useNavigate();

	const { spaceName } = useParams();

	const encodedSpaceName = encodeURIComponent(spaceName);
	const returnPath = location.pathname.replace(`/${encodedSpaceName}`, '');

	const room = useSelector((state) =>
		state.roomReducer.rooms.find((room) => room.name === spaceName)
	);

	const concerts = useSelector((state) => state.concertReducer.concerts);

	const [modalVisibility, setModalVisibility] = useState(false);

	useEffect(() => {
		if (concerts.length === 0) {
			dispatch(startGetConcerts(room.customerId, room._id));
		} else if (concerts[0].roomId !== room._id) {
			dispatch(startGetConcerts(room.customerId, room._id));
		}
	}, []);

	const handleDelete = () => {
		dispatch(startDeleteRoom(room));
		navigate(returnPath);
	};

	return (
		<>
			{modalVisibility && (
				<Modal
					setModalVisibility={setModalVisibility}
					handleFunction={handleDelete}
					message={
						'¿Estás seguro de que quieres eliminar el espacio?\n(Se eliminarán los conciertos asociados.)'
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
							<h1 className={classes['title']}>Información del Espacio</h1>
							<h1>Concerts ya creados</h1>
						</div>

						{/* Row 2 */}
						<div className={classes['main-title-name']}>
							<h1 className={classes['title']}>{room.name}</h1>
							<div className={classes['info-container']}>
								<div className={classes['fest-input']}>Descripción</div>
								<div className={classes['fest-input']}>{room.description}</div>
							</div>
						</div>

						{/* Row 3 Column 1 */}
						<div className={classes['info']}>
							<div className={classes['info-container']}>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<PlaceIcon />
									</div>
									{room.localization}
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<LanguageIcon />
									</div>
									{room.link}
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<ConfirmationIcon />
									</div>
									{room.ticket}
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<PlayIcon />
									</div>
									{room.video}
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<WatchIcon />
									</div>
									{room.date}
								</div>
							</div>
						</div>

						{/* Row 3 Column 2 */}
						<div className={classes['logo']}>
							<div className={classes['logo-container']}>
								<div className={classes['logo-banner-container']}>
									<CardImg
										src={room.image}
										alt="banner"
										styles={classes['card-img']}
										name=""
									/>
									<div>Banner</div>
								</div>
							</div>
						</div>

						{/* Row 4 */}
						<div className={mainClass['button-container']}>
							<Button styles={mainClass['button']} route="Editar" state={room}>
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
							<h1 className={classes['title']}>Mis Conciertos</h1>
						</div>

						{/* Row 6 */}
						<div className={classes['spaces']}>
							{concerts.map((concert) => {
								return (
									<Link
										to={`${concert.name}`}
										style={{ textDecoration: 'none', color: 'black' }}>
										<CardImg
											src={concert.image}
											key={concert._id}
											alt={'logo-conciertos'}
											styles={classes['spaces-logo']}
											name={concert.name}
										/>
									</Link>
								);
							})}
							<Link
								to="AnadirConcierto"
								style={{ textDecoration: 'none' }}
								state={room}>
								<AddElement
									text="Añadir concierto"
									width="15vw"
									height="15vw"
									iconS="100px"
									fill="#414141"
								/>
							</Link>
						</div>

						{/* Row 7 */}
						<div className={classes['title-asset-box']}>
							<h1 className={classes['title']}> Cargar Assets</h1>
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
