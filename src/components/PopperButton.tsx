import React from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const PopperButton = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Toggle Popper
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
        {() => (
          <Paper className={classes.paper}>
            <Typography variant="body1">Here's some relevant information.</Typography>
          </Paper>
        )}
      </Popper>
    </div>
  );
};

export default PopperButton;
