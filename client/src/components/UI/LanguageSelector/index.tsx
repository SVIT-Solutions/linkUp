import React, { FC, useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { languages } from 'languages';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

interface LanguageSelectorProps {
  style?: React.CSSProperties;
}

const useStyles = makeStyles({
  wrapper: { display: 'flex', alignItems: 'center' },
});

const LanguageSelector: FC<LanguageSelectorProps> = ({ style }) => {
  const classes = useStyles();

  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLanguageChange = (lng: string) => () => {
    setAnchorEl(null);
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <Box className={classes.wrapper} style={style}>
      <IconButton
        onClick={handleClick}
        color="secondary"
        style={{ fontSize: '16px' }}
      >
        {i18n.language.toUpperCase()}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((language) => (
          <MenuItem
            key={language}
            value={language}
            onClick={onLanguageChange(language)}
          >
            {language.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
