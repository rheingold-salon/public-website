export function Modal({ closeModal, children }: { children: React.ReactNode, closeModal: () => void }) {
    return (
        <div className='pt-28 fixed inset-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-50'
            onClick={closeModal}
        >
            <div
                className="bg-white p-8 max-w-3xl w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
