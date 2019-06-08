import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import SignUpView from './components/SignUpView'
import { createTheStore } from './redux/create'

class Main extends React.Component {

  state = {
    showSignIn: false
  }

  handleClick = () => {
    this.setState((prevState) => {
      return {showSignIn: true}
    })
  }

  close = () => {
    this.setState((prevState) => {
      return {showSignIn: false}
    })
  }

  render () {
    return (
      <div>
        <button
          type='submit'
          onClick={this.handleClick}>
          Sign In
        </button>
        <SignUpView close={this.close} show={this.state.showSignIn}/>
      </div>
    )
  }
}

function mapStateToProps(appState) {
  return {}
}
const ConnectedApp = connect(mapStateToProps, {})(Main)
const store = createTheStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>,
  document.getElementById('contentLayer')
)
