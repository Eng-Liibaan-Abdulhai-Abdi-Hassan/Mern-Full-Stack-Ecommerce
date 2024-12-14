const CurrencyChange = (currency) => {
    let setcurrent = new Intl.NumberFormat('us-in', {
        currency:'INR',
        style:'currency',
        minimumIntegerDigits: 2,

    })
    return setcurrent.format(currency)
}

export default CurrencyChange
