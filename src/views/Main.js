import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Currency from '../store/Currency';

import { CurrencyRow } from '../components';

export const Main = observer(() => {
  useEffect(() => {
    if (localStorage.getItem('baseCurrency')) {
      Currency.setBaseCurrency(localStorage.getItem('baseCurrency'));
    }
    Currency.fetchCurrencyList();
  }, []);

  useEffect(() => {
    Currency.fetchExchangeRate();
  }, [Currency.fromCurrency, Currency.toCurrency]);

  useEffect(() => {
    localStorage.setItem('baseCurrency', Currency.base);
  }, [Currency.base]);

  if (Currency.state === 'pending') {
    return <h2>Loading...</h2>;
  }

  if (Currency.state === 'error') {
    return <h2>Error</h2>;
  }

  return (
    <>
      <CurrencyRow
        currencyOptions={Currency.currencyList}
        selectedCurrency={Currency.fromCurrency}
        onChangeCurrency={(e) => Currency.setFromCurrency(e.target.value)}
        onChangeAmount={Currency.handleFromAmountChange}
        amount={Currency.fromAmount}
        base={Currency.base}
        setBaseCurrency={Currency.setBaseCurrency}
      />
      <div className='equals'>=</div>
      <CurrencyRow
        currencyOptions={Currency.currencyList}
        selectedCurrency={Currency.toCurrency}
        onChangeCurrency={(e) => Currency.setToCurrency(e.target.value)}
        onChangeAmount={Currency.handleToAmountChange}
        amount={Currency.toAmount}
        base={Currency.base}
        setBaseCurrency={Currency.setBaseCurrency}
      />
    </>
  );
});
