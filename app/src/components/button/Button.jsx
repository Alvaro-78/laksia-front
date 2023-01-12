import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

// Standard Class for the button
import classes from './Button.module.css';

export const Button = ({ styles, children, route, state }) => {
	return (
		<>
			<Link className={styles} to={{ pathname: route }} state={state}>
				<button className={classes['button-display']}>{children}</button>
			</Link>
		</>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	styles: PropTypes.string.isRequired,
};
