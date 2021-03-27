import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';

const ToggleHideOrShow = ({ value }) => {
  const [hide, setHide] = useState(false);

  return (
    <React.Fragment>
      <span>{hide ? '*****' : value}</span>
      {hide ? (
        <Button size="small" onClick={() => setHide(false)}>
          <VisibilityRoundedIcon size={15} />
        </Button>
      ) : (
        <Button size="small" onClick={() => setHide(true)}>
          <VisibilityOffRoundedIcon size={15} />
        </Button>
      )}
    </React.Fragment>
  );
};

export default ToggleHideOrShow;
