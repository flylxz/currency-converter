import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { List, ListItem, Checkbox, Typography } from '@material-ui/core';

import Currency from '../store/Currency';

export const CurrencyList = observer(() => {
  useEffect(() => {
    if (localStorage.getItem('baseCurrency')) {
      Currency.setBaseCurrency(localStorage.getItem('baseCurrency'));
    }
    Currency.fetchCurrencyList();
  }, []);

  const base = Currency.base;

  if (Currency.state === 'pending') {
    return <h2>loading...</h2>;
  }

  if (Currency.state === 'error') {
    return <h2>Error...</h2>;
  }

  return (
    <div>
      <Typography variant='h4'>Base currency: {base}</Typography>
      <List>
        {Currency.currencyList.map((item) => (
          <ListItem divider={true} key={item.name}>
            {item.name} - {item.rate}x{base} Favorite{' '}
            <Checkbox
              type='checkbox'
              checked={item.isFav}
              color='primary'
              onChange={() => Currency.setFav(item.name)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
});
