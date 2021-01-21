import { Box, Checkbox, Typography } from '@material-ui/core';

export const CurrencyRow = (props) => {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
    base,
    setBaseCurrency,
  } = props;

  return (
    <Box display='flex' alignItems='center'>
      <input
        type='number'
        className='input'
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <Checkbox
        type='checkbox'
        checked={base === selectedCurrency}
        color='primary'
        onChange={() => setBaseCurrency(selectedCurrency)}
      />
      <Typography>Set base currency</Typography>
    </Box>
  );
};
