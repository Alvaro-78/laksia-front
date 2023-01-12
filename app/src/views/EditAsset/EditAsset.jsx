// Import the components from React, useState and useEffect
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardImg } from '../../components/cardImg/CardImg';

// Icons
import { NotesIcon } from '../../assets/icons/NotesIcon';
import { TitleIcon } from '../../assets/icons/TitleIcon';

// Import components
import { SideBar } from '../../components/sideBar/SideBar';
import { Button } from '../../components/button/Button';
import { AddElement } from '../../components/addElement/AddElement';

// The mainClass contains the shared elements of the App
import mainClass from '../main.module.css';
// Import de .css (the stylesheet from this page)
import classes from './EditAsset.module.css';
import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';

// Function will print and called on App
export const EditAsset = () => {
    // Create constants to use de fakeDB.json (db.json)
    const location = useLocation();
    const data = location.state;
    const returnPath = location.pathname.replace("/Editar", "");
    // Use of States for change the values
    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.description);
	// Autoresize the textarea
	function autoResize(e) { e.style.height = '40px'; e.style.height = e.scrollHeight + 'px'; }
	// This will run after the view is rendered
	// This is for scalate the input height from the text inside him
	useEffect(() => { document.querySelectorAll('textarea[type=text]').forEach(element => { autoResize(element) }); })
    // Return de view to print
    return (
        <>
            <div className={mainClass['background-container']}>
                <SideBar />
                <div className={mainClass['scroll-container']}>
                    <BreadCrumb />
                    <div className={classes['grid-container']}>
                        {/* Row 1 Column 1 */}
                        <div className={classes['title-container-grid']}>
                            <h1 className={classes['title']}>Información del Asset</h1>
                        </div>
                        {/* Row 2 Column 1*/}
                        <div className={classes['main-title-name']}>
                            <div className={classes['info-container']}>
                                <div className={classes['fest-input']}>
                                    <div className={classes['icon']}>
                                        <TitleIcon />
                                    </div>
                                    <textarea role='input' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div className={classes['fest-input']}>
                                    <div className={classes['icon']}>
                                        <NotesIcon />
                                    </div>
                                    <textarea id='textBox' role='input' type="text" value={description} onChange={(e) => { setDescription(e.target.value); autoResize(e.target) }} />
                                </div>
                            </div>
                        </div>
                        {/* Row 3 */}
                        <div className={classes['button-container']}>
                            <Button styles={`${classes['button']} ${classes['button-cancel']} `} route={returnPath}>Cancelar</Button>
                            <Button styles={`${classes['button']} ${classes['button-save']} `} route="/info-asset" state={data}>Guardar</Button>
                        </div>
                        {/* Row 4 */}
                        <div className={classes['title-asset-box']}>
                            <h1 className={`${classes['title']} ${classes['title-asset-clean']}`}>Activo en</h1>
                        </div>
                        {/* Row 1 Column 2 & Row 2 Column 2 & Row 4 Column 2 & Row 4 Column 2 */}
                        <div className={classes['asset-box']}>
                            <div className={classes['asset-box-container']}>
                                <div className={classes['asset-img']}/>
                                <div>Asset Preview</div>
                            </div>
                        </div>
                        {/* Row 5 */}
                        {/* Mostrar Assets */}
                        <div className={classes['assets-display']}>
                            {data.active.map((asset) => {
                                return (
                                    <div className={classes['assets']}>
                                        <Link to="/#" style={{ textDecoration: 'none', color: 'black' }} state={asset}>
                                            <CardImg
                                                src={data.img}
                                                key={data.id}
                                                alt={'logo-conciertos'}
                                                styles={classes['create-asset']}
                                                name={asset}
                                            />
                                        </Link>
                                    </div>
                                );
                            })}
                            {/* Añadir Asset */}
                            <AddElement title="Añadir" width="10vw" height="10vw" iconS="100px" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}