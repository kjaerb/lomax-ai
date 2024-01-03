/**
 * @description This file contains all the public routes of the application
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/auth"] as const;

/**
 * @description This file contains all the protected routes of the application
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/nps/dashboard",
  "/nps/dashboard/segment",
  "/nps/dashboard/history",
] as const;

/**
 * @description This file contains all the api routes of the application
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth" as const;

/**
 * @description This file contains the default login redirect of the application
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/nps/segment" as const;
