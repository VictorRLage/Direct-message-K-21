import React from 'react';
import ModalAdd from '../Components/ModalAdd';
import { useState } from 'react';


function K21() {

    const [openModal, setOpenModal] = useState(false)


    return (
        <div className='k21'>
            {openModal && (<ModalAdd closeModal={setOpenModal} />)}
            <div className='containerLeft'>
                <div className='headerLeft'>
                    <div className='logo'>K21</div>
                    <div onClick={() => setOpenModal(true)} className='addBtn'>A</div>
                </div>
                <div className='friendList'></div>
            </div>
            <div className='containerRight'>
            </div>
        </div>
    );
}

export default K21;