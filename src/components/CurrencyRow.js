import {
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

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
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FormControl>
        <TextField
          type='number'
          className='input'
          label='Amount'
          value={amount}
          onChange={onChangeAmount}
        />
        <Select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <Box display='flex' alignItems='center'>
          <Checkbox
            type='checkbox'
            checked={base === selectedCurrency}
            color='primary'
            onChange={() => setBaseCurrency(selectedCurrency)}
          />
          <Typography>Set base currency</Typography>
        </Box>
      </FormControl>
    </Box>
  );
};
