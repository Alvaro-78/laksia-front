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
import { NotesIcon } from '../../assets/icons/NotesIcon';
import { TitleIcon } from '../../assets/icons/TitleIcon';
import { WatchIcon } from '../../assets/icons/WatchIcon';
import { ImgModal } from '../../components/imgModal/ImgModal';

// The mainClass contains the shared elements of the App
import mainClass from '../main.module.css';
import classes from './EditFest.module.css';
import buttonClass from '../../components/button/Button.module.css';

// Redux actions
import { startEditCustomer } from '../../redux/actions/customerActions';

export const EditFest = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// JSON
	const location = useLocation();
	const data = location.state;
	const returnPath = location.pathname.replace('/Editar', '');
	const _id = data._id;
	const providerId = data.providerId;
	const assets = data.assets;
	// Use of States for change the values
	const [name, setName] = useState(data.name);
	const [description, setDescription] = useState(data.description);
	const [localization, setLocalization] = useState(data.localization);
	const [video, setVideo] = useState(data.video);
	const [ticket, setTicket] = useState(data.ticket);
	const [geolocation] = useState(data.geolocation);
	const [link, setLink] = useState(data.link);
	const [logo, setLogo] = useState(data.logo);
	const [banner, setBanner] = useState(data.banner);
	const [date, setDate] = useState(data.date);
	const [img, setImg] = useState('');
	const [dataImageCropped, setDataImageCropped] = useState();
	const [imageId, setImageId] = useState('');

	const [hidden1, setHidden1] = useState(true);
	const [hidden2, setHidden2] = useState(true);

	const [errorMessage1, setErrorMessage1] = useState('Error');
	const [errorMessage2, setErrorMessage2] = useState('Error');

	const [modalCropVisibility, setModalCropVisibility] = useState(false);
	const [modalVisibility1, setModalVisibility1] = useState(false);
	const [modalVisibility2, setModalVisibility2] = useState(false);

	// Get customers from the state to check if one exists with the same name
	let customers = useSelector((state) => state.customerReducer.customers);
	customers = customers.filter((customer) => customer._id !== _id);

	const checkCustomer = () => {
		let exists = false;

		customers.forEach((customer) => name === customer.name && (exists = true));

		if (exists) {
			setModalVisibility2(true);
		} else {
			setModalVisibility1(true);
		}
	};

	const handleSubmit = async () => {
		const customer = {
			_id,
			providerId,
			name,
			description,
			localization,
			date,
			video,
			ticket,
			logo,
			banner,
			link,
			geolocation,
			assets,
		};
		await dispatch(startEditCustomer(customer));
		navigate('/provider-main-page/' + name);
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
		// console.log(id);

		// Coding images to base64
		const base64 = await convertBase64(file);

		// if (id === 'logo') setLogo(base64);

		// if (id === 'banner') setBanner(base64);

		setImg(base64);
		setImageId(id);
		setModalCropVisibility(true);
		return base64;
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
	console.log(dataImageCropped);

	// Return the view
	return (
		<>
			{modalCropVisibility && (
				<ImgModal
					image={img}
					id={imageId}
					setModalCropVisibility={setModalCropVisibility}
					dataImage={setDataImageCropped}
					mode="edit"
				/>
			)}
			{modalVisibility2 && (
				<Modal
					setModalVisibility={setModalVisibility2}
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
							<h1>Editar Festival</h1>
						</div>

						{/* Row 2 Column 2*/}
						<div className={classes['logo']}>
							<div className={classes['banner-container']}>
								<div className={classes['logo-banner-container']}>
									<div className={classes['add-img-title']}>Logo</div>
									<div
										className={logo === data.logo ? classes['logo-img'] : ''}
										onClick={() => document.getElementById('logo').click()}>
										<input
											type="file"
											id="logo"
											accept=".jpg, .jpeg, .png"
											hidden={true}
											onChange={(e) => setHidden1(changeImage(e))}
										/>
										<CardImg
											name=""
											alt="logo"
											styles={classes['card-img']}
											src={dataImageCropped}
										/>
									</div>
									<div className={classes['add-img-message']}>
										La imagen seleccionada no debe superar 16MB de espacio.
									</div>
									{/* <div
										className={classes['add-img-error-message']}
										style={hidden1 ? { visibility: 'hidden' } : undefined}>
										{errorMessage1}
									</div> */}
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
										className={banner === '' ? classes['add-img'] : ''}
										onClick={() => document.getElementById('banner').click()}>
										<input
											id="banner"
											type="file"
											accept=".jpg, .jpeg, .png"
											hidden={true}
											onChange={(e) => setHidden2(changeImage(e))}
										/>
										<CardImg
											name=""
											alt="portada"
											styles={classes['card-img']}
											src={dataImageCropped}
										/>
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
						{/* Row 4 */}
						<div className={mainClass['button-container']}>
							<Button
								styles={`${mainClass['button']} ${classes['button-cancel']} `}
								route={returnPath}>
								Cancel
							</Button>
							{/* <Button styles={`${mainClass['button']} ${classes['button-save']} `} route="/info-fest" state={data}>Guardar</Button> */}
							<button
								className={`${buttonClass['button-display']} ${mainClass['button']} ${classes['button-save']}`}
								onClick={() => checkCustomer()}>
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
