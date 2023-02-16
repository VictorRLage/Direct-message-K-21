import React from 'react';

import '../App.css';

function Modal({ closeModal, mensagem }) {



    return (
        <div onClick={() => closeModal(false)} className='modalBackground'>
            <div className='modalContainer'>
                <div className='modalMessage'>{mensagem}</div>
            </div>
        </div>
    );
}

export default Modal;