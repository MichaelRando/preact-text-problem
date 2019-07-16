import React from 'react'
import { connect } from 'react-redux'
import { ModalDialog } from './Dialog'
import SignUpForm from './SignUpForm'

const SignUpView = ModalDialog => class extends React.Component {

  onCloseClick = () => {
    this.props.close()
  }

  render() {
    const { style } = this.props
    return (
      <ModalDialog
        style={style}
        onCloseClick={this.onCloseClick}
        show={this.props.show}
      >
        <SignUpForm
          close={this.onCloseClick}
          showSignIn={this.props.showSignIn}
        />
      </ModalDialog>
    )
  }
}

const mapStateToProps = (appState) => {
  return {
    user: appState.user
  }
}

const WrappedSignUp = SignUpView(ModalDialog)
const ConnectedSignUpView = connect(mapStateToProps, {})(WrappedSignUp)
export default ConnectedSignUpView
