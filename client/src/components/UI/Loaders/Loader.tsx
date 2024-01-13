import Reasct, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';

interface LoaderProps {
  style: object;
}

const Loader: FC<LoaderProps> = ({ style }) => {
  return <CircularProgress style={style} />;
};

export default Loader;
