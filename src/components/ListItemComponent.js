import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  ListItemIcon,
} from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';

export const ListItemComponent = ({ item, base, setFav }) => {
  return (
    <ListItem dense button onClick={() => setFav(item.name)}>
      <ListItemIcon>{item.isFav ? <Star /> : <StarBorder />}</ListItemIcon>
      <ListItemText primary={`${item.name} - ${item.rate}x${base}`} />
      <ListItemSecondaryAction></ListItemSecondaryAction>
    </ListItem>
  );
};
