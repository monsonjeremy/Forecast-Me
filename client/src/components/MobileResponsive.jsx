import React, { PureComponent } from 'react'
import '../stylesheets/MobileResponsive.css'

class MobileResponsive extends PureComponent {
  constructor() {
    super()

    this.state = {
      formInputs: {
        happiness: 5,
      },
      renderResult: false,
    }

    this.updateFormState = this.updateFormState.bind(this)
  }

  updateFormState = (event, eventName) => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [eventName]: event.target.value,
      },
    })
  }

  render() {
    return (
      <div className="mobile-form-page-container">
        <div className="main-content container">
          <div className="form-header-container">
            <h1>Responsive Form Design!</h1>
            <p>This is some practice for Paypal! Hope you like it :)</p>
          </div>
          <hr />
          <form>
            <dl className="forms-list">
              <dt>
                <h3>Name Form</h3>
              </dt>
              <dd className="text">
                <label htmlFor="full-name">Full name:</label>
                <input
                  id="full-name"
                  onChange={e => this.updateFormState(e, 'fullName')}
                  name="full-name"
                  type="text"
                />
              </dd>

              <dt>
                <h3>Email Form</h3>
              </dt>
              <dd className="email">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  onChange={e => this.updateFormState(e, 'email')}
                  name="email"
                  type="email"
                  placeholder="somebody@someplace.com"
                  aria-describedby="email-description"
                />
                <p id="email-description" className="note">
                  <em>
                    Has @ symbol in the keyboard for mobile users to enhance experience (thanks to
                    email type).
                  </em>
                </p>
              </dd>

              <dt>
                <h3>URL</h3>
              </dt>
              <dd className="url">
                <label htmlFor="url">Your site URL:</label>
                <input
                  id="url"
                  name="url"
                  type="url"
                  onChange={e => this.updateFormState(e, 'url')}
                  placeholder="URL of your site (ex: http://www.forecastme.com)"
                />
              </dd>

              <dt>
                <h3>Phone Number input</h3>
              </dt>
              <dd className="tel">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  onChange={e => this.updateFormState(e, 'phone')}
                  placeholder="000-000-0000"
                  required
                />
              </dd>

              <dt>
                <h3>Date Input Type</h3>
              </dt>
              <dd className="date">
                <label htmlFor="date">Select current date:</label>
                <input
                  onChange={e => this.updateFormState(e, 'date')}
                  id="date"
                  name="date"
                  type="date"
                />
              </dd>

              <dt>
                <h3>Time Input Type</h3>
              </dt>
              <dd className="time">
                <label htmlFor="time">Select current time:</label>
                <input
                  onChange={e => this.updateFormState(e, 'time')}
                  id="time"
                  name="time"
                  type="time"
                />
              </dd>

              <dt>
                <h3>Dropdown select (with search)</h3>
              </dt>
              <dd className="datalist-select">
                <label htmlFor="browsers" id="browsersLabel">
                  What browser are you using:
                </label>
                <datalist id="browsers">
                  <option value="Firefox" />
                  <option value="IE" />
                  <option value="Chrome" />
                  <option value="Opera" />
                  <option value="Safari" />
                </datalist>
                <input
                  onChange={e => this.updateFormState(e, 'browser')}
                  id="browsers"
                  name="browsers"
                  list="browsers"
                />
              </dd>

              <dt>
                <h3>Multiple choice checkboxes</h3>
              </dt>
              <dd className="grouped checkboxes">
                <fieldset id="phones">
                  <legend>Select what phones you viewed this on:</legend>
                  <ul>
                    <li>
                      <label htmlFor="iphone">
                        <input
                          onChange={e => this.updateFormState(e, 'iphone')}
                          type="checkbox"
                          name="iphone"
                          value="yes"
                          id="iphone"
                        />
                        iPhone
                      </label>
                    </li>
                    <li>
                      <label htmlFor="android">
                        <input
                          onChange={e => this.updateFormState(e, 'android')}
                          type="checkbox"
                          name="android"
                          value="yes"
                          id="android"
                        />
                        Android
                      </label>
                    </li>
                  </ul>
                </fieldset>
              </dd>

              <dt>
                <h3>How Satisfied Are You?</h3>
              </dt>
              <dd className="button button-special">
                <button
                  className={this.state.formInputs.satisfied === 'very' ? 'selected' : null}
                  id="heck-yeah"
                  type="button"
                  value="very"
                  onClick={e => this.updateFormState(e, 'satisfied')}
                >
                  <h3 className="button-very">Very</h3>
                </button>
                <button
                  className={this.state.formInputs.satisfied === 'kind of' ? 'selected' : null}
                  id="kinda"
                  type="button"
                  value="kind of"
                  onClick={e => this.updateFormState(e, 'satisfied')}
                >
                  <h3 className="button-meh">Kind Of</h3>
                </button>
                <button
                  className={this.state.formInputs.satisfied === 'not at all' ? 'selected' : null}
                  id="heck-no"
                  value="not at all"
                  onClick={e => this.updateFormState(e, 'satisfied')}
                  type="button"
                >
                  <h3 className="button-no">Not At All</h3>
                </button>
              </dd>

              <dt>
                <h3>Range Input Type</h3>
              </dt>
              <dd className="range happiness-slider">
                <label htmlFor="happiness">Happiness:</label>
                <input
                  id="happiness"
                  onChange={e => this.updateFormState(e, 'happiness')}
                  name="happiness"
                  value={this.state.formInputs.happiness}
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                />
              </dd>
              <button
                className="submit-form"
                type="submit"
                onClick={e => {
                  e.preventDefault()
                  this.setState({
                    ...this.state,
                    renderResult: true,
                  })
                }}
              >
                Submit Form
              </button>
            </dl>
          </form>
          <div className="form-values-container">
            <h3>Submit the form to have the values returned!</h3>
            {this.state.renderResult &&
              Object.keys(this.state.formInputs).map(formElem => (
                <div key={formElem} className="form-input-value-container">
                  <p>
                    {formElem.toLowerCase()}: {this.state.formInputs[formElem]}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

MobileResponsive.propTypes = {}
MobileResponsive.defaultProps = {}

export default MobileResponsive
