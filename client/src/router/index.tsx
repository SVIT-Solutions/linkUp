import React from 'react';
import Auth from 'pages/Auth';
import ConfirmEmail from 'pages/Auth/ConfirmEmail';
import PasswordResetRequest from 'pages/Auth/PasswordResetRequest';
import AccountConfirmationEmailSent from 'pages/Messages/AccountConfirmationEmailSent';
import Home from 'pages/Home';
import ResetPassword from 'pages/Auth/ResetPassword';

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
  PASSWORD_RESET_REQUEST = '/password-reset-request',
  PASSWORD_RESET = '/password-reset',
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
  {
    path: RouteNames.PASSWORD_RESET_REQUEST,
    element: PasswordResetRequest,
  },
  {
    path: RouteNames.PASSWORD_RESET,
    element: ResetPassword,
  },
];

export const privateRoutes: IRoute[] = [{ path: '*', element: Home }];
