import { createContext, useContext } from 'react'
import { useReducer } from 'react'
import reducer from './reducer'
import {
  POPULATE_FORM_FIELDS,
  MANIPULATE_ORDER_ITEMS,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './actions'
const globalContext = createContext()
export const useGLobalContext = () => useContext(globalContext)

const initialSate = {
  modalTitle: '',
  orderItems: {},
  roomForm: { name: '', phoneNumber: '' },
  isModalOpen: false,
}

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSate)
  const openModal = () => {
    const modal = document.querySelector('.modal')
    modal.showModal()
    return dispatch({ type: OPEN_MODAL })
  }
  const closeModal = () => {
    const modal = document.querySelector('.modal')
    modal.close()
    return dispatch({ type: CLOSE_MODAL })
  }
  const populateFormFields = ({ fieldValues, formName, modalTitle }) => {
    return dispatch({
      type: POPULATE_FORM_FIELDS,
      payload: {
        fieldValues,
        formName,
        modalTitle,
      },
    })
  }
  const manipulateOrderItems = ({ target, maxItems, category }) => {
    return dispatch({
      type: MANIPULATE_ORDER_ITEMS,
      payload: { target, maxItems, category },
    })
  }
  return (
    <globalContext.Provider
      value={{
        ...state,
        openModal,
        populateFormFields,
        closeModal,
        manipulateOrderItems,
      }}
    >
      {children}
    </globalContext.Provider>
  )
}
export default AppContext
