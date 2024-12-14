import { useContext, useEffect, useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import DocumentHead from '@components/document_head';
import Navbar from '@components/navbar';
import HomePageCard from '@components/homepage_card';
import { AuthContext } from 'src/contexts/AuthContext';
import { getToken } from '@common/helpers/cookies.helper';
import { decode } from '@common/helpers/token.helper';
import style from './style/home.module.css';


export default function HomePage(): ReactElement {
	const { isAuthenticated, authUser, setAuthUser } = useContext(AuthContext);
	const router = useRouter();
	const [userId, setUserId] = useState('');

	useEffect(() => {
		const token = getToken() ?? '';
		if (!isAuthenticated && !token.length) router.push('/');

		const content = decode(token);
		if (!authUser) setAuthUser(content);

		if (authUser?.userId?.length) {
			setUserId(authUser.userId);
		}
	}, [authUser]);

	const colorMode = useColorModeValue('light', 'dark');
	const pageBgColor = (colorMode === 'light' ? 'clear_lake' : 'dark_forest');

	return (
		<>
			<DocumentHead title='Início' />
			<main className={style.pagebody}>
				<Navbar pageName='Área de Trabalho' />

				<Flex
					w='100%'
					h='100%'
					position='fixed'
					backgroundColor={pageBgColor}
					justifyContent='space-between'
				>
					<HomePageCard pageHref={`${userId}/projects`} imgSource='../assets/projects.png'>
						Projetos
					</HomePageCard>
					<HomePageCard pageHref={`${userId}/tasks`} imgSource='../assets/tasks.png'>
						Tarefas
					</HomePageCard>
					<HomePageCard pageHref={`${userId}/bibliographies`} imgSource='../assets/bibliographies.png'>
						Consultas Bibliográficas
					</HomePageCard>
				</Flex>
			</main>
		</>
	);
}
