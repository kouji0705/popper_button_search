import React from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
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
        Popper Button
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
        {() => (
          <Paper className={classes.paper}>
            <Button >List1</Button>
            <Button >List2</Button>
            <Button >List3</Button>
            <Button >List4</Button>
          </Paper>
        )}
      </Popper>
    </div>
  );
};

export default PopperButton;
