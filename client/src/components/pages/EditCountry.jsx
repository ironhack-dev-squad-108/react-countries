import React, { Component } from 'react'
import api from '../../api';

export default class EditCountry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      capitals: [],
      area: '',
      description: '',
      message: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleInputChange(stateKey, event){
    this.setState({
      [stateKey]: event.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault() // To not not submit the form and redirect the user to another page

    api.editCountry(this.props.match.params.countryId, {
      name: this.state.name,
      capitals: this.state.capitals,
      area: this.state.area,
      description: this.state.description,
    })
      .then(data => {
        console.log("Yeah!!!!!", data)
        this.setState({
          message: data.message
        })
        // Remove of the message after 3 seconds
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 3000)
      })
  }
  render() {
    return (
      <div className="EditCountry">
        <h1>Edit Country</h1>
        <form onSubmit={this.handleSubmit}>
          Name: <input type="text" value={this.state.name} onChange={(e) => { this.handleInputChange("name", e) }} /> <br />
          Capitals: <input type="text" value={this.state.capitals} onChange={(e) => { this.handleInputChange("capitals", e) }} /> <br />
          Area: <input type="number" value={this.state.area} onChange={(e) => { this.handleInputChange("area", e) }} /> <br />
          Description: <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
          <button>Edit country</button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    )
  }
  componentDidMount(){
    api.getCountryDetail(this.props.match.params.countryId)
      .then(country => {
        this.setState({
          name: country.name,
          capitals: country.capitals,
          area: country.area,
          description: country.description,
        })
      })
  }
}
