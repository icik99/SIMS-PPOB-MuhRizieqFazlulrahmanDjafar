import { IoClose } from 'react-icons/io5'

const Modal = ({activeModal, title, buttonClose, width, content}) => {

    return (
        <div className={`${activeModal ? 'translate-y-0' : '-translate-y-[2000px]'} transition-all duration-1000 ease-in-out fixed left-0 top-0 z-50`}>
            <div className='h-screen w-screen bg-black  bg-opacity-40 overflow-hidden flex items-center justify-center p-10'>
                <div className={`max-h-[700px] overflow-auto shadow-lg bg-white rounded-xl scrollbar-hide`} style={{ width: width }}>
                    <div>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal