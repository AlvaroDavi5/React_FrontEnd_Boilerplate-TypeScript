import { useContext, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Flex, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { IoCreateOutline } from 'react-icons/io5';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { getToken } from '@common/cookies';
import { AuthContext } from '@pages/auth/AuthContext';
import DocumentHead from '@pages/components/document_head';
import Navbar from '@pages/components/navbar';


function TaskEditorModal(props: any): ReactElement {
	const colorMode = useColorModeValue('light', 'dark');
	const textColor = (colorMode === 'light' ? 'light-text' : 'dark-text');

	return (
		<Modal
			isOpen={props.isOpen} onClose={props.onClose}
			size='xl' scrollBehavior='outside'
			blockScrollOnMount={true} closeOnOverlayClick={false}
		>
			<ModalOverlay />
			<ModalContent bgColor={props.bgColor}>
				<ModalHeader>
					Criar/Editar Tarefa
				</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Input type='text' color={textColor} maxLength={95} placeholder='Nome da tarefa' _placeholder={{ color: 'gray.500' }} maxWidth='95%' marginTop='20px' marginLeft='10px' marginRight='10px' background='green.100' /><br />
					<Input type='date' color={textColor} maxWidth='14vw' marginTop='20px' marginLeft='10%' background='green.100' />
					<Input type='time' color={textColor} maxWidth='9vw' marginTop='20px' marginLeft='10%' background='green.100' />
					<Textarea color={textColor} maxLength={350} placeholder='Descrição da tarefa' _placeholder={{ color: 'gray.500' }} marginTop='20px' background='green.100' />
				</ModalBody>

				<ModalFooter>
					<Box>
						<Button
							boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
							variant='ghost'
							backgroundColor='green'
							marginRight='150'
							marginLeft='15'
						>
							Salvar
						</Button>
						<Button
							boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
							variant='ghost'
							backgroundColor='red'
							marginLeft='150'
							marginRight='5'
							onClick={props.onClose}
						>
							Cancelar
						</Button>
					</Box>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

function ListItem(props: any): ReactElement {
	const colorMode = useColorModeValue('light', 'dark');
	const boxBgColor = (colorMode === 'light' ? 'marine' : 'primary');

	const nameContinue = (((props.name).toString()).length > 55) ? '...' : '';
	const descContinue = (((props.desc).toString()).length > 110) ? '...' : '';
	const deadlineDate = new Date(props.date);
	const currentDate = new Date();

	const dateDiffInDays = (deadlineDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
	let datePriorityColor = 'blue';
	if (dateDiffInDays < 3)
		datePriorityColor = 'red';
	else if (dateDiffInDays < 7)
		datePriorityColor = 'orange';
	else if (dateDiffInDays > 0)
		datePriorityColor = 'green';
	else
		datePriorityColor = 'gray';

	function dateFormatter(date: number): string {
		const strDate = date.toString();

		return strDate.length === 1
			? `0${strDate}`
			: strDate;
	}

	return (
		<>
			<TaskEditorModal
				isOpen={props.isOpenEdit} onOpen={props.onOpenEdit} onClose={props.onCloseEdit}
				bgColor={boxBgColor}
			/>

			<Flex
				width='90vw'
				height='75px'
				boxShadow='1px 1px 10px 4px rgba(0, 0, 0, 0.3)'
				margin='20px'
				borderRadius='10px'
				bgColor={boxBgColor}
				flexDirection='row'
				justifyContent='space-between'
			>
				<Box
					backgroundColor={datePriorityColor}
					borderRadius='10px'
					height='20pt'
					width='110px'
					marginTop='25px'
					marginLeft='15px'
					justifyContent='center'
					alignContent='center'
					textAlign='center'
				>
					{
						`${dateFormatter(deadlineDate.getDate() + 1)}/
						${dateFormatter(deadlineDate.getMonth() + 1)}/
						${deadlineDate.getFullYear()}`
					}
				</Box>
				<Flex
					justifyContent='center'
					textAlign='center'
					flexDirection='column'
				>
					<Box
						margin='5px'
						fontWeight='bold'
						fontSize='14pt'
					>
						{((props.name.slice(0, 55)).toString()).concat(nameContinue)}
					</Box>
					<Box
						margin='6px'
					>
						{((props.desc.slice(0, 110)).toString()).concat(descContinue)}
					</Box>
				</Flex>
				<Flex
					position='relative'
				>
					<Button
						variant='ghost'
						color='black'
						marginTop='20px'
					>
						<FaEdit onClick={props.onOpenEdit} />
					</Button>
					<Button
						variant='ghost'
						color='black'
						marginTop='20px'
						marginRight='10px'
					>
						<FaTrashAlt />
					</Button>
				</Flex>
			</Flex>
		</>
	);
}

export default function Tasks(props: any): ReactElement {
	const { isAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		const token = getToken() ?? '';
		if (!isAuthenticated && !token.length)
			router.push('/auth/login');
	}, [isAuthenticated]);

	const colorMode = useColorModeValue('light', 'dark');
	const pageBgColor = (colorMode === 'light' ? 'clear_lake' : 'dark_forest');
	const boxBgColor = (colorMode === 'light' ? 'marine' : 'primary');
	const textColor = (colorMode === 'light' ? 'light-text' : 'dark-text');
	const { isOpen, onOpen, onClose } = useDisclosure();

	function tasksRender({ taskList, userId }: any): ReactElement[] {
		return taskList?.map((task: any) => {
			return (<ListItem
				key={(task).id} userToken={userId} date={`${(task).deadlineDate}`}
				name={`${(task).name}`} desc={`${(task).description}`}
				isOpenEdit={isOpen} onOpenEdit={onOpen} onCloseEdit={onClose}
			/>);
		});
	}

	return (
		<>
			<DocumentHead title='Tarefas' />
			<main>
				<Navbar pageName='Tarefas' />
				<TaskEditorModal
					isOpen={isOpen} onOpen={onOpen} onClose={onClose}
					bgColor={boxBgColor}
				/>

				<Box
					w='100%'
					h='100%'
					position='fixed'
					backgroundColor={pageBgColor}
					justifyContent='space-between'
				>
					<Box
						width='100%'
					>
						<IconButton
							aria-label='add new task'
							variant='ghost'
							bgColor={boxBgColor}
							color={textColor}
							margin='10px'
							boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
							onClick={onOpen}
						>
							<IoCreateOutline size='40px' />
						</IconButton>
					</Box>
					<Box
						flex={1} overflow='scroll'
						justifyContent='center'
						marginLeft='40px'
						marginRight='40px'
					>
						{tasksRender(props)}
						<Box
							backgroundColor={pageBgColor}
							width='90vw' height='120px'
							marginTop='40px' marginBottom='40px'
							marginLeft='20px' marginRight='20px'
						/>
					</Box>
				</Box>
			</main>
		</>
	);
}
