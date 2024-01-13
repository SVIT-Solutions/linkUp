interface WebsiteSettings {
  themeId?: number | null;
  language?: string | null;
}

export const getWebsiteSettings = (): WebsiteSettings | null => {
  const themeId = Number(localStorage.getItem('themeId'));
  const language = localStorage.getItem('language');
  const settings = { themeId, language };
  return settings;
};

export const getInternalToken = () => {
  const data = localStorage.getItem('token') || sessionStorage.getItem('token');
  const token = (data && JSON.parse(data).token) || '';
  return token;
};
