import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SideBar } from '../../components/sideBar/SideBar';
import { Button } from '../../components/button/Button';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';
import { AddElement } from '../../components/addElement/AddElement';
import { CardImg } from '../../components/cardImg/CardImg';
import { Modal } from '../../components/modal/Modal';

import { PlaceIcon } from '../../assets/icons/PlaceIcon';
import { LanguageIcon } from '../../assets/icons/LanguageIcon';
import { ConfirmationIcon } from '../../assets/icons/ConfirmationIcon';
import { PlayIcon } from '../../assets/icons/PlayIcon';
import { AddIcon } from '../../assets/icons/AddIcon';
import { NotesIcon } from '../../assets/icons/NotesIcon';
import { TitleIcon } from '../../assets/icons/TitleIcon';
import { WatchIcon } from '../../assets/icons/WatchIcon';

// The mainClass contains the shared elements of the App
import mainClass from '../main.module.css';
import classes from './AddInfoFest.module.css';
import buttonClass from '../../components/button/Button.module.css';

// Redux actions
import { startAddCustomer } from '../../redux/actions/customerActions';

export const AddInfoFest = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const location = useLocation();
	const returnPath = location.pathname.replace('/AnadirFestival', '');

	// Use of States for change the values
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState(new Date().toDateString());
	const [link, setLink] = useState('');
	const [video, setVideo] = useState('');
	const [ticket, setTicket] = useState('');
	const [geolocation] = useState({
		latitude: 0,
		longitude: 0,
		name: '',
	});
	const [assets] = useState([]);

	const [localization, setLocalization] = useState('');

	const [logo, setLogo] = useState('');
	const [banner, setBanner] = useState('');

	const [hidden1, setHidden1] = useState(true);
	const [hidden2, setHidden2] = useState(true);

	const [errorMessage1, setErrorMessage1] = useState('Error');
	const [errorMessage2, setErrorMessage2] = useState('Error');

	const [modalVisibility, setModalVisibility] = useState(false);

	// Get customers from the state to check if one exists with the same name
	const customers = useSelector((state) => state.customerReducer.customers);

	const checkCustomer = () => {
		let exists = false;

		customers.forEach((customer) => name === customer.name && (exists = true));

		if (exists) {
			setModalVisibility(true);
		} else {
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		const customer = {
			name,
			description,
			localization,
			date,
			ticket,
			video,
			logo,
			banner,
			link,
			geolocation,
			assets,
		};
		await dispatch(startAddCustomer(customer));
		navigate(returnPath);
	};

	const convertBase64 = async (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const changeImage = async (e) => {
		const file = e.target.files[0];
		const id = e.target.id;
		const base64 = await convertBase64(file);

		if (!file.type.startsWith('image/')) {
		} else {
			if (id === 'logo') setLogo(base64);

			if (id === 'banner') setBanner(base64);
			return true;
		}
	};

	// Autoresize the textarea
	function autoResize(e) {
		e.style.height = '40px';
		e.style.height = e.scrollHeight + 'px';
	}
	// This will run after the view is rendered
	// This is for scalate the input height from the text inside him
	useEffect(() => {
		document.querySelectorAll('textarea[type=text]').forEach((element) => {
			autoResize(element);
		});
	});

	// Return the view
	return (
		<>
			{modalVisibility && (
				<Modal
					setModalVisibility={setModalVisibility}
					message="Ya existe un festival con ese nombre"
					mode="message"
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
							<h1>Crear un Festival</h1>
						</div>

						{/* Row 2 Column 2*/}
						<div className={classes['logo']}>
							<h1>Añadir festival</h1>
							<div className={classes['banner-container']}>
								<div className={classes['logo-banner-container']}>
									<div className={classes['add-img-title']}>Portada</div>
									<div
										className={logo === '' ? classes['add-img'] : ''}
										onClick={() => document.getElementById('logo').click()}>
										<input
											id="logo"
											type="file"
											accept=".jpg, .jpeg, .png"
											hidden={true}
											onChange={(e) => setHidden1(changeImage(e))}
											required
										/>
										{logo === '' ? (
											<AddIcon height="100px" width="100px" fill="#414141" />
										) : (
											<CardImg
												name=""
												alt="portada"
												styles={classes['card-img']}
												src={logo}
											/>
										)}
									</div>
									<div className={classes['add-img-message']}>
										La imagen seleccionada no debe superar 16MB de espacio.
									</div>
									<div
										className={classes['add-img-error-message']}
										style={hidden1 ? { visibility: 'hidden' } : undefined}>
										{errorMessage1}
									</div>
								</div>
							</div>
						</div>
						{/* Row 3 Column 1 */}
						<div className={classes['info']}>
							<div className={classes['info-container']}>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<TitleIcon />
									</div>
									<textarea
										role="input"
										type="text"
										value={name}
										placeholder={'Nombre'}
										onChange={(e) => {
											setName(e.target.value);
										}}
										required
									/>
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<NotesIcon />
									</div>
									<textarea
										role="input"
										type="text"
										value={description}
										placeholder={'Descripción'}
										onChange={(e) => {
											setDescription(e.target.value);
											autoResize(e.target);
										}}
									/>
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<PlaceIcon />
									</div>
									<textarea
										role="input"
										type="text"
										value={localization}
										placeholder={'Localización'}
										onChange={(e) => {
											setLocalization(e.target.value);
										}}
									/>
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<LanguageIcon />
									</div>
									<textarea
										role="input"
										type="text"
										value={link}
										placeholder={'Página Web'}
										onChange={(e) => {
											setLink(e.target.value);
										}}
									/>
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<ConfirmationIcon />
									</div>
									<textarea
										role="input"
										type="text"
										value={ticket}
										placeholder={'Venta de Tickets'}
										onChange={(e) => {
											setTicket(e.target.value);
										}}
									/>
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<PlayIcon />
									</div>
									<textarea
										role="input"
										type="text"
										value={video}
										placeholder={'Vídeo'}
										onChange={(e) => {
											setVideo(e.target.value);
										}}
									/>
								</div>
								<div className={classes['fest-input']}>
									<div className={classes['icon']}>
										<WatchIcon />
									</div>
									<textarea
										role="input"
										type="text"
										value={date}
										placeholder={'Horario'}
										onChange={(e) => {
											setDate(e.target.value);
										}}
									/>
								</div>
							</div>
						</div>

						{/* Row 3 Column 2 */}
						<div className={classes['banner']}>
							<div className={classes['banner-container']}>
								<div className={classes['logo-banner-container']}>
									<div className={classes['add-img-title']}>Banner</div>
									<div
										className={banner === '' ? classes['add-img'] : ''}
										onClick={() => document.getElementById('banner').click()}>
										<input
											id="banner"
											type="file"
											accept=".jpg, .jpeg, .png"
											hidden={true}
											onChange={(e) => setHidden2(changeImage(e))}
										/>
										{banner === '' ? (
											<AddIcon height="100px" width="100px" fill="#414141" />
										) : (
											<CardImg
												name=""
												alt="portada"
												styles={classes['card-img']}
												src={banner}
											/>
										)}
									</div>
									<div className={classes['add-img-message']}>
										La imagen seleccionada no debe superar 16MB de espacio.
									</div>
									<div
										className={classes['add-img-error-message']}
										style={hidden2 ? { visibility: 'hidden' } : undefined}>
										{errorMessage2}
									</div>
								</div>
							</div>
						</div>
						{/* Row 4 - Load Assets title */}
						<div className={classes['title-asset-grid']}>
							<h1 className={classes['title']}> Cargar Assets</h1>
						</div>
						{/* Row 5 Assets grid*/}
						<div className={classes['assets']}>
							<AddElement
								text="Añadir asset"
								width="15vw"
								height="15vw"
								iconS="100px"
								fill="#414141"
							/>
						</div>
						{/* Row 6 - Buttons */}
						<div className={mainClass['button-container']}>
							<Button
								styles={`${mainClass['button']} ${classes['button-cancel']} `}
								route={returnPath}>
								Cancelar
							</Button>
							{/* <Button styles={`${mainClass['button']} ${classes['button-save']} `}>Crear</Button> */}
							<button
								className={`${buttonClass['button-display']} ${mainClass['button']} ${classes['button-save']}`}
								onClick={() => checkCustomer()}>
								Añadir
							</button>
						</div>
						{/* Row 7 - Spacer */}
						<div className={classes['spacer']} />
					</div>
				</div>
			</div>
		</>
	);
};
