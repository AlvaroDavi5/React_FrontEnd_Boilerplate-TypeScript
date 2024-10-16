import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import DocumentHead from '@pages/components/document_head';
import { getToken } from '@common/cookies';
import Navbar from '@pages/components/navbar';
import HomePageCard from '@pages/components/homepage_card';
import style from './style/home.module.css';


export default function HomePage(): JSX.Element {
	const router = useRouter();
	const colorMode = useColorModeValue('light', 'dark');
	const pageBgColor = (colorMode === 'light' ? 'clear_lake' : 'dark_forest');
	const [userId, _setUserId] = useState('');

	useEffect(() => {
		if (!getToken())
			router.push('/auth/login');
	}, []);

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
