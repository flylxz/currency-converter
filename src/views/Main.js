import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Currency from '../store/Currency';

import { CurrencyRow } from '../components';

export const Main = observer(() => {
  useEffect(() => {
    if (localStorage.getItem('baseCurrency')) {
      Currency.setBaseCurrency(localStorage.getItem('baseCurrency'));
    }
    if (!Currency.currencyList.length) {
      Currency.fetchCurrencyList();
    }
  }, []);

  useEffect(() => {
    Currency.fetchExchangeRate();
  }, [Currency.fromCurrency, Currency.toCurrency]);

  useEffect(() => {
    localStorage.setItem('baseCurrency', Currency.base);
  }, [Currency.base]);

  const classes = useStyles();

  if (Currency.state === 'pending') {
    return <h2>Loading...</h2>;
  }

  if (Currency.state === 'error') {
    return <h2>Error</h2>;
  }

  return (
    <Grid container justify='center' alignItems='center'>
      <Paper elevation={2}>
        <Box className={classes.formControl}>
          <CurrencyRow
            currencyOptions={Currency.currencyList}
            selectedCurrency={Currency.fromCurrency}
            onChangeCurrency={(e) => Currency.setFromCurrency(e.target.value)}
            onChangeAmount={Currency.handleFromAmountChange}
            amount={Currency.fromAmount}
            base={Currency.base}
            setBaseCurrency={Currency.setBaseCurrency}
          />
          <Box className={classes.equal}>=</Box>
          <CurrencyRow
            currencyOptions={Currency.currencyList}
            selectedCurrency={Currency.toCurrency}
            onChangeCurrency={(e) => Currency.setToCurrency(e.target.value)}
            onChangeAmount={Currency.handleToAmountChange}
            amount={Currency.toAmount}
            base={Currency.base}
            setBaseCurrency={Currency.setBaseCurrency}
          />
        </Box>
      </Paper>
    </Grid>
  );
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 8,
    minWidth: 640,
    minHeight: 480,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  equal: {
    margin: 24,
    fontSize: 32,
  },
}));
