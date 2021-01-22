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
        this._handleAmountCalculate();
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
      console.log('error: ', e.message);
    }
  };

  setBaseCurrency = (name) => {
    this.base = name;
  };

  setFav = (name) => {
    this.currencyList = [...this.currencyList]
      .map((item) =>
        item.name === name ? { ...item, isFav: !item.isFav } : item
      )
      .sort((a, b) => {
        return b.isFav - a.isFav;
      });

    if (this.favList.includes(name)) {
      this.favList = this.favList.filter((item) => item !== name);
    } else {
      this.favList = [...this.favList, name];
    }
  };

  setFromCurrency = (value) => (this.fromCurrency = value);

  setToCurrency = (value) => (this.toCurrency = value);

  handleFromAmountChange = (e) => {
    this.amount = e.target.value;
    this.amountInFromCurrency = true;
    this._handleAmountCalculate();
  };

  handleToAmountChange = (e) => {
    this.amount = e.target.value;
    this.amountInFromCurrency = false;
    this._handleAmountCalculate();
  };

  _handleAmountCalculate = () => {
    if (this.amountInFromCurrency) {
      this.fromAmount = +this.amount;
      this.toAmount = +(this.amount * this.exchangeRate);
    } else {
      this.toAmount = +this.amount;
      this.fromAmount = +(this.amount / this.exchangeRate);
    }
  };

  _favChecker = (arr) => {
    return [...arr]
      .map((item) =>
        this.favList.includes(item.name) ? { ...item, isFav: true } : item
      )
      .sort((a, b) => {
        return b.isFav - a.isFav;
      });
  };
}

export default new Currency();
