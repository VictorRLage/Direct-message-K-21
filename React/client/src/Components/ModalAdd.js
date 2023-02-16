import React from 'react';

function ModalAdd({ closeModal }) {
    return (
        <div className='modalAddBackground'>
            <div className='modalAddContainer'>
                <div className='modalAddHeader'>
                    <div className='modalAddTitle'>
                        <div>Adicionar amigos</div>
                        <div className='closeBtn'> X </div>
                    </div>
                    <div className='modalAddInput'>
                        <input type='text' placeholder='  Usuario'></input>
                    </div>
                </div>
                <div className='modalAddList'></div>
            </div>
        </div>
    );
}

export default ModalAdd;