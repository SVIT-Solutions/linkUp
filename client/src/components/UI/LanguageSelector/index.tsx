import React, { FC, useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { languages } from 'languages';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  sx?: object;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ sx }) => {
  const { t, i18n } = useTranslation();

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
    <Box sx={sx} style={{ display: 'flex', alignItems: 'center' }}>
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
