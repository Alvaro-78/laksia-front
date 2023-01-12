import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { CloseIcon } from '../../assets/icons/CloseIcon';

import LaksiaIcon from '../../assets/img/LaksIcon.jpg';
import { getCroppedImg } from '../../utils/getCroopedImage';

import classes from './ImgModal.module.css';
import buttonClass from '../../components/imgModal/ImgModal.module.css';

export const ImgModal = ({ setModalCropVisibility, image, dataImage, id }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [croppedArea, setCroppedArea] = useState('');
	const [zoom, setZoom] = useState(1);
	const [imageId, setImageId] = useState(id);
	const [dataImageCropped, setDataImageCropped] = useState({
		croppedImage: '',
		id: '',
	});

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	}, []);

	const showCroppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(image, croppedArea, 0);
			setDataImageCropped({
				...dataImageCropped,
				croppedImage: croppedImage,
				id: imageId,
			});
			return croppedImage;
		} catch (error) {
			console.error(error);
		}
	}, [croppedArea, image]);

	useEffect(() => {
		console.log(dataImageCropped);
	}, [dataImageCropped]);

	// const updateDataImageCropped = async () => {
	// 	console.log(dataImageCropped);
	// };

	// console.log(dataImageCropped);

	return (
		<div className={classes['modal-background']}>
			<div className={classes['modal-box']}>
				<div
					className={classes['modal-close-container']}
					onClick={() => setModalCropVisibility(false)}>
					<CloseIcon />
				</div>
				<div className={classes['img-container']}>
					<div className={classes['crop-container']}>
						<div className={classes['reactEasyCrop_Container']}>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={4 / 3}
								onCropChange={setCrop}
								onCropComplete={onCropComplete}
								onZoomChange={setZoom}
							/>
						</div>
					</div>
				</div>
				<div className={classes['modal-buttons-container']}>
					<button
						className={`${buttonClass['button-display']} ${classes['button-save']}`}
						onClick={async () => {
							dataImage(await showCroppedImage());
							setModalCropVisibility(false);
						}}>
						Guardar
					</button>
				</div>
			</div>
		</div>
	);
};
