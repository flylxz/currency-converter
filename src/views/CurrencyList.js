import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, List, Typography, Paper, Box } from '@material-ui/core';

import Currency from '../store/Currency';
import { ListItemComponent } from '../components';

export const CurrencyList = observer(() => {
  useEffect(() => {
    if (localStorage.getItem('baseCurrency')) {
      Currency.setBaseCurrency(localStorage.getItem('baseCurrency'));
    }
    if (localStorage.getItem('favList')) {
      Currency.favList = JSON.parse(localStorage.getItem('favList'));
    }
    if (!Currency.currencyList.length) {
      Currency.fetchCurrencyList();
    }
    Currency._favChecker(Currency.currencyList);
  }, []);

  useEffect(() => {
    localStorage.setItem('favList', JSON.stringify(Currency.favList));
  }, [Currency.favList]);

  const base = Currency.base;

  if (Currency.state === 'pending') {
    return <h2>loading...</h2>;
  }

  if (Currency.state === 'error') {
    return <h2>Error...</h2>;
  }

  return (
    <Grid
      container
      my={2}
      direction='column'
      justify='center'
      alignItems='center'
    >
      <Grid item>
        <Paper elevation={2}>
          <Box m={3}>
            <Typography variant='h4'>Base currency: {base}</Typography>
          </Box>
          <List>
            {Currency.currencyList.map((item) => (
              <ListItemComponent
                key={item.name}
                base={base}
                setFav={Currency.setFav}
                item={item}
              />
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
});
