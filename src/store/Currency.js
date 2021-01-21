import { makeAutoObservable, runInAction } from 'mobx';
import ExchangeRatesApi from '../services/ExchangeRatesApi';

class Currency {
  state = 'pending';
  base = '';
  currencyList = [];
  favList = ['GBP', 'USD'];
  fromCurrency = '';
  toCurrency = '';
  exchangeRate = null;
  amountInFromCurrency = true;
  amount = 0;
  fromAmount = 0;
  toAmount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCurrencyList = async () => {
    this.currencyList = {};
    this.toCurrency = '';
    this.state = 'pending';
    try {
      const data = await ExchangeRatesApi.getResource(this.base);
      runInAction(() => {
        this.currencyList = this._favChecker([...data.rates]);
        this.fromCurrency = data.base;
        this.toCurrency = data.rates[0].name;
        this.exchangeRate = data.rates[0].rate;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
      console.log('error: ', e.message);
    }
  };

  fetchExchangeRate = async () => {
    try {
      const data = await ExchangeRatesApi.getResource(
        this.fromCurrency,
        this.toCurrency
      );
      runInAction(() => {
        this.exchangeRate = data.rates[0].rate;
        this._handleAmountCalculete();
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
      console.log('error: ', e.message);
    }
  };

  setBaseCurrency = (name) => {
    console.log(name);
    this.base = name;
  };

  setFav = (name) => {
    this.currencyList = this.currencyList
      .map((item) =>
        item.name === name ? { ...item, isFav: !item.isFav } : item
      )
      .sort((a, b) => {
        return b.isFav - a.isFav;
      });
    // this.favList = this.currencyList.map((item) => item.name);
    console.log(this.favList);
  };

  setFromCurrency = (value) => (this.fromCurrency = value);

  setToCurrency = (value) => (this.toCurrency = value);

  handleFromAmountChange = (e) => {
    this.amount = e.target.value;
    this.amountInFromCurrency = true;
    this._handleAmountCalculete();
  };

  handleToAmountChange = (e) => {
    this.amount = e.target.value;
    this.amountInFromCurrency = false;
    this._handleAmountCalculete();
  };

  _handleAmountCalculete = () => {
    if (this.amountInFromCurrency) {
      this.fromAmount = +this.amount;
      this.toAmount = +(this.amount * this.exchangeRate);
    } else {
      this.toAmount = +this.amount;
      this.fromAmount = +(this.amount / this.exchangeRate);
    }
  };

  _favChecker = (arr) => {
    return arr
      .map((item) =>
        this.favList.includes(item.name) ? { ...item, isFav: true } : item
      )
      .sort((a, b) => {
        return b.isFav - a.isFav;
      });
  };
}

export default new Currency();
