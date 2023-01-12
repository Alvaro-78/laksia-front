import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ProSidebar, Menu, MenuItem, SidebarContent } from 'react-pro-sidebar';

import LaksiaLogo from '../../assets/logos/LaksiaLogo.png';
import { BuildIcon } from '../../assets/icons/BuildIcon';
import { LeaderBoard } from '../../assets/icons/LeaderBoard';
import { MusicIcon } from '../../assets/icons/MusicIcon';
import { ViewIcon } from '../../assets/icons/ViewIcon';
import { Notifications } from '../../assets/icons/Notifications';
import { RadarIcon } from '../../assets/icons/RadarIcon';
import { CollapseButton } from '../../assets/icons/CollapseButton';
import { CloseCollapseButton } from '../../assets/icons/CloseCollapseButton';
import faviconPeke from '../../assets/img/Laksia-Favicon.png';

import 'react-pro-sidebar/dist/css/styles.css';
import './SideBar.css';

export const SideBar = () => {
	//
	const stateBar = localStorage.getItem('collapsed');
	// Use json.parse o parse string into boolean
	const [menuCollapse, setMenuCollapse] = useState(JSON.parse(stateBar));
	// Just for save the info of the menu, if it is hidden or not on localstorage
	//
	const state = useSelector((state) => state.providerDataReducer.data);

	const menuIconClick = () => {
		menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
		// Set item of the resersed menuCollapsed
		localStorage.setItem('collapsed', !menuCollapse);
	};

	// END
	useEffect(() => {
		// SET THE VIEW ACTIVE IN THE SIDEBAR
		// List all pro-menu-item
		let list = document.querySelectorAll(
			'.pro-menu-item>div>.pro-item-content>a'
		);

		// Get the route and delete http://localhost:3000 (in this case because is localhost)
		let route = window.location.href;
		route = route.replace('http://localhost:3000', '');
		// Show Route

		// Search on the list the href atribute and compare with the route where the user is
		list.forEach((listItem) => {
			// Show the a.href
			// Check the user path and the list path to change atributes, if it includes the route
			if (route.includes(listItem.getAttribute('href'))) {
				listItem.parentElement.parentElement.parentElement.classList.add(
					'activated-section'
				);
				listItem.classList.add('activated-text');
				listItem.parentElement.parentElement.firstChild.firstChild.firstChild.classList.add(
					'activated-icon'
				);
			}
		});
	}, []);

	return (
		<>
			<div id="header">
				{/* collapsed props to change menu size using menucollapse state */}
				<ProSidebar collapsed={menuCollapse}>
					<div>
						{menuCollapse ? (
							<div className="logo-container">
								<div>
									<img className="logo" src={faviconPeke} alt="icon" />
								</div>
							</div>
						) : (
							<div>
								<img className="sidebar-logo" src={LaksiaLogo} alt="logo" />
								<div className="sidebar-sections">SECCIONES</div>
							</div>
						)}
					</div>
					<SidebarContent className="sidebar-container">
						<Menu>
							<MenuItem className="sidebar-cube-top" icon={<MusicIcon />}>
								<Link to="/provider-main-page">
									<div className="label">Festivales</div>
								</Link>
							</MenuItem>
							<MenuItem className="sidebar-cube" icon={<ViewIcon />}>
								<Link to="/assets">
									<div className="label">Assets</div>
								</Link>
							</MenuItem>
							<MenuItem className="sidebar-cube" icon={<LeaderBoard />}>
								<Link to="/analitics">
									<div className="label">Analíticas</div>
								</Link>
							</MenuItem>
							<MenuItem className="sidebar-cube" icon={<RadarIcon />}>
								<Link to="/capacity-control">
									<div className="label">Control de Aforos</div>
								</Link>
							</MenuItem>
							<MenuItem className="sidebar-cube" icon={<Notifications />}>
								<Link to="/notifications">
									<div className="label">Notificaciones</div>
								</Link>
							</MenuItem>
							<MenuItem className="sidebar-cube" icon={<BuildIcon />}>
								<Link to="/customization">
									<div className="label">Customización</div>
								</Link>
							</MenuItem>
							<div
								className="collapse-button-container"
								onClick={menuIconClick}>
								<div className="collapse-button">
									{menuCollapse ? <CollapseButton /> : <CloseCollapseButton />}
								</div>
							</div>
						</Menu>
						{!menuCollapse && (
							<div className="copyright">&#169; LAKSIA 2022</div>
						)}
					</SidebarContent>
				</ProSidebar>
			</div>
		</>
	);
};
