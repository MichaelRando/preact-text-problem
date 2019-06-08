import { createStore, applyMiddleware, compose } from 'redux/es/redux'
import thunk from 'redux-thunk'
import appReducer from './modules/index'

const rootReducer = function(state, action) {
  let nextState = state
  return appReducer(nextState, action)
}

export function createTheStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(thunk))
  )
  return store
}
