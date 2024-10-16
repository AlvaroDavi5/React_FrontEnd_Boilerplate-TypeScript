import { createContext, useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import ToastMessagesConstants from '@configs/constants/ToastMessages.constants';
import { saveToken } from '@common/cookies';
import { EndpointInterface, PagePropsInterface } from '@shared/internal/interfaces/nextRoutesInterface';
import { UserAuthInterface } from '@shared/internal/interfaces/userAuthInterface';


export interface SignInProps {
	email: string,
	password: string,
}

type signInType = ({ email, password }: SignInProps) => Promise<boolean>

const { loginToasts } = new ToastMessagesConstants();

export const AuthContext = createContext<{ authUser?: UserAuthInterface, isAuthenticated: boolean, SignIn: signInType }>({} as any);

export default function AuthProvider({ children }: { children: ReactElement }) {
	const router = useRouter();
	const [loggedUser, setLoggedUser] = useState<any>(null);
	const [authUser, setAuthUser] = useState<UserAuthInterface>();
	const toast = useToast();
	const isAuthenticated = !!loggedUser?.token?.length;


	function signInError() {
		const { error: errorToast } = loginToasts;
		toast({
			status: errorToast.status as any,
			title: errorToast.title,
			description: errorToast.description,
			duration: 1500,
			isClosable: true,
		});
	}

	async function SignIn({ email = '', password = '' }: SignInProps): Promise<boolean> {
		try {
			const { data: user } = await axios.put(`${process.env.MOCKED_SERVICE_URL}/api/users/`, {
				email,
				password,
			});
			setLoggedUser(user);

			if (isAuthenticated) {
				const { success: successToast } = loginToasts;
				toast({
					status: successToast.status as any,
					title: successToast.title,
					description: successToast.description,
					duration: 1500,
					isClosable: true,
				});

				saveToken(loggedUser.token);

				// redirecting route
				router.push(`/home`);
				return isAuthenticated;
			} else {
				signInError();
				return isAuthenticated;
			}
		} catch (error) {
			console.error(error);
			signInError();
			return isAuthenticated;
		}
	}

	return (
		<AuthContext.Provider value={{ authUser, isAuthenticated, SignIn }}>
			{children}
		</AuthContext.Provider>
	);
}

export async function getServerSideProps(context: EndpointInterface): Promise<PagePropsInterface> {
	return {
		context: context,
	};
}
