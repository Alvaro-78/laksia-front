import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

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

// Watch Icon
import { WatchIcon } from '../../assets/icons/WatchIcon';

// The mainClass contains the shared elements of the App
import mainClass from '../main.module.css';
import classes from './EditConcerts.module.css';
import buttonClass from '../../components/button/Button.module.css';

import { startEditRoom } from '../../redux/actions/roomActions';

export const EditConcerts = () => {
	const dispatch = useDispatch();
	// JSON
	const navigate = useNavigate();
	const location = useLocation();
	const data = location.state;
	const _id = data._id;
	const assets = data.assets;
	const returnPath = location.pathname.replace('/Editar', '');
	// Use of States for change the values
	const [name, setName] = useState(data.name);
	const [description, setDescription] = useState(data.description);
	const [geolocation] = useState(data.geolocation);
	const [localization, setLocalization] = useState(data.localization);
	const [link, setLink] = useState(data.link);
	const [image, setImage] = useState(data.image);
	const [ticket, setTicket] = useState(data.ticket);
	const [date, setDate] = useState(data.date);
	const [video, setVideo] = useState(data.video);

	const [hidden, setHidden] = useState(true);
	const [errorMessage, setErrorMessage] = useState('Error');

	const [modalVisibility1, setModalVisibility1] = useState(false);
	const [modalVisibility2, setModalVisibility2] = useState(false);
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
	let rooms = useSelector((state) => state.roomReducer.rooms);
	rooms = rooms.filter((room) => room._id !== _id);

	const checkRoom = () => {
		let exists = false;

		rooms.forEach((room) => name === room.name && (exists = true));

		if (exists) {
			setModalVisibility2(true);
		} else {
			setModalVisibility1(true);
		}
	};

	const handleSubmit = async () => {
		const room = {
			_id,
			name,
			description,
			localization,
			date,
			video,
			ticket,
			image,
			link,
			geolocation,
			assets,
		};
		await dispatch(startEditRoom(data.customerId, room));
		const newPath = location.pathname.replace(
			`${encodeURIComponent(data.name)}/Editar`,
			''
		);
		navigate(newPath + name);
	};

	// Coding images

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

		// Coding images to base64
		const base64 = await convertBase64(file);

		if (!file.type.startsWith('image/')) {
		} else {
			if (id === 'img') setImage(base64);

			return true;
		}
		return base64;
	};
	// Return the view
	return (
		<>
			{modalVisibility1 && (
				<Modal
					setModalVisibility={setModalVisibility1}
					handleFunction={handleSubmit}
					message="¿Estás seguro de que quieres guardar los cambios?"
					mode="edit"
				/>
			)}
			{modalVisibility2 && (
				<Modal
					setModalVisibility={setModalVisibility2}
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
							<h1 className={classes['title']}>Información del Espacio</h1>
							<h1>Editar Espacio ya creado</h1>
						</div>

						{/* Row 2 Column 2*/}
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
										onChange={(e) => {
											setDescription(e.target.value);
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
										placeholder="Localización"
										value={localization}
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
										className={image === '' && classes['add-img']}
										onClick={() => document.getElementById('img').click()}>
										<input
											type="file"
											id="img"
											accept=".jpg, .jpeg, .png"
											hidden={true}
											onChange={(e) => setHidden(changeImage(e))}
										/>
										<CardImg
											name=""
											alt="portada"
											styles={classes['card-img']}
											src={image}
										/>
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
						{/* Row 4 */}
						<div className={mainClass['button-container']}>
							<Button
								styles={`${mainClass['button']} ${classes['button-cancel']} `}
								route={returnPath}>
								Cancel
							</Button>
							{/* <Button styles={`${mainClass['button']} ${classes['button-save']} `} route="/concerts" state={data}>Guardar</Button> */}
							<button
								className={`${buttonClass['button-display']} ${mainClass['button']} ${classes['button-save']}`}
								onClick={() => checkRoom()}>
								Guardar
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
