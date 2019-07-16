import React from 'react'
import Input from './Input'

const dotInputField = {
  backgroundColor: '#fff',
  border: '2px solid #c5c7cb',
  borderRadius: '25px',
  boxSizing: 'border-box',
  color: '#2a2e33',
  fontFamily: 'Montserrat,sans-serif',
  fontSize: '1pc',
  height: '50px',
  lineHeight: '23px',
  padding: '0 20px',
  width: '100%'
}

export class SignInForm extends React.Component {
  render() {
    return (
      <div className='view view-sign-in'>
        <h3 className='view-header-style-modal'>
          {`Sign In`}
        </h3>
        <div style={{ textAlign: 'center', padding: '15px 15px 20px', fontSize: 12 }}>
          {' '}
        </div>
        <form onSubmit={this.props.handleSubmit}>
          <div className={`panel`}
               style={{ textAlign: 'left', marginBottom: '0', paddingBottom: '10px' }}
          >
            <div>
              <Input
                style={dotInputField}
                type='email'
                id='email'
                name='email'
              />
              <Input
                style={dotInputField}
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
                onClick={this.props.handleSubmit}
              >
                OK
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
