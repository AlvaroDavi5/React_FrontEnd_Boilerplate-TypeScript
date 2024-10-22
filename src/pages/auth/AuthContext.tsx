import { createContext, useState, ReactElement } from 'react';
import { EndpointInterface, PagePropsInterface } from '@shared/internal/interfaces/nextRoutesInterface';
import { UserAuthInterface } from '@shared/internal/interfaces/userAuthInterface';


export interface SignInProps {
	email: string,
	password: string,
}

export const AuthContext = createContext<{
	isAuthenticated: boolean, setIsAuthenticated:(input: boolean) => void,
	authUser?: UserAuthInterface, setAuthUser: (input: UserAuthInterface) => void
		}>({
			isAuthenticated: false,
			setIsAuthenticated: () => { },
			setAuthUser: () => { },
		});

export default function AuthProvider({ children }: { children: ReactElement }): ReactElement {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [authUser, setAuthUser] = useState<UserAuthInterface>();

	return (
		<AuthContext.Provider value={{ authUser, isAuthenticated, setAuthUser, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
}

export async function getServerSideProps(context: EndpointInterface): Promise<PagePropsInterface> {
	return {
		context: context,
	};
}
