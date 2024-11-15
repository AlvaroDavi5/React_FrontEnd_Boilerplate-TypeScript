import { useContext, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '@common/cookies';
import { AuthContext } from '@pages/auth/AuthContext';
import Login from '@pages/auth/login';


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
