import { useContext, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './auth/AuthContext';
import Login from './auth/login';


export default function AppIndex(): ReactElement {
	const { isAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		// TODO - get token
		if (!isAuthenticated)
			router.push('/auth/login');
		else
			router.push('/home');
	}, []);

	return (
		<Login />
	);
}
