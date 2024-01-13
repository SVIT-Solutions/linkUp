import Reasct, { FC } from 'react';
import { CircularProgress } from '@mui/material';

interface LoaderProps {
  style: object;
}

const Loader: FC<LoaderProps> = ({ style }) => {
  return <CircularProgress style={style} />;
};

export default Loader;
