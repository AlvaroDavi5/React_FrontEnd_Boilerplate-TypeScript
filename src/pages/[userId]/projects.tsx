import { useContext, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { getToken } from '@common/cookies';
import { AuthContext } from '@pages/auth/AuthContext';
import DocumentHead from '@pages/components/document_head';
import Navbar from '@pages/components/navbar';


export default function Projects(): ReactElement {
	const { isAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		const token = getToken() ?? '';
		if (!isAuthenticated && !token.length)
			router.push('/auth/login');
	}, [isAuthenticated]);

	const colorMode = useColorModeValue('light', 'dark');
	const pageBgColor = (colorMode === 'light' ? 'clear_lake' : 'dark_forest');

	return (
		<>
			<DocumentHead title='Projetos' />
			<main>
				<Navbar pageName='Projetos' />

				<Flex
					w='100%'
					h='100%'
					position='fixed'
					backgroundColor={pageBgColor}
					justifyContent='space-between'
				>
					<>Projetos</>
				</Flex>
			</main>
		</>
	);
}