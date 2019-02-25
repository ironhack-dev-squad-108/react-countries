import React, { Component } from 'react'
import api from '../../api';

export default class CountryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: null
    }
  }
  render() {
    if (!this.state.country) {
      return <div className="CountryDetail">Loading...</div>
    }
    return (
      <div className="CountryDetail">
        <h1>CountryDetail</h1>
        <strong>Name</strong>: {this.state.country.name}<br/>
        <strong>Capitals</strong>: {this.state.country.capitals.join(', ')}<br/>
        <strong>Area</strong>: {this.state.country.area}<br/>
        <strong>Description</strong>: {this.state.country.description}<br/>
        <strong>Creator</strong>: {this.state.country._creator.username}<br/>
        <strong>Flag</strong>: <br/>
        <img src={this.state.country.flagUrl} alt="flag"/><br/>
        
      </div>
    )
  }
  componentDidMount() {
    api.getCountryDetail(this.props.match.params.countryId)
      .then(country => {
        this.setState({
          country: country
        })
      })
      .catch(err => console.log(err))
  }
}
