// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'react-collapse'

type Props = {
  options?: Array<Object> | null,
  title: string,
  type: string,
  isDisabled: boolean,
  itemClick: Function,
}

type State = {
  dropdownOpen: boolean,
}

class DropdownSelector extends PureComponent<Props, State> {
  static defaultProps: {
    isDisabled: boolean,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      dropdownOpen: false,
    }

    this.renderDropdown = this.renderDropdown.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown: Function

  toggleDropdown(btnDisabled: boolean) {
    // If the button is not disabled go ahead and change the state
    if (!btnDisabled) {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
      })
    }
  }

  renderDropdown: Function

  renderDropdown() {
    return (
      <div className="dropdown-selector">
        <DropdownTitle
          isOpen={this.state.dropdownOpen}
          title={this.props.title}
          type={this.props.type}
          isDisabled={this.props.isDisabled}
          toggleFunc={this.toggleDropdown}
        />
        <Collapse isOpened={this.state.dropdownOpen}>
          <div className={'dropdown-items'}>
            {/* If no options available (region hasn't been selected) then don't render subitems */}
            {!(this.props.options === null) &&
              /* flow-disable-next-line */
              this.props.options.map(element => (
                <DropdownItem
                  key={element.name}
                  title={element.name}
                  clickFunc={() => this.props.itemClick(element)}
                  payload={element}
                />
              ))}
          </div>
        </Collapse>
      </div>
    )
  }

  render() {
    return this.renderDropdown()
  }
}

const DropdownTitle = ({ title, type, isDisabled, toggleFunc, isOpen, }) => (
  <div
    className={`dropdown-${type} dropdown-title-btn ${isOpen ? 'open' : 'closed'}`}
    role="button"
    disabled={isDisabled}
    onClick={() => toggleFunc(isDisabled)}
  >
    <h2 className={`dropdown-${type}-title`}>{title}</h2>
    <figure className={`dropdown-arrow dropdown-icon ${isOpen ? 'open' : ''}`} />
  </div>
)

const DropdownItem = ({ title, clickFunc, }) => (
  <div className={`dropdown-item-${title} dropdown-item`} role="button" onClick={clickFunc}>
    <h3>{title}</h3>
  </div>
)

DropdownTitle.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  toggleFunc: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

DropdownItem.propTypes = {
  title: PropTypes.string.isRequired,
  clickFunc: PropTypes.func.isRequired,
}

DropdownSelector.propTypes = {
  options: PropTypes.arrayOf(Object),
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  itemClick: PropTypes.func.isRequired,
}

DropdownSelector.defaultProps = {
  isDisabled: false,
  options: null,
}

export default DropdownSelector
