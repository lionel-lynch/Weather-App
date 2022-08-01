import React from 'react';
import cl from './Modal.module.css';
import closeIcon from './../../../images/icons/close.svg';

const Modal = ({ changeVisible, children, styles }) => {

    const close = () => {
        changeVisible(false);    
    }

    const modalAreaClicked = (evt) => {
        let modalWin = evt.target.closest(`.${cl.modal}`);

        if (!modalWin) {
            close();
        }
    }

    return (
        <div className={cl.modalWrapper} style={styles} onClick={modalAreaClicked}>

            <div className={cl.modal}>
                <div className={cl.closeBtn} onClick={close}>
                    <img src={closeIcon} alt="close" />
                </div>

                {children}
            </div>
            
        </div>
    );
};

export default Modal;
