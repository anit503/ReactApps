import React, { Suspense, useCallback } from "react";
import FilteredData from "./FilterData";
import Filter from "./Filter";

const Table = React.lazy(() => import('./Table'));

export default class ShowCountry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allCountries: '',
			countries: '',
			count: 10,
			filterKey : []
		}
		this.search = React.createRef();
	}
	
	componentDidMount(){
        fetch("https://restcountries.com/v3.1/all")
          .then((res) => {
            let x = res.json();
            return x;
          })
          .then((data) => {
				return data.sort(function(a,b){
					return a.name.common.localeCompare(b.name.common);
				})
			})
		  .then((data) => {
				this.setState({
					allCountries : data,
					countries : data.slice(0, 10)
				});	
			})
	}

	firstPageButton = () => {
		this.setState({
			count : 10,
			countries : this.state.allCountries.slice(0, 10)
		});	

		this.search.current.value = '';
	}

	prevButton = () => {
		let temp = this.state.count;
		if (temp > 10) {
			this.setState({
				count : this.state.count - 10,
				countries : this.state.allCountries.slice(temp - 20, temp - 10)
			})
		}
	}

	nextButton = () => {
		let temp = this.state.count;
		let length = this.state.allCountries.length;
		if (temp < length) {
			this.setState({
				count : this.state.count + 10,
				countries : this.state.allCountries.slice(temp, temp + 10)
			})
		}
	}

	lastPageButton = () => {
		let temp = this.state.allCountries.length;
		this.setState({
			count : temp,
			countries : this.state.allCountries.slice(temp - 10, temp + 10)
		})
	}

	findCountry = (event) => {
		var data = [];
		// if (condition) {
			
		// }
		let searchedText = event.target.value.toLowerCase();
		if (searchedText == undefined || searchedText == '') {
			this.firstPageButton();
		}
		else{
			this.state.allCountries.map((country) => {
				let countryName = country.name.common.toLowerCase();
				let countryOfficialName = country.name.official.toLowerCase();
				let regionName = country.region.toLowerCase();
				
				if (countryName.includes(searchedText) || countryOfficialName.includes(searchedText)
				|| regionName.includes(searchedText)) {
					return data.push(country);
				}
	
				country.capital && Object.values(country.capital).map((cap) => {
					if (cap.toLowerCase().includes(searchedText)) {
						return data.push(country);
						// break;
					}
				});
	
				country.languages && Object.values(country.languages).map((language) => {
					if (language.toLowerCase().includes(searchedText)) {
						return data.push(country);
					}
				})

				country.currencies && Object.values(country.currencies).map((currency) => {
					if (currency.name.toLowerCase().includes(searchedText)) {
						return data.push(country);
					}
				})

			})
	
			this.setState({
				countries : data
			})	
		}
	}

	addFilter = (selectedList, selectedItem) => {

		this.setState({
			filterKey: [...this.state.filterKey, ...selectedList]
		})

		let data = [...this.state.filterKey, ...selectedList];
		var results = FilteredData(data, this.state.allCountries);

		this.setState({
			countries : results
		})	
	}

	removeFilter = (selectedList, selectedItem) => {
		console.log(this.state.filterKey);
		let data = this.state.filterKey.filter((currentValue, index, array) => array.indexOf(currentValue) === index)
		if (data.length <= 1) {
			this.firstPageButton();
			this.setState({
				filterKey: ''
			})

		}
		else{
			data = this.state.filterKey

			data.map((ele, i) => {
				if(ele.name.toLowerCase().includes(selectedItem.name.toLowerCase())){
					data.splice(i, 1);
				}
			})
	
			this.setState({
				filterKey: data
			})
	
			var results = FilteredData(data, this.state.allCountries);
	
			this.setState({
				countries : results
			})	
		}
	}

	render() {
		return (
			<div className="container">
				<div className="row">

					<div className="input-group mb-3" style={{marginTop:'15px'}}>
						<input type="text" className="form-control" placeholder="Search Country, Language, Currency,
						Capital, Region"
						onChange={this.findCountry} ref={this.search} style={{textAlign:'center'}}/>
						<button className="btn btn-outline-secondary" type="button" onClick={this.firstPageButton}>
							<i className="bi bi-x"></i>
						</button>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<Filter keyName="country" placeholder="Select Country" addFilter={this.addFilter} removeFilter={this.removeFilter} allCountries = {this.state.allCountries}/>

					</div>
					<div className="col">
						<Filter keyName="language" placeholder="Select Language" addFilter={this.addFilter} removeFilter={this.removeFilter} allCountries = {this.state.allCountries}/>
					</div>
					<div className="col">
						<Filter keyName="currency" placeholder="Select Currency" addFilter={this.addFilter} removeFilter={this.removeFilter} allCountries = {this.state.allCountries}/>
					</div>
					<div className="col">
						<Filter keyName="capital" placeholder="Select Capital" addFilter={this.addFilter} removeFilter={this.removeFilter} allCountries = {this.state.allCountries}/>
					</div>
					<div className="col">
						<Filter keyName="region" placeholder="Select Region" addFilter={this.addFilter} removeFilter={this.removeFilter} allCountries = {this.state.allCountries}/>
					</div>
				</div>

				<Suspense fallback={<div>Loading...</div>}>
					<Table count = {this.state.count} countries = {this.state.countries}/>
				</Suspense>

				<div className="row">
					<div className='d-flex justify-content-center'>
						<button className='btn btn-outline-danger' onClick={this.firstPageButton}>
							First
						</button> &nbsp;
						<button className='btn btn-outline-primary' onClick={this.prevButton}>
							Prev
						</button> &nbsp;
						<button className='btn btn-outline-primary' onClick={this.nextButton}>
							Next
						</button> &nbsp;
						<button className='btn btn-outline-danger' onClick={this.lastPageButton}>
							Last
						</button>
					</div>
				</div>

			</div>
		);
	}
}