import React from 'react'
import { ModalDialog } from './Dialog'

const SignIn = ModalDialog => class extends React.Component {

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
        <div className='view view-sign-in'>
          <h3 className='view-header-style-modal'>
            {`Sign In`}
          </h3>
          <div style={{ textAlign: 'center', padding: '15px 15px 20px', fontSize: 12 }}>
            {' '}
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className={`panel`}
                 style={{ textAlign: 'left', marginBottom: '0', paddingBottom: '10px' }}
            >
                <div>
                  <input
                    type='email'
                    id='email'
                    name='email'
                  />
                  <input
                    type='password'
                    id='current-password'
                    name='current-password'
                  />
                </div>
            </div>
              <div>
                <div style={{ textAlign: 'center', paddingBottom: '20px', paddingTop: '20px' }}>
                </div>
                <div style={{ color: '#fff', fontSize: 16 }}>
                  <button
                    type='submit'
                    onClick={this.handleClick}
                  >
                    OK
                  </button>
                </div>
              </div>
          </form>
        </div>
      </ModalDialog>
    )
  }
}

export default SignIn(ModalDialog)
