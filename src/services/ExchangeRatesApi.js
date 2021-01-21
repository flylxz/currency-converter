class ExchangeRatesApi {
  _API_BASE = 'https://api.exchangeratesapi.io/latest';

  getResource = async (base = '', symbols = '') => {
    try {
      const res = await fetch(
        `${this._API_BASE}?base=${base}&symbols=${symbols}`
      );
      const data = await res.json();
      return this._addCheck(data);
    } catch (e) {
      console.log(e);
    }
  };

  _addCheck = (res) => {
    return {
      base: res.base,
      rates: Object.keys(res.rates).map((key) => ({
        name: key,
        rate: res.rates[key],
        isFav: false,
      })),
    };
  };
}

export default new ExchangeRatesApi();
