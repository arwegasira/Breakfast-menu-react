import { toast } from 'react-toastify'
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  POPULATE_FORM_FIELDS,
  MANIPULATE_ORDER_ITEMS,
} from './actions'
const reducer = (state, action) => {
  if (action.type === OPEN_MODAL) {
    const modal = document.querySelector('.modal')
    modal.showModal()
    return { ...state }
  }
  if (action.type === POPULATE_FORM_FIELDS) {
    const {
      payload: { fieldValues, formName, modalTitle },
    } = action
    if (formName === 'room') {
      return {
        ...state,
        modalTitle: modalTitle,
        roomForm: { ...fieldValues },
      }
    }
    return { ...state }
  }
  if (action.type === MANIPULATE_ORDER_ITEMS) {
    const { target, maxItems, category } = action.payload
    if (target.checked) {
      if (state.orderItems[category]) {
        if (state.orderItems[category].length > maxItems - 1) {
          toast.warn(
            `You cant choose more than ${maxItems} item(s) for this category`
          )
          target.checked = false
        } else {
          state.orderItems[category] = [
            ...state.orderItems[category],
            target.value,
          ]
        }
      } else {
        state.orderItems[category] = [target.value]
      }
    } else {
      state.orderItems[category] = state.orderItems[category].filter(
        (item) => item !== target.value
      )
      if (state.orderItems[category].length == 0)
        delete state.orderItems[category]
    }
    return { ...state }
  }

  throw new Error(`No matching action type ${action.type}`)
}

export default reducer
