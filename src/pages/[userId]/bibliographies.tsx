import { useContext, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { AuthContext } from 'src/contexts/AuthContext';
import DocumentHead from '@components/document_head';
import Navbar from '@components/navbar';
import { getToken } from '@common/helpers/cookies.helper';


export default function Bibliographies(): ReactElement {
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
			<DocumentHead title='Bibliografias' />
			<main>
				<Navbar pageName='Consultas Bibliográficas' />

				<Flex
					w='100%'
					h='100%'
					position='fixed'
					backgroundColor={pageBgColor}
					justifyContent='space-between'
				>
					<>Bibliografias</>
				</Flex>
			</main>
		</>
	);
}
