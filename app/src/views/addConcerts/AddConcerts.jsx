import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SideBar } from '../../components/sideBar/SideBar';
import { Button } from '../../components/button/Button';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';
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
import classes from './AddConcerts.module.css';
import buttonClass from '../../components/button/Button.module.css';

// Redux actions
import { startAddRoom } from '../../redux/actions/roomActions';

export const AddConcerts = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const data = location.state;
	const returnPath = location.pathname.replace('/AnadirEspacio', '');
	// Use of States for change the values
	const customerId = data._id;
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [localization, setLocalization] = useState('');
	const [date, setDate] = useState(new Date().toDateString());
	const [link, setLink] = useState('');
	const [video, setVideo] = useState('');
	const [ticket, setTicket] = useState('');
	const [geolocation] = useState({
		latitude: 0,
		longitude: 0,
		name: '',
	});
	const [concerts] = useState([]);
	const [assets] = useState([]);

	const [image, setImage] = useState(null);

	const [errorMessage, setErrorMessage] = useState('Error');
	const [hidden, setHidden] = useState(true);

	const [modalVisibility, setModalVisibility] = useState(false);
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

	// Get rooms from the state to check if one exists with the same name
	const rooms = useSelector((state) => state.roomReducer.rooms);

	const checkRoom = () => {
		let exists = false;

		rooms.forEach((room) => name === room.name && (exists = true));

		if (exists) {
			setModalVisibility(true);
		} else {
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		const room = {
			name,
			description,
			geolocation,
			localization,
			link,
			date,
			video,
			ticket,
			image,
			concerts,
			assets,
		};
		await dispatch(startAddRoom(customerId, room));
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
		const base64 = await convertBase64(file);

		if (!file.type.startsWith('image/')) {
			setErrorMessage('El archivo seleccionado no es una imagen.');
			return false;
		} else if (file.size > 16777216) {
			setErrorMessage('El archivo seleccionado supera el tamaño permitido.');
			return false;
		} else {
			setImage(base64);
			return true;
		}
	};

	// Return the view
	return (
		<>
			{modalVisibility && (
				<Modal
					setModalVisibility={setModalVisibility}
					message="Ya existe un espacio con ese nombre"
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
							<h1 className={classes['title']}>Información del Espacio !!!!</h1>
							<h1>Añadir un Espacio</h1>
						</div>

						{/* Row 2 */}
						{/* NULL */}

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
											autoResize(e.target);
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
										className={image === null ? classes['add-img'] : ''}
										onClick={() => document.getElementById('img').click()}>
										<input
											id="img"
											type="file"
											accept=".jpg, .jpeg, .png"
											hidden={true}
											onChange={(e) => setHidden(changeImage(e))}
										/>
										{image === null ? (
											<AddIcon height="100px" width="100px" fill="#414141" />
										) : (
											<CardImg
												name=""
												alt="portada"
												styles={classes['card-img']}
												src={image}
											/>
										)}
									</div>
									<div className={classes['add-img-message']}>
										La imagen seleccionada no debe superar 16MB de espacio.
									</div>
									<div
										className={classes['add-img-error-message']}
										style={hidden ? { visibility: 'hidden' } : undefined}>
										{errorMessage}
									</div>
								</div>
							</div>
						</div>

						{/* Row 4 - Buttons */}
						<div className={mainClass['button-container']}>
							<Button
								styles={`${mainClass['button']} ${classes['button-cancel']} `}
								route={returnPath}>
								Cancelar
							</Button>
							{/* <Button styles={`${mainClass['button']} ${classes['button-save']} `}>Añadir</Button> */}
							<button
								className={`${buttonClass['button-display']} ${mainClass['button']} ${classes['button-save']}`}
								onClick={() => checkRoom()}>
								Añadir
							</button>
						</div>

						{/* Row 5 - Spacer */}
						<div className={classes['spacer']} />
					</div>
				</div>
			</div>
		</>
	);
};
