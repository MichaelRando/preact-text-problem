import React from 'react'
import Modal from './Modal'

class Dialog extends React.Component {
  constructor(props) {
    super(props)
    this.divStyle1 = {
      display: 'block',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      overflowY: 'auto',
      position: 'fixed',
      zIndex: 10
    }
    this.divStyle2 = {
      boxSizing: 'border-box',
      position: 'relative',
      maxWidth: 1000,
      margin: 'auto',
      textAlign: 'center',
      ...props.style
    }
    this.closeStyle = {
      cursor: 'pointer',
      color: '#aaa',
      font: '22px/100% arial, sans-serif',
      position: 'absolute',
      right: '15px',
      textDecoration: 'none',
      textShadow: '0 1px 0 #fff',
      top: '12px'
    }
  }

  onMouseDown = (e) => {
    // prevents input:onBlur from being invoked
    e.preventDefault()
  }

  onClick = (e) => {
    this.props.onCloseClick()
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onClick()
    }
  }

  receiveCloseRef = (node) => {
    this.closeNode = node
    if (this.props.ref) {
      this.props.ref(node)
    }
  }

  render() {
    return (
      <div
        style={this.divStyle1}
        className={this.props.modalClass}
      >
        <div style={this.divStyle2} className='ModalWrapper'>
          <div style={{ marginTop: '15%' }}>
            <div className='Modal' style={{ background: 'yellow', borderRadius: 15, margin: '0 auto' }}>
              <span
                ref={this.receiveCloseRef}
                style={this.closeStyle}
                tabIndex='0'
                onClick={this.onClick}
                onKeyPress={this.onKeyPress}
                onMouseDown={this.onMouseDown}
              >
                ✖
              </span>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const ModalDialog = Modal(Dialog)
