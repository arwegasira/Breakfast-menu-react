const Modal = ({ children }) => {
  return (
    <dialog className='modal w-full max-w-[60rem] mx-auto block py-10 px-4 mt-12'>
      {children}
    </dialog>
  )
}
export default Modal
