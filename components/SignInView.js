import React from 'react'
import { ModalDialog } from './Dialog'
import { SignInForm } from './SignInForm'

const SignInView = ModalDialog => class extends React.Component {

  onCloseClick = () => {
    this.props.close()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.close()
    return false
  }

  handleClick = (e) => {
    e.preventDefault()
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
        <SignInForm handleSubmit={this.handleSubmit}/>
      </ModalDialog>
    )
  }
}

export default SignInView(ModalDialog)
