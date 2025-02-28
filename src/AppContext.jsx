import { createContext, useContext } from 'react'
import { useReducer } from 'react'
import reducer from './reducer'
import { POPULATE_FORM_FIELDS, MANIPULATE_ORDER_ITEMS } from './actions'
const globalContext = createContext()
export const useGLobalContext = () => useContext(globalContext)

const initialSate = {
  modalTitle: '',
  orderItems: {},
  roomForm: { name: '', phoneNumber: '' },
}

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSate)
  const openModal = () => {
    const modal = document.querySelector('.modal')
    modal.showModal()
  }
  const closeModal = () => {
    const modal = document.querySelector('.modal')
    modal.close()
  }
  const populateFormFields = ({ fieldValues, formName, modalTitle }) => {
    return dispatch({
      type: POPULATE_FORM_FIELDS,
      payload: { fieldValues, formName, modalTitle },
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
