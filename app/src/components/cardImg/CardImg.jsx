import React from 'react';

import PropTypes from 'prop-types';

import classes from './cardImg.module.css';

export const CardImg = ({ src, alt, styles, name }) => {
	return (
		<>
			<div>
				<img src={src} className={styles} alt={alt} />
				<div className="text-center">
					{name !== "" && <div className={classes['card-title']}>{name}</div>}
				</div>
			</div>
		</>
	);
};

CardImg.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	styles: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};
