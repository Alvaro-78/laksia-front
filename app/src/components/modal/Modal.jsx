import React from 'react';
import { CloseIcon } from '../../assets/icons/CloseIcon';

import classes from './Modal.module.css';
import buttonClass from '../../components/button/Button.module.css';
import { AlertIcon } from '../../assets/icons/AlertIcon';

export const Modal = ({ setModalVisibility, handleFunction, message, mode }) => {

  return (
    <div className={classes['modal-background']}>
      <div className={classes['modal-box']}>
        <div className={classes['modal-close-container']} onClick={() => setModalVisibility(false)}>
          <CloseIcon />
        </div>
        {mode === "delete" &&
          <div className={classes['modal-icon-container']}>
            <AlertIcon />
          </div>
        }
        <div className={classes['modal-message-container']} style={mode !== "delete" ? {marginTop: "3rem"} : undefined}>
          {message}
        </div>
        <div className={classes['modal-buttons-container']}>
          {mode === "message" ?
            <button className={`${buttonClass['button-display']} ${classes['button-save']}`} onClick={() => setModalVisibility(false)}>Aceptar</button>
          :
            <button className={`${buttonClass['button-display']} ${classes['button-secondary']}`} onClick={() => setModalVisibility(false)}>Cancelar</button>
          }

          {mode === "delete" ? 
            <button className={`${buttonClass['button-display']} ${classes['button-delete']}`} onClick={() => handleFunction()}>Eliminar</button>
          : mode === "edit" &&
            <button className={`${buttonClass['button-display']} ${classes['button-save']}`} onClick={() => handleFunction()}>Guardar</button>
          }
        </div>
      </div>
    </div>
  )
}