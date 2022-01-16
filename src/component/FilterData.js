export default function FilteredData(serachData, allCountries) {
    let data = []; 
    serachData = serachData.filter((currentValue, index, array) => array.indexOf(currentValue) === index);
    for (let index = 0; index < serachData.length; index++) {
        let element = serachData[index];
        let searchedText = element.name.toLowerCase();

        allCountries.map((country) => {
            let countryName = country.name.common.toLowerCase();
            let countryOfficialName = country.name.official.toLowerCase();
            let regionName = country.region.toLowerCase();
            if (element.keyName == 'country' || element.keyName == 'region') {
                if (countryName.includes(searchedText) || countryOfficialName.includes(searchedText)
                || regionName.includes(searchedText)) {
                    return data.push(country);
                }
                    
            }
            if (element.keyName == 'capital') {

                country.capital && Object.values(country.capital).map((cap) => {
                    if (cap.toLowerCase().includes(searchedText)) {
                        return data.push(country);
                    }
                });
            }

            if (element.keyName == 'language') {
                country.languages && Object.values(country.languages).map((language) => {
                    if (language.toLowerCase().includes(searchedText)) {
                        return data.push(country);
                    }
                })
            }

            if (element.keyName == 'currency') {
                country.currencies && Object.values(country.currencies).map((currency) => {
                    if (currency.name.toLowerCase().includes(searchedText)) {
                        return data.push(country);
                    }
                })                
            }

        })
    }
    return data;
}