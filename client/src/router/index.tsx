import Auth from 'pages/Auth';
import ConfirmEmail from 'pages/Auth/ConfirmEmail';
import Home from 'pages/Home';
import AccountConfirmationEmailSent from 'pages/Messages/AccountConfirmationEmailSent';
import React from 'react';

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum RouteNames {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  CONFIRM_EMAIL = '/confirm-email',
  CONFIRM_EMAIL_MESSAGE = '/account-confirmation-email-sent',
}

export const publicRoutes: IRoute[] = [
  { path: '*', element: Home },
  { path: RouteNames.LOGIN, element: Auth },
  { path: RouteNames.REGISTER, element: Auth },
  { path: RouteNames.CONFIRM_EMAIL, element: ConfirmEmail },
  {
    path: RouteNames.CONFIRM_EMAIL_MESSAGE,
    element: AccountConfirmationEmailSent,
  },
];

export const privateRoutes: IRoute[] = [{ path: '*', element: Home }];
