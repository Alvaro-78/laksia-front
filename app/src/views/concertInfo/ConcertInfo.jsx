// Import the components from React
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import components
import { SideBar } from '../../components/sideBar/SideBar';
import { Button } from '../../components/button/Button';
import { AddElement } from '../../components/addElement/AddElement';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';
import { Modal } from '../../components/modal/Modal';

// Import the icons
import { PlaceIcon } from '../../assets/icons/PlaceIcon';
import { LanguageIcon } from '../../assets/icons/LanguageIcon';
import { ConfirmationIcon } from '../../assets/icons/ConfirmationIcon';
import { PlayIcon } from '../../assets/icons/PlayIcon';
import { WatchIcon } from '../../assets/icons/WatchIcon';

// CSS classes
import mainClass from '../main.module.css';
import classes from './ConcertInfo.module.css';
import buttonClass from '../../components/button/Button.module.css';

// Redux actions
import { startDeleteConcert } from '../../redux/actions/concertActions';

// Function will print and called on App
export const ConcertInfo = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Get params from url
	const { providerName, concertName } = useParams();

	const encodedConcertName = encodeURIComponent(concertName);
	const returnPath = location.pathname.replace(`/${encodedConcertName}`, '');

	const dispatch = useDispatch();

	// Get info from Redux store
	const concert = useSelector((state) =>
		state.concertReducer.concerts.find(
			(concert) => concert.name === concertName
		)
	);

	const customerId = useSelector(
		(state) =>
			state.customerReducer.customers.find(
				(customer) => customer.name === providerName
			)._id
	);

	const [modalVisibility, setModalVisibility] = useState(false);

	const handleDelete = () => {
		dispatch(startDeleteConcert(customerId, concert));
		navigate(returnPath);
	};

	return (
		<>
			{modalVisibility && (
				<Modal
					setModalVisibility={setModalVisibility}
					handleFunction={handleDelete}
					message="¿Estás seguro de que quieres eliminar el concierto?"
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
							<h1 className={classes['title']}>Información del Concierto</h1>
							<h1>Información de un concierto ya creado</h1>
						</div>
						{/* Row 2 */}
						<div className={classes['main-title-name']}>
							<h1 className={classes['title']}>{concert.name}</h1>
							<div className={classes['info-container']}>
								<div className={classes['fest-input']}>Descripción.</div>
								<div className={classes['fest-input']}>
									{concert.description}
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
									{/* {data.prov.localization} */}
									Localización
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<LanguageIcon />
									</div>
									Página Web
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<ConfirmationIcon />
									</div>
									Venta de Tickets
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<PlayIcon />
									</div>
									Vídeo
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<WatchIcon />
									</div>
								</div>
							</div>
						</div>
						{/* Row 3 Column 2 */}
						<div className={classes['logo']}>
							<div className={classes['logo-container']}>
								<div className={classes['logo-banner-container']}>
									<div className={classes['logo-img']}></div>
									<div>Banner</div>
								</div>
							</div>
						</div>
						{/* Row 4 */}
						<div className={mainClass['button-container']}>
							<Button
								styles={mainClass['button']}
								route="Editar"
								state={{ concert: concert, customerId: customerId }}>
								Editar
							</Button>
							<button
								className={`${buttonClass['button-display']} ${mainClass['button']} ${classes['button-delete']}`}
								onClick={() => setModalVisibility(true)}>
								Eliminar
							</button>
						</div>
						{/* Row 5 */}
						<div className={classes['title-asset-box']}>
							<h1
								className={`${classes['title']} ${classes['title-asset-clean']}`}>
								{' '}
								Cargar Assets
							</h1>
						</div>
						{/* Row 6 */}
						<div className={classes['assets']}>
							{/* Añadir Asset */}
							<AddElement
								text="Añadir asset"
								width="15vw"
								height="15vw"
								iconS="120px"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
