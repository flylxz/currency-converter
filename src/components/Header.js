import { NavLink } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const Header = () => {
  const classes = useStyles();
  return (
    <AppBar
      position='sticky'
      mb={50}
      classes={{
        root: classes.root,
        label: classes.label,
      }}
    >
      <Toolbar variant='dense' classes={{ root: classes.flex }}>
        <Button
          color='inherit'
          component={NavLink}
          to='/'
          exact
          activeStyle={{ fontWeight: 600, color: '#f9de59' }}
          my={2}
        >
          Currency Converter
        </Button>
        <Button
          color='inherit'
          component={NavLink}
          to='/list'
          activeStyle={{ fontWeight: 600, color: '#f9de59' }}
          my={2}
        >
          Exchange Rates
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({
  root: {
    background:
      'linear-gradient(127deg, rgba(134,202,246,0.2) 0%, rgba(30,110,207,0.8) 50%, rgba(154,180,251,0.6) 100%)',
    marginBottom: '30px',
  },
  label: {
    textTransform: 'capitalize',
    color: '#eee',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
  },
});
