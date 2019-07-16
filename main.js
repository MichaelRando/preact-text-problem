import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import SignUpView from './components/SignUpView'
import SignIn from './components/SignInView'
import { createTheStore } from './redux/create'

class Main extends React.Component {

  state = {
    signIn: false,
    signUp: false
  }

  showSignIn = () => {
    this.setState((prevState) => {
      console.log('showSignIn')
      return {
        signIn: true,
        signUp: false
      }
    })
  }

  showSignUp = () => {
    this.setState((prevState) => {
      console.log('showSignUp')
      return {
        signIn: false,
        signUp: true
      }
    })
  }

  closeSignIn = () => {
    this.setState((prevState) => {
      console.log('closeSignIn')
      return {signIn: false}
    })
  }

  closeSignUp = () => {
    this.setState((prevState) => {
      console.log('closeSignUp')
      return {signUp: false}
    })
  }

  render () {
    return (
      <div>
        <button
          type='submit'
          onClick={this.showSignUp}>
          Sign Up
        </button>
        <SignUpView close={this.closeSignUp} show={this.state.signUp} showSignIn={this.showSignIn}/>
        <SignIn close={this.closeSignIn} show={this.state.signIn}/>
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
