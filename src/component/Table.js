export default function Table(props) {
    
    return(
      <>
      { props.countries &&
        <table className="table align-middle">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Official Name</th>
            <th>Language</th>
            <th>Currency</th>
            <th>Capital</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {props.countries.map((country, index) => {
            return (
                <tr key = {index}>
                  <td>{(props.count - 9) + index}</td>
                  <td>{country.name.common}</td>
                  <td>{country.name.official}</td>
                  <td>
                    {
                      country.languages &&
                      Object.values(country.languages).map((language, index) => {
                        return <span key={index} style={{display: 'block', whiteSpace: 'nowrap'}}>{language}</span>
                      })
                    }
                  </td>
                  <td>
                    {
                      country.currencies &&
                      Object.values(country.currencies).map((currency, index) => {
                        return <span key={index} style={{display: 'block', whiteSpace: 'nowrap'}}>{currency.name}</span>
                      })
                    }
                  </td>
                  <td>{country.capital}</td>
                  <td>{country.region}</td>
                </tr>
            );
          })}
        </tbody>
      </table>

      }
      
      </>

    );
}