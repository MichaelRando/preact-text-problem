const PRESERVE_CREATE_FORM_DATA = 'PRESERVE_CREATE_FORM_DATA'
const CLEAR_CREATE_FORM_DATA = 'CLEAR_CREATE_FORM_DATA'


export const preserveCreateFormData = formData => ({
  type: PRESERVE_CREATE_FORM_DATA,
  formData
})

export const clearCreateFormData = () => ({
  type: CLEAR_CREATE_FORM_DATA
})

const ACTION_HANDLERS = {
  [PRESERVE_CREATE_FORM_DATA]: function(state, action) {
    return { ...state, createFormData: action.formData }
  },
  [CLEAR_CREATE_FORM_DATA]: function(state, action) {
    return { ...state, createFormData: {} }
  }
}


const initialState = {
  createFormData: {}
}

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
