/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as AboutImport } from './routes/about'
import { Route as DashboardLayoutImport } from './routes/dashboard/layout'
import { Route as AuthLayoutImport } from './routes/auth/layout'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as AuthForgortPasswordImport } from './routes/auth/forgort-password'
import { Route as DashboardRepositoriesIndexImport } from './routes/dashboard/repositories/index'
import { Route as DashboardGistsIndexImport } from './routes/dashboard/gists/index'

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const DashboardLayoutRoute = DashboardLayoutImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthForgortPasswordRoute = AuthForgortPasswordImport.update({
  id: '/forgort-password',
  path: '/forgort-password',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const DashboardRepositoriesIndexRoute = DashboardRepositoriesIndexImport.update(
  {
    id: '/repositories/',
    path: '/repositories/',
    getParentRoute: () => DashboardLayoutRoute,
  } as any,
)

const DashboardGistsIndexRoute = DashboardGistsIndexImport.update({
  id: '/gists/',
  path: '/gists/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardLayoutImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/auth/forgort-password': {
      id: '/auth/forgort-password'
      path: '/forgort-password'
      fullPath: '/auth/forgort-password'
      preLoaderRoute: typeof AuthForgortPasswordImport
      parentRoute: typeof AuthLayoutImport
    }
    '/auth/': {
      id: '/auth/'
      path: '/'
      fullPath: '/auth/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthLayoutImport
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/gists/': {
      id: '/dashboard/gists/'
      path: '/gists'
      fullPath: '/dashboard/gists'
      preLoaderRoute: typeof DashboardGistsIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/repositories/': {
      id: '/dashboard/repositories/'
      path: '/repositories'
      fullPath: '/dashboard/repositories'
      preLoaderRoute: typeof DashboardRepositoriesIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthForgortPasswordRoute: typeof AuthForgortPasswordRoute
  AuthIndexRoute: typeof AuthIndexRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthForgortPasswordRoute: AuthForgortPasswordRoute,
  AuthIndexRoute: AuthIndexRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

interface DashboardLayoutRouteChildren {
  DashboardIndexRoute: typeof DashboardIndexRoute
  DashboardGistsIndexRoute: typeof DashboardGistsIndexRoute
  DashboardRepositoriesIndexRoute: typeof DashboardRepositoriesIndexRoute
}

const DashboardLayoutRouteChildren: DashboardLayoutRouteChildren = {
  DashboardIndexRoute: DashboardIndexRoute,
  DashboardGistsIndexRoute: DashboardGistsIndexRoute,
  DashboardRepositoriesIndexRoute: DashboardRepositoriesIndexRoute,
}

const DashboardLayoutRouteWithChildren = DashboardLayoutRoute._addFileChildren(
  DashboardLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/dashboard': typeof DashboardLayoutRouteWithChildren
  '/about': typeof AboutRoute
  '/profile': typeof ProfileRoute
  '/auth/forgort-password': typeof AuthForgortPasswordRoute
  '/auth/': typeof AuthIndexRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/dashboard/gists': typeof DashboardGistsIndexRoute
  '/dashboard/repositories': typeof DashboardRepositoriesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/profile': typeof ProfileRoute
  '/auth/forgort-password': typeof AuthForgortPasswordRoute
  '/auth': typeof AuthIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/dashboard/gists': typeof DashboardGistsIndexRoute
  '/dashboard/repositories': typeof DashboardRepositoriesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/dashboard': typeof DashboardLayoutRouteWithChildren
  '/about': typeof AboutRoute
  '/profile': typeof ProfileRoute
  '/auth/forgort-password': typeof AuthForgortPasswordRoute
  '/auth/': typeof AuthIndexRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/dashboard/gists/': typeof DashboardGistsIndexRoute
  '/dashboard/repositories/': typeof DashboardRepositoriesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/dashboard'
    | '/about'
    | '/profile'
    | '/auth/forgort-password'
    | '/auth/'
    | '/dashboard/'
    | '/dashboard/gists'
    | '/dashboard/repositories'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/profile'
    | '/auth/forgort-password'
    | '/auth'
    | '/dashboard'
    | '/dashboard/gists'
    | '/dashboard/repositories'
  id:
    | '__root__'
    | '/'
    | '/auth'
    | '/dashboard'
    | '/about'
    | '/profile'
    | '/auth/forgort-password'
    | '/auth/'
    | '/dashboard/'
    | '/dashboard/gists/'
    | '/dashboard/repositories/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
  DashboardLayoutRoute: typeof DashboardLayoutRouteWithChildren
  AboutRoute: typeof AboutRoute
  ProfileRoute: typeof ProfileRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
  DashboardLayoutRoute: DashboardLayoutRouteWithChildren,
  AboutRoute: AboutRoute,
  ProfileRoute: ProfileRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth",
        "/dashboard",
        "/about",
        "/profile"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/auth": {
      "filePath": "auth/layout.tsx",
      "children": [
        "/auth/forgort-password",
        "/auth/"
      ]
    },
    "/dashboard": {
      "filePath": "dashboard/layout.tsx",
      "children": [
        "/dashboard/",
        "/dashboard/gists/",
        "/dashboard/repositories/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/auth/forgort-password": {
      "filePath": "auth/forgort-password.tsx",
      "parent": "/auth"
    },
    "/auth/": {
      "filePath": "auth/index.tsx",
      "parent": "/auth"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/gists/": {
      "filePath": "dashboard/gists/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/repositories/": {
      "filePath": "dashboard/repositories/index.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
