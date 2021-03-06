export const REGISTER_USER = '/auth/local/register',
	LOGIN = '/auth/local',
	FORGOT_PASSWORD = '/auth/forgot-password',
	RESET_PASSWORD = '/auth/reset-password',
	CURRENT_USER = '/users/me',
	AVAILABLE_BENEFITS = '/benefits',
	USERS_BENEFITS = (id: number) => `/benefits/user/${id}`,
	UPDATE_USER = (id: number): string => `/users/${id}`;
