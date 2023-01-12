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
import classes from './AddConcert.module.css';
import buttonClass from '../../components/button/Button.module.css';

// Redux actions
import { startAddConcert } from '../../redux/actions/concertActions';

export const AddConcert = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const data = location.state;
	const returnPath = location.pathname.replace('/AnadirConcierto', '');
	// Use of States for change the values
	const roomId = data._id;
	const customerId = data.customerId;
	const [name, setName] = useState('');
	const [date, setDate] = useState(new Date().toDateString());
	const [imageCollection, setImageCollection] = useState([]);
	const [img, setImg] = useState(null);
	const [image1, setImage1] = useState('');
	const [image2, setImage2] = useState('');
	const [descriptionCollection, setDescriptionCollection] = useState([]);
	const [link, setLink] = useState('https://laksia.app/');
	const [geolocation] = useState({
		latitude: 0,
		longitude: 0,
		name: '',
	});
	const assets = [];
	const [localization, setLocalization] = useState('');
	const [tickets, setTickets] = useState('');
	const [video, setVideo] = useState('');

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

	const concerts = useSelector((state) => state.concertReducer.concerts);

	const checkConcert = () => {
		let exists = false;

		concerts.forEach((concert) => name === concert.name && (exists = true));

		if (exists) {
			setModalVisibility(true);
		} else {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		const concert = {
			roomId,
			name,
			descriptionCollection,
			date,
			imageCollection,
			link,
			geolocation,
			assets,
		};
		dispatch(startAddConcert(customerId, concert));
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
		} else {
			setImage1(base64);
			setImage2(base64);
			return true;
		}
	};
	// Return the view
	return (
		<>
			{modalVisibility && (
				<Modal
					setModalVisibility={setModalVisibility}
					message="Ya existe un concierto con ese nombre"
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
							<h1 className={classes['title']}>Información del Concierto</h1>
							<h1>Añadir un Concierto!!!</h1>
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
										value={descriptionCollection}
										placeholder={'Descripción'}
										onChange={(e) => {
											setDescriptionCollection(e.target.value);
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
										value={tickets}
										placeholder={'Venta de Tickets'}
										onChange={(e) => {
											setTickets(e.target.value);
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
									<div className={classes['add-img-title']}>Imagen 1</div>
									<div
										className={image1 === '' ? classes['add-img'] : ''}
										onClick={() => document.getElementById('img1').click()}>
										<input
											id="img1"
											name={image1}
											type="file"
											accept=".jpg, .jpeg, .png"
											hidden={true}
											onChange={(e) => setHidden(changeImage(e))}
										/>
										{image1 === '' ? (
											<AddIcon height="100px" width="100px" fill="#414141" />
										) : (
											<CardImg
												name="image1"
												alt="portada"
												styles={classes['card-img']}
												src={image1}
											/>
										)}
									</div>
									<div className={classes['add-img-message']}>
										La imagen seleccionada no debe superar 16MB de espacio.
									</div>
									<div className={classes['add-img-title']}>Imagen 2</div>
									<div
										className={image2 === '' ? classes['add-img'] : ''}
										onClick={() => document.getElementById('img2').click()}>
										<input
											id="img2"
											type="file"
											accept=".jpg, .jpeg, .png"
											hidden={true}
											onChange={(e) => setHidden(changeImage(e))}
										/>
										{image2 === '' ? (
											<AddIcon height="100px" width="100px" fill="#414141" />
										) : (
											<CardImg
												name=""
												alt="portada"
												styles={classes['card-img']}
												src={image2}
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
								onClick={() => checkConcert()}>
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
