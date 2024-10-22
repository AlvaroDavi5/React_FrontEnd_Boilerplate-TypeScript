import { useContext, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './auth/AuthContext';
import Login from './auth/login';
import { getToken } from '@common/cookies';


export default function AppIndex(): ReactElement {
	const { isAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		const token = getToken() ?? '';
		if (!isAuthenticated && !token.length)
			router.push('/auth/login');
		else
			router.push('/home');
	}, [isAuthenticated]);

	return (
		<Login />
	);
}
