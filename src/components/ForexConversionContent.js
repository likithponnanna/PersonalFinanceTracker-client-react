import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../styling/modals.style.client.css'
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const alpha = require('alphavantage')({ key: 'QZTS8QOG36E6LQEI' });


const Checkbox = props => <input type="checkbox" {...props} />;


const options = [
    {
        "value": "AED",
        "label": "United Arab Emirates Dirham"
    },
    {
        "value": "AFN",
        "label": "Afghan Afghani"
    },
    {
        "value": "ALL",
        "label": "Albanian Lek"
    },
    {
        "value": "AMD",
        "label": "Armenian Dram"
    },
    {
        "value": "ANG",
        "label": "Netherlands Antillean Guilder"
    },
    {
        "value": "AOA",
        "label": "Angolan Kwanza"
    },
    {
        "value": "ARS",
        "label": "Argentine Peso"
    },
    {
        "value": "AUD",
        "label": "Australian Dollar"
    },
    {
        "value": "AWG",
        "label": "Aruban Florin"
    },
    {
        "value": "AZN",
        "label": "Azerbaijani Manat"
    },
    {
        "value": "BAM",
        "label": "Bosnia-Herzegovina Convertible Mark"
    },
    {
        "value": "BBD",
        "label": "Barbadian Dollar"
    },
    {
        "value": "BDT",
        "label": "Bangladeshi Taka"
    },
    {
        "value": "BGN",
        "label": "Bulgarian Lev"
    },
    {
        "value": "BHD",
        "label": "Bahraini Dinar"
    },
    {
        "value": "BIF",
        "label": "Burundian Franc"
    },
    {
        "value": "BMD",
        "label": "Bermudan Dollar"
    },
    {
        "value": "BND",
        "label": "Brunei Dollar"
    },
    {
        "value": "BOB",
        "label": "Bolivian Boliviano"
    },
    {
        "value": "BRL",
        "label": "Brazilian Real"
    },
    {
        "value": "BSD",
        "label": "Bahamian Dollar"
    },
    {
        "value": "BTN",
        "label": "Bhutanese Ngultrum"
    },
    {
        "value": "BWP",
        "label": "Botswanan Pula"
    },
    {
        "value": "BZD",
        "label": "Belize Dollar"
    },
    {
        "value": "CAD",
        "label": "Canadian Dollar"
    },
    {
        "value": "CDF",
        "label": "Congolese Franc"
    },
    {
        "value": "CHF",
        "label": "Swiss Franc"
    },
    {
        "value": "CLF",
        "label": "Chilean Unit of Account UF"
    },
    {
        "value": "CLP",
        "label": "Chilean Peso"
    },
    {
        "value": "CNH",
        "label": "Chinese Yuan Offshore"
    },
    {
        "value": "CNY",
        "label": "Chinese Yuan"
    },
    {
        "value": "COP",
        "label": "Colombian Peso"
    },
    {
        "value": "CUP",
        "label": "Cuban Peso"
    },
    {
        "value": "CVE",
        "label": "Cape Verdean Escudo"
    },
    {
        "value": "CZK",
        "label": "Czech Republic Koruna"
    },
    {
        "value": "DJF",
        "label": "Djiboutian Franc"
    },
    {
        "value": "DKK",
        "label": "Danish Krone"
    },
    {
        "value": "DOP",
        "label": "Dominican Peso"
    },
    {
        "value": "DZD",
        "label": "Algerian Dinar"
    },
    {
        "value": "EGP",
        "label": "Egyptian Pound"
    },
    {
        "value": "ERN",
        "label": "Eritrean Nakfa"
    },
    {
        "value": "ETB",
        "label": "Ethiopian Birr"
    },
    {
        "value": "EUR",
        "label": "Euro"
    },
    {
        "value": "FJD",
        "label": "Fijian Dollar"
    },
    {
        "value": "FKP",
        "label": "Falkland Islands Pound"
    },
    {
        "value": "GBP",
        "label": "British Pound Sterling"
    },
    {
        "value": "GEL",
        "label": "Georgian Lari"
    },
    {
        "value": "GHS",
        "label": "Ghanaian Cedi"
    },
    {
        "value": "GIP",
        "label": "Gibraltar Pound"
    },
    {
        "value": "GMD",
        "label": "Gambian Dalasi"
    },
    {
        "value": "GNF",
        "label": "Guinean Franc"
    },
    {
        "value": "GTQ",
        "label": "Guatemalan Quetzal"
    },
    {
        "value": "GYD",
        "label": "Guyanaese Dollar"
    },
    {
        "value": "HKD",
        "label": "Hong Kong Dollar"
    },
    {
        "value": "HNL",
        "label": "Honduran Lempira"
    },
    {
        "value": "HRK",
        "label": "Croatian Kuna"
    },
    {
        "value": "HTG",
        "label": "Haitian Gourde"
    },
    {
        "value": "HUF",
        "label": "Hungarian Forint"
    },
    {
        "value": "IDR",
        "label": "Indonesian Rupiah"
    },
    {
        "value": "ILS",
        "label": "Israeli New Sheqel"
    },
    {
        "value": "INR",
        "label": "Indian Rupee"
    },
    {
        "value": "IQD",
        "label": "Iraqi Dinar"
    },
    {
        "value": "IRR",
        "label": "Iranian Rial"
    },
    {
        "value": "ISK",
        "label": "Icelandic Krona"
    },
    {
        "value": "JEP",
        "label": "Jersey Pound"
    },
    {
        "value": "JMD",
        "label": "Jamaican Dollar"
    },
    {
        "value": "JOD",
        "label": "Jordanian Dinar"
    },
    {
        "value": "JPY",
        "label": "Japanese Yen"
    },
    {
        "value": "KES",
        "label": "Kenyan Shilling"
    },
    {
        "value": "KGS",
        "label": "Kyrgystani Som"
    },
    {
        "value": "KHR",
        "label": "Cambodian Riel"
    },
    {
        "value": "KMF",
        "label": "Comorian Franc"
    },
    {
        "value": "KPW",
        "label": "North Korean Won"
    },
    {
        "value": "KRW",
        "label": "South Korean Won"
    },
    {
        "value": "KWD",
        "label": "Kuwaiti Dinar"
    },
    {
        "value": "KYD",
        "label": "Cayman Islands Dollar"
    },
    {
        "value": "KZT",
        "label": "Kazakhstani Tenge"
    },
    {
        "value": "LAK",
        "label": "Laotian Kip"
    },
    {
        "value": "LBP",
        "label": "Lebanese Pound"
    },
    {
        "value": "LKR",
        "label": "Sri Lankan Rupee"
    },
    {
        "value": "LRD",
        "label": "Liberian Dollar"
    },
    {
        "value": "LSL",
        "label": "Lesotho Loti"
    },
    {
        "value": "LYD",
        "label": "Libyan Dinar"
    },
    {
        "value": "MAD",
        "label": "Moroccan Dirham"
    },
    {
        "value": "MDL",
        "label": "Moldovan Leu"
    },
    {
        "value": "MGA",
        "label": "Malagasy Ariary"
    },
    {
        "value": "MKD",
        "label": "Macedonian Denar"
    },
    {
        "value": "MMK",
        "label": "Myanma Kyat"
    },
    {
        "value": "MNT",
        "label": "Mongolian Tugrik"
    },
    {
        "value": "MOP",
        "label": "Macanese Pataca"
    },
    {
        "value": "MRO",
        "label": "Mauritanian Ouguiya (pre-2018)"
    },
    {
        "value": "MRU",
        "label": "Mauritanian Ouguiya"
    },
    {
        "value": "MUR",
        "label": "Mauritian Rupee"
    },
    {
        "value": "MVR",
        "label": "Maldivian Rufiyaa"
    },
    {
        "value": "MWK",
        "label": "Malawian Kwacha"
    },
    {
        "value": "MXN",
        "label": "Mexican Peso"
    },
    {
        "value": "MYR",
        "label": "Malaysian Ringgit"
    },
    {
        "value": "MZN",
        "label": "Mozambican Metical"
    },
    {
        "value": "NAD",
        "label": "Namibian Dollar"
    },
    {
        "value": "NGN",
        "label": "Nigerian Naira"
    },
    {
        "value": "NOK",
        "label": "Norwegian Krone"
    },
    {
        "value": "NPR",
        "label": "Nepalese Rupee"
    },
    {
        "value": "NZD",
        "label": "New Zealand Dollar"
    },
    {
        "value": "OMR",
        "label": "Omani Rial"
    },
    {
        "value": "PAB",
        "label": "Panamanian Balboa"
    },
    {
        "value": "PEN",
        "label": "Peruvian Nuevo Sol"
    },
    {
        "value": "PGK",
        "label": "Papua New Guinean Kina"
    },
    {
        "value": "PHP",
        "label": "Philippine Peso"
    },
    {
        "value": "PKR",
        "label": "Pakistani Rupee"
    },
    {
        "value": "PLN",
        "label": "Polish Zloty"
    },
    {
        "value": "PYG",
        "label": "Paraguayan Guarani"
    },
    {
        "value": "QAR",
        "label": "Qatari Rial"
    },
    {
        "value": "RON",
        "label": "Romanian Leu"
    },
    {
        "value": "RSD",
        "label": "Serbian Dinar"
    },
    {
        "value": "RUB",
        "label": "Russian Ruble"
    },
    {
        "value": "RUR",
        "label": "Old Russian Ruble"
    },
    {
        "value": "RWF",
        "label": "Rwandan Franc"
    },
    {
        "value": "SAR",
        "label": "Saudi Riyal"
    },
    {
        "value": "SBDf",
        "label": "Solomon Islands Dollar"
    },
    {
        "value": "SCR",
        "label": "Seychellois Rupee"
    },
    {
        "value": "SDG",
        "label": "Sudanese Pound"
    },
    {
        "value": "SEK",
        "label": "Swedish Krona"
    },
    {
        "value": "SGD",
        "label": "Singapore Dollar"
    },
    {
        "value": "SHP",
        "label": "Saint Helena Pound"
    },
    {
        "value": "SLL",
        "label": "Sierra Leonean Leone"
    },
    {
        "value": "SOS",
        "label": "Somali Shilling"
    },
    {
        "value": "SRD",
        "label": "Surinamese Dollar"
    },
    {
        "value": "SYP",
        "label": "Syrian Pound"
    },
    {
        "value": "SZL",
        "label": "Swazi Lilangeni"
    },
    {
        "value": "THB",
        "label": "Thai Baht"
    },
    {
        "value": "TJS",
        "label": "Tajikistani Somoni"
    },
    {
        "value": "TMT",
        "label": "Turkmenistani Manat"
    },
    {
        "value": "TND",
        "label": "Tunisian Dinar"
    },
    {
        "value": "TOP",
        "label": "Tongan Pa'anga"
    },
    {
        "value": "TRY",
        "label": "Turkish Lira"
    },
    {
        "value": "TTD",
        "label": "Trinidad and Tobago Dollar"
    },
    {
        "value": "TWD",
        "label": "New Taiwan Dollar"
    },
    {
        "value": "TZS",
        "label": "Tanzanian Shilling"
    },
    {
        "value": "UAH",
        "label": "Ukrainian Hryvnia"
    },
    {
        "value": "UGX",
        "label": "Ugandan Shilling"
    },
    {
        "value": "USD",
        "label": "United States Dollar"
    },
    {
        "value": "UYU",
        "label": "Uruguayan Peso"
    },
    {
        "value": "UZS",
        "label": "Uzbekistan Som"
    },
    {
        "value": "VND",
        "label": "Vietnamese Dong"
    },
    {
        "value": "VUV",
        "label": "Vanuatu Vatu"
    },
    {
        "value": "WST",
        "label": "Samoan Tala"
    },
    {
        "value": "XAF",
        "label": "CFA Franc BEAC"
    },
    {
        "value": "XAG",
        "label": "Silver Ounce"
    },
    {
        "value": "XCD",
        "label": "East Caribbean Dollar"
    },
    {
        "value": "XDR",
        "label": "Special Drawing Rights"
    },
    {
        "value": "XOF",
        "label": "CFA Franc BCEAO"
    },
    {
        "value": "XPF",
        "label": "CFP Franc"
    },
    {
        "value": "YER",
        "label": "Yemeni Rial"
    },
    {
        "value": "ZAR",
        "label": "South African Rand"
    },
    {
        "value": "ZMW",
        "label": "Zambian Kwacha"
    },
    {
        "value": "ZWL",
        "label": "Zimbabwean Dollar"
    }
    ]

const selectStyles = {
    menu: base => ({
        ...base,
        zIndex: 100
    })
};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});




class ForexConversionContent extends React.Component {

    state = {
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
        convertedTog: false
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    handleChangeSec = (selectedOption) => {
        this.setState({ selectedOptionDest: selectedOption });
        console.log(`Option selected 2:`, selectedOption);
    }

    handleChangeText = currencyAmount => event => {

        this.setState({ currencyAmount: event.target.value });
    };

    toggleConvertedVal =() =>
        this.setState({
            convertedTog: true
        })


    convertCurrency = ()=> {
        if(this.state.currencyAmount===""|| this.state.currencyAmount===undefined || this.state.currencyAmount===null ){
            alert("Enter the amount first");
        }else {

            if(this.state.selectedOption===undefined  && this.state.selectedOptionDest===undefined ){
                alpha.forex.rate("USD", "EUR")
                    .then(conversion => {
                        console.log("Forex Response", conversion)
                        this.setState({
                            convertedFinalAns: this.state.currencyAmount * conversion["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
                        })
                    })
            }
            else if(this.state.selectedOption===undefined )
            {

                let dest = "EUR";
                if(this.state.selectedOptionDest !==undefined && this.state.selectedOptionDest.value!==undefined){
                    dest = this.state.selectedOptionDest.value;
                }

                alpha.forex.rate("USD", dest )
                    .then(conversion => {
                        console.log("Forex Response", conversion);
                        this.setState({
                            convertedFinalAns: this.state.currencyAmount * conversion["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
                        })
                    })
            }else if(this.state.selectedOptionDest===undefined ){
                alpha.forex.rate("EUR", this.state.selectedOptionDest!==undefined ? this.state.selectedOptionDest.value : "USD")
                    .then(conversion => {
                        console.log("Forex Response", conversion);
                        this.setState({
                            convertedFinalAns: this.state.currencyAmount * conversion["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
                        })
                    })
            }

            this.toggleConvertedVal();

        }
    }


    render() {
        const { classes } = this.props;

        const {
            isClearable,
            isSearchable,
            isRtl,
        } = this.state;

        return (

            <div className="container">
                {this.state.convertedTog &&  <div className="card row  web-dev-margin-left-right-twenty-five mb-4 text-center" >
                    <h4 className="text-center">Converted Value:{this.state.selectedOptionDest!==undefined ? " "+ this.state.selectedOptionDest.value+ " " : " USD "}
                    {" "+this.state.convertedFinalAns+ " "} </h4>
                </div> }
                    <br/>
                <div className="card row web-dev-card-header-bg p-1" >
                    <label htmlFor="forCur" className="text-center web-dev-card-header-bg web-dev-white-text text-center"> Select Source Currency</label>
                                <Select id="forCur"   options={options}
                                        isClearable={isClearable}
                                        isSearchable={isSearchable}
                                        styles={selectStyles}
                                        onChange={this.handleChange}
                                        defaultValue={{ label: "Euro", value: "Euro" }}
                                        />
                            </div>

                <div className="card row  web-dev-black-text" >
                <TextField
                    id="outlined-with-placeholder"
                    label="Enter the amount"
                    placeholder="Placeholder"
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChangeText('currencyAmount')}
                />
                </div>


                <div className="card row web-dev-card-header-bg p-1" >
                    <label htmlFor="forCur" className="text-center web-dev-card-header-bg web-dev-white-text"> Select Source Currency</label>
                    <Select id="forCur"  options={options}
                            isClearable={isClearable}
                            isSearchable={isSearchable}
                            styles={selectStyles}
                            onChange={this.handleChangeSec}
                            defaultValue={{ label: "United States Dollar", value: "USD" }}/>
                </div>

                <br/>
                <br/>
                <div className="card row bg-secondary web-dev-margin-left-right-twenty-five" >
                <button className="btn btn-dark" onClick={()=>{this.convertCurrency(); }}>Convert</button>
                </div>
            </div>





        )
    }
}

ForexConversionContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForexConversionContent);
