import React, { useState, useEffect } from 'react';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: 200,
    width: 200,
    opacity: 0.7,
    zIndex: 1,
    '&:hover': {
      opacity: 1,
    },
  },
  close: {
    zIndex: 10,
    right: 0,
    position: 'absolute',
    cursor: 'pointer',
  },
}));

export const Thumb = ({ file, className, onRemove }) => {
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState();
  const classes = useStyles();
  useEffect(() => {
    if (file) {
      let reader = new FileReader();

      reader.onloadend = () => {
        setLoading(false);
        setThumb(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  if (!file) return null;

  if (loading) return <p>loading...</p>;

  return (
    <div className={classes.root}>
      <img
        src={thumb}
        alt={file.name}
        className={className}
        height={200}
        width={200}
      />
      <Close onClick={onRemove} className={classes.close} />
    </div>
  );
};
