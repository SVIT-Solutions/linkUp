import Auth from 'pages/Auth';
import Home from 'pages/Home';
import React from 'react';

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum RouteNames {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
}

export const publicRoutes: IRoute[] = [
  { path: '*', element: Home },
  { path: RouteNames.LOGIN, element: Auth },
  { path: RouteNames.REGISTER, element: Auth },
];

export const privateRoutes: IRoute[] = [{ path: '*', element: Home }];
