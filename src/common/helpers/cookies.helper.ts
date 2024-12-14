import { parseCookies, setCookie } from 'nookies';


export function saveToken(token: string): void {
	setCookie(undefined, 'boilerplate-token', token, {
		maxAge: 60 * 60 * 3, // 3 hours
	});
}

export function getToken(): string {
	const { 'boilerplate-token': token } = parseCookies();

	return token;
}
