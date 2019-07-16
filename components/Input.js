import React from 'react'

function defaultInputValidator() {
  const { regex, errorText, type } = this.props
  if (regex) {
    const value = (type === 'password' ? this.field.value : this.field.value.trim())
    const isValid = regex.test(value)
    const error = (isValid ? null : errorText)
    if (this.state.error !== error) {
      this.setState({ error: error })
    }
  }
}

export default class Input extends React.Component {
  static defaultProps = {
    autoFocus: false,
    checked: false,
    disabled: false,
    type: 'text',
    validator: defaultInputValidator,
    validateOnInput: false
  }

  constructor(props) {
    super(props)
    this.field = null
    this.state = { error: null, value: props.value }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }

    // When the prop becomes true; do a one-off validate here
    if (!this.props.validateOnInput && nextProps.validateOnInput && nextProps.regex) {
      // validate prop was toggle, do it
      let isValid = nextProps.regex.test(this.field.value)
      let error = (isValid ? null : this.props.errorText)
      if (this.state.error !== error) {
        this.setState({ error: error })
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (let i in nextProps) {
      if (nextProps[i] !== this.props[i]) {
        return true
      }
    }
    for (let i in nextState) {
      if (nextState[i] !== this.state[i]) {
        return true
      }
    }
    for (let i in this.props) {
      if (!(i in nextProps)) {
        return true
      }
    }
    for (let i in this.state) {
      if (!(i in nextState)) {
        return true
      }
    }
    return false
  }

  onInput = (event) => {
    let value = event.currentTarget.value
    this.setState({ value: value })
    value = this.props.onInput(event, this.props.name)

    const validateOnInput = this.state.error || this.props.validateOnInput
    if (validateOnInput) { // when flagged as an error (or has been submitted once); validate on each input event
      this.props.validator.call(this)
    }
    return value
  }

  onKeyDown = (event) => {
    if (this.props.onKeyDown) {
      return this.props.onKeyDown(event, this.props.name)
    }
  }

  onPaste = (event) => {
    if (this.props.onPaste) {
      return this.props.onPaste(event, this.props.name)
    }
  }

  onBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event, this.props.name)
    }
    this.props.validator.call(this)
  }

  onFocus = (event) => {
    if (this.props.onFocus) {
      return this.props.onFocus(event, this.props.name)
    }
  }

  // fix for Microsoft Edge placeholder
  // https://github.com/developit/preact/issues/993
  // https://github.com/developit/preact/issues/1208
  // https://gist.github.com/developit/fa084f3cb38778f93d58607377f416a3
  componentWillUnmount() {
    // wait 1 tick for the recycler to reclaim this component, then destroy its cached DOM tree
    Promise.resolve(this).then(function clearBase(component) {
      // Note: __b is the compressed name (it's always this in a prod build, but nextBase is not a public API)
      component.nextBase = component.__b = null
    })
  }

  // end fix

  getLabelClassName() {
    let className = 'label'
    if (this.props.type === 'radio' && this.props.disabled) {
      className += ' radio-label-disabled'
    }
    else if (this.props.type === 'radio') {
      className += ' radio-label'
    }
    else if (this.props.labelType === 'inline') {
      className += ' label inline'
    }
    return className
  }

  receiveInputRef = (node) => {
    this.field = node
    if (this.props.inputRef) {
      this.props.inputRef(node)
    }
  }

  focus() {
    this.field.focus()
  }

  render() {
    const { type, width, checked, id, label, style, ...more } = this.props
    const {
      validator,
      value,
      validateOnInput,
      errorText,
      inputRef,
      labelType,
      onBlur,
      onInput,
      onFocus,
      onKeyDown,
      onKeyPress,
      onPaste,
      ...rest
    } = more // don't expand these into Component

    return (
      <div className={type === 'radio' ? 'inputContainerRadio' : 'inputContainer'}
           style={{
             flexDirection: type === 'radio' ? 'row-reverse' : 'inherit',
             display: type === 'radio' ? 'flex' : 'block',
             alignItems: type === 'radio' ? 'center' : 'inherit',
             position: 'relative',
             width: width || '100%'
           }}
      >
        <label htmlFor={id}
               style={type === 'radio' ? {
                 userSelect: 'none',
                 display: 'flex',
                 alignItems: 'flex-end',
                 paddingBottom: '0px',
                 marginRight: 15
               } : {}}
               className={this.getLabelClassName()}
        >
          <div style={{ userSelect: 'none', display: 'inline-block' }}>
            {label}
          </div>
        </label>
        <input id={id}
               checked={checked}
               className={'inputField' + (this.state.error ? ' inputError' : '')}
               ref={this.receiveInputRef}
               style={(type === 'radio') ? { ...style, display: 'none' } : style}
               type={type}
               value={this.state.value}
               onBlur={this.onBlur}
               onFocus={this.onFocus}
               onKeyDown={this.onKeyDown}
               onPaste={this.onPaste}
               onChange={this.onInput}
               {...rest}
        />
        {this.state.error && (
          <div className='error'>
            {this.state.error}
          </div>
        )}
      </div>
    )
  }
}
