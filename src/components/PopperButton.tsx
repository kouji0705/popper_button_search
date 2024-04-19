/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const PopperButton = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = React.useState('');

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prev) => !prev);
    if (!open) { // Only fetch data when the Popper is not already open
      await fetchData();
    }
  };

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const jsonData = await response.json();
    setData(jsonData.slice(0, 10)); // Just an example to limit the data
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        PopperButton
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
        {() => (
          <Paper className={classes.paper}>
            <TextField
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              label="Search"
              variant="outlined"
              fullWidth
            />
            <Typography variant="h6">API Data:</Typography>
            {data.map((item, index) => (
              <Typography key={index}>{item.title}</Typography>
            ))}
          </Paper>
        )}
      </Popper>
    </div>
  );
};

