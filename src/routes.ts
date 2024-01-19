/**
 * @description The default login page of the application
 * @type {string}
 */
export const LOGIN_PAGE = "/auth/login" as const;

/**
 * @description The default register page of the application
 * @type {string}
 */
export const REGISTER_PAGE = "/auth/register" as const;

/**
 * @description The default login redirect of the application
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/nps/dashboard" as const;

/**
 * @description An array that contains all the public routes of the application.
 * @type {string[]}
 */
export const publicRoutes: string[] = [LOGIN_PAGE, REGISTER_PAGE] as const;

/**
 * @description This array contains all the protected routes of the application. If the user is not authenticated and tries to access one of these routes, they will be redirected to the login page. Authenticated users will be redirected to {DEFAULT_LOGIN_REDIRECT}
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/nps/dashboard",
  "/nps/dashboard/segment",
  "/nps/dashboard/history",
] as const;

/**
 * @description The prefix for the API authentication routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth" as const;
