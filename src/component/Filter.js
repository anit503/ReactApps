import Multiselect from 'multiselect-react-dropdown';
import React from 'react';

export default class Filter extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            options : []
        }
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.allCountries !== this.props.allCountries) {
            switch(this.props.keyName){
                case 'country' : this.addCountry();
                                    break;
                case 'language' : this.addLanguage();
                                    break;
                case 'currency' : this.addCurrency();
                                    break;
                case 'capital' : this.addCapital();
                                    break;
                case 'region' : this.addRegion();
                                    break;
                default : break;
            }
        }
        
    }

    addCountry = () => {
        let countryNameList = []
        this.props.allCountries.map((country, index) => {
            countryNameList.push({
                name: country.name.common,
                id: index,
                keyName: this.props.keyName
            });
        })
        
        this.setState({
            options: countryNameList
        })
    }

    addLanguage = () => {
        let languageList = []

        Promise.all(this.props.allCountries)
        .then((data) => {
            data.map((country) => {
                country.languages && Object.values(country.languages).map((language) => {
                    languageList.push(language);
                })
            })
            return languageList;
        })
        .then((languageList) => {
            return languageList.filter((currentValue, index, array) => array.indexOf(currentValue) === index);
        })
        .then((languageList) => {
            return languageList.sort(function(a,b){
                return a.localeCompare(b);
            })
        })
        .then((filteredValue) => {
            languageList = [];
            filteredValue.map((language, index) => {
                languageList.push({
                    name: language,
                    id: index,
                    keyName: this.props.keyName
                });
            });
            this.setState({
                options: languageList
            });
        })
    }

    addCurrency = () => {
        let currencyList = []

        Promise.all(this.props.allCountries)
        .then((data) => {
            data.map((country) => {
                country.currencies && Object.values(country.currencies).map((currency) => {
                    currencyList.push(currency.name);
                })
            })
            return currencyList;
        })
        .then((currencyList) => {
            return currencyList.filter((currentValue, index, array) => array.indexOf(currentValue) === index);
        })
        .then((currencyList) => {
            return currencyList.sort(function(a,b){
                return a.localeCompare(b);
            })
        })
        .then((filteredValue) => {
            currencyList = [];
            filteredValue.map((currency, index) => {
                currencyList.push({
                    name: currency,
                    id: index,
                    keyName: this.props.keyName
                });
            });
            this.setState({
                options: currencyList
            });
        })

    }

    addCapital = () => {
        let capitalNameList = [];
        let tempdata = [];
        this.props.allCountries.map((country, index) => {
            country.capital && country.capital.map((ele) => {
                tempdata.push(ele);
            })
        })
        tempdata = tempdata.sort(function(a,b){
            return a.localeCompare(b);
        })

        tempdata.map((ele, index) => {
            capitalNameList.push({
                name: ele,
                id: index,
                keyName: this.props.keyName
            });    
        })

        this.setState({
            options: capitalNameList
        })
    }

    addRegion = () => {
        let regionList = [];
        let tempData = [];
        this.props.allCountries.map((country, index) => {
            tempData.push(country.region);
        })
        tempData = tempData.filter((currentValue, index, array) => array.indexOf(currentValue) === index);

        tempData = tempData.sort(function(a,b){
            return a.localeCompare(b);
        })

        tempData.map((ele, index) => {
            regionList.push({
                name: ele,
                id: index,
                keyName: this.props.keyName
            });    
        })

        this.setState({
            options: regionList
        })

    }

    render(){
        return(
            <Multiselect
            options={this.state.options}
            selectedValues={this.state.selectedValue}
            onSelect={this.props.addFilter}
            onRemove={this.props.removeFilter}
            displayValue="name"
            placeholder= {this.props.placeholder}
            style={{textAlign:'center'}}
            />
        );    
    }
}