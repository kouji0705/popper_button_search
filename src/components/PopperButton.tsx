/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

export const PopperButton = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts${searchText ? `?userId=${searchText}` : ''}`;
    // const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${searchText}`);
    const response = await fetch(url);

    const jsonData = await response.json();
    setData(jsonData);
  };


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText) {
        fetchData();
      }
    }, 500); // 500ミリ秒のディレイでAPIコール

    return () => clearTimeout(delayDebounce); // コンポーネントアンマウント時にタイマーをクリア
  }, [fetchData, searchText]);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Toggle Popper
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
        {() => (
          <Paper className={classes.paper}>
            <TextField
              value={searchText}
              onChange={handleInputChange}
              label="User ID"
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
