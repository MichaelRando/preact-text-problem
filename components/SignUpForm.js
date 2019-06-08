import React from 'react'
import { clearCreateFormData, preserveCreateFormData } from '../redux/modules/user'
import Input from './Input'
import { connect } from 'react-redux/src'

const emailAddressRegex = /^[A-Z0-9._%+-]{1,30}@[A-Z0-9.-]{1,50}\.[A-Z]{2,18}$/i
const passwordRegex = /.{8,100}/i
const oneOrMoreWordNameRegex = /^ *[A-Z\u00E0-\u00F6\u00F8-\u00FC.'’-]{2,20}([ ][A-Z\u00E0-\u00F6\u00F8-\u00FC.'’-]{1,20})* *$/i
const phoneNumberRegex = /^(?=([-+ ()]*\d){8,16})(?!([^-+ ()\d])+)[-+ ()\d]{8,16}$/i

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

class SignUpForm extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = {
      user: {
        'email': props.user.createFormData['email'] || '',
        'password': props.user.createFormData['password'] || '',
        'firstname': props.user.createFormData['firstname'] || '',
        'lastname': props.user.createFormData['lastname'] || '',
        'birthday': props.user.createFormData['birthday'] || new Date(1970, 0, 1, 11, 33, 30, 0),
        'tel': props.user.createFormData['tel'] || '+',
        'data-consent': props.user.createFormData['data-consent']
      },
      formError: '',
      doValidateFromSubmit: false
    }
    this.state.user['country'] = 'CANADA'
    this.state.user['tel'] = props.user.createFormData['tel'] || '' + ' '
  }

  componentWillUnmount() {
    this.props.clearCreateFormData()
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

  handleInputChange = (event, fieldName) => {
    const newValue = event.currentTarget.value
    this.setState((prevState) => {
      const formData = prevState.user
      formData[fieldName] = newValue
      this.props.preserveCreateFormData(formData)
      return { user: formData }
    })
    return newValue
  }

  emailInputRef = (node) => {
    this.emailInputNode = node
  }

  render() {
    return (
      <div className='view view-sign-in'>
        <h3 className='view-header-style-modal'>
          {`Sign Up`}
        </h3>
        <div style={{ textAlign: 'center', padding: '15px 15px 20px', fontSize: 12 }}>
          {' '}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className={`panel`}
               style={{ textAlign: 'left', marginBottom: '0', paddingBottom: '10px' }}
          >
            <div>
              <Input style={dotInputField}
                     label='Email'
                     type='email'
                     id='email'
                     name='email'
                     autoComplete='email'
                     value={this.state.user.email}
                     validateOnInput={this.state.doValidateFromSubmit}
                     onInput={this.handleInputChange}
                     regex={emailAddressRegex}
                     tabIndex={0}
                     errorText={`Valid email address required`}
              />
              <Input style={dotInputField}
                     label={`Password`}
                     type='password'
                     id='password'
                     name='password'
                     autoComplete='off'
                     value={this.state.user.password}
                     onInput={this.handleInputChange}
                     regex={passwordRegex}
                     validateOnInput={this.state.doValidateFromSubmit}
                     tabIndex={0}
                     errorText={`Password requires at least 8 characters`}
              />
              <div className='formFlexDesktop'>
                <Input style={dotInputField}
                       label={`First Name`}
                       id='firstname'
                       name='firstname'
                       autoComplete='given-name'
                       value={this.state.user.firstname}
                       onInput={this.handleInputChange}
                       regex={oneOrMoreWordNameRegex}
                       validateOnInput={this.state.doValidateFromSubmit}
                       tabIndex={0}
                       errorText={`Valid first name required`}
                />
                <Input style={dotInputField}
                       label={`Last Name`}
                       id='lastname'
                       name='lastname'
                       autoComplete='family-name'
                       value={this.state.user.lastname}
                       onInput={this.handleInputChange}
                       regex={oneOrMoreWordNameRegex}
                       validateOnInput={this.state.doValidateFromSubmit}
                       tabIndex={0}
                       errorText={`Valid last name required`}
                />
              </div>
              <Input style={dotInputField}
                     label={`Mobile Phone`}
                     type='tel'
                     name='tel'
                     id='tel'
                     autoComplete='mobile tel'
                     value={this.state.user['tel']}
                     onInput={this.handleInputChange}
                     regex={phoneNumberRegex}
                     validateOnInput={this.state.doValidateFromSubmit}
                     tabIndex={0}
                     errorText={`Valid phone number required`}
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
    )
  }
}
const mapStateToProps = (appState) => {
  return {
    user: appState.user,
  }
}

const mapDispatchToProps = {
  preserveCreateFormData,
  clearCreateFormData
}
const ConnectedSignUpForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
export default ConnectedSignUpForm
