import { useState } from 'react';

const useEditForm = (initialState) => {
  const [disabled, setDisabled] = useState(initialState);

  return [disabled, setDisabled];
};

export default useEditForm;
