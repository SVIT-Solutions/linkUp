import { Link } from '@material-ui/core';
import { t } from 'i18next';
import React, { FC } from 'react';
import { RouteNames } from 'router';

interface BackToHomePageLinkProps {
  style?: React.CSSProperties;
  className?: string;
}

const BackToHomePageLink: FC<BackToHomePageLinkProps> = ({
  style,
  className,
}) => {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      className={className}
      style={style}
      href={RouteNames.HOME}
    >
      {t('back_to_homepage')}
    </Link>
  );
};

export default BackToHomePageLink;
