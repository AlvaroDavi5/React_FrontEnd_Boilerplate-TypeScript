import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	useColorModeValue, useToast,
	Box, Flex, Button, Select,
	Input, InputGroup, InputRightElement,
	FormLabel, FormControl, FormHelperText
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { EndpointInterface, PagePropsInterface } from '@shared/internal/interfaces/nextRoutesInterface';
import ToastMessagesConstants from '@configs/constants/ToastMessages.constants';
import DocumentHead from '../components/document_head';
import MinNavbar from '../components/min_navbar';
import { getAllBrazilStates } from '@common/getBrazilStates';


export interface SignUpProps {
	username: string,
	email: string,
	password: string,
	state: string,
	phone: string,
	cpf: string,
}

export interface RegisterProps {
	stateList: {
		id: number,
		code: string,
		name: string,
	}[],
}

export default function Register(props: RegisterProps): ReactElement {
	const toast = useToast();
	const [showPass, setShowPass] = useState(false);
	const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpProps, undefined, SignUpProps>();
	const [loadingSubmitButton, setLoadingSubmitButton] = useState(false);

	useEffect(() => {
		setLoadingSubmitButton(isSubmitting);
	}, [isSubmitting]);

	const colorMode = useColorModeValue('light', 'dark');
	const pageBgColor = (colorMode === 'light' ? 'clear_lake' : 'dark_forest');
	const boxBgColor = (colorMode === 'light' ? 'marine' : 'primary');

	const handleToasts = (success: boolean): void => {
		const { registerToasts: { success: successToast, error: errorToast } } = new ToastMessagesConstants();

		if (success) {
			toast({
				status: 'success',
				title: successToast.title,
				description: successToast.description,
				duration: 1500,
				isClosable: true,
			});
		} else {
			toast({
				status: 'error',
				title: errorToast.title,
				description: errorToast.description,
				duration: 1500,
				isClosable: true,
			});
		}
	};
	const handleShowPass = (): void => { setShowPass(!showPass); };

	const signUp = async (data: SignUpProps): Promise<boolean> => {
		try {
			const axiosClient = axios.create({ baseURL: `${process.env.MOCKED_SERVICE_URL}` });

			const { data: registeredUser } = await axiosClient.post('/api/users/', {
				name: data.username,
				email: data.email,
				password: data.password,
				phone: data.phone,
				cpf: data.cpf,
				uf: data.state,
			});

			return registeredUser?.id?.length > 0;
		} catch (error) {
			console.error(error);
			return false;
		}
	};
	const handleSignUp = async (data: SignUpProps): Promise<void> => {
		const registered = await signUp(data);
		handleToasts(registered);
	}

	function stateOptionsRender({ stateList }: RegisterProps) {
		return stateList.map(
			(state) => {
				return (
					<option key={state.id} value={state.code}>
						{state.name}
					</option>
				);
			}
		);
	}

	return (
		<>
			<DocumentHead title='Registre-se para usar a plataforma' />
			<main>
				<MinNavbar pageName='Registrar no MyWorkspace' />

				<Flex
					w='100%'
					h='100%'
					position='fixed'
					backgroundColor={pageBgColor}
					justifyContent='center'
				>
					<Flex
						h='70vh'
						w='65vw'
						margin='50px'
						boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
						borderRadius='20px'
						backgroundColor={boxBgColor}
						fontSize='xx-large'
						textAlign='center'
					>
						<Box id='register-form' margin='20px 50px 20px 50px'>
							<form onSubmit={handleSubmit(handleSignUp)}>
								<FormControl isRequired={true} display='flex'>
									<Box>
										<Box id='register-username' margin='10px 40px'>
											<FormLabel htmlFor='username' marginLeft='10px'>Nome de Usuário:</FormLabel>
											<Input
												type='text' {...register('username')}
												placeholder='Ex: meuApelido123@'
												maxWidth='27vw' background='green.100'
											/>
											<FormHelperText fontWeight='bold' maxWidth='27vw'>
												Use letras maiúsculas, minúsculas, números e símbolos
											</FormHelperText>
										</Box>
										<Box id='register-email' margin='10px 40px'>
											<FormLabel htmlFor='email' marginLeft='10px'>e-Mail:</FormLabel>
											<Input
												type='email' {...register('email')}
												placeholder='Ex: nome.sobrenome@gmail.com'
												maxWidth='27vw' background='green.100'
											/>
										</Box>
										<Box id='register-pass' margin='10px 40px'>
											<FormLabel htmlFor='password' marginLeft='10px'>Senha:</FormLabel>
											<InputGroup>
												<Input
													type={showPass ? 'text' : 'password'} {...register('password')}
													placeholder='Jamais compartilhe sua senha!'
													maxLength={18} maxWidth='27vw' background='green.100'
												/>
												<InputRightElement width='72px'>
													<Button onClick={handleShowPass} h='28px' size='sm' background='green.100'>
														{showPass ? <FaEyeSlash size='20' /> : <FaEye size='20' />}
													</Button>
												</InputRightElement>
											</InputGroup>
										</Box>
									</Box>
									<Box>
										<Box id='register-image' justifyContent='center' margin='10px 40px'>
											<Box margin='40px 10px 10px 80px'>
												<Link href='' passHref>
													<FaUserCircle size='90px' />
												</Link>
											</Box>
											<Box fontWeight='bold' fontSize='12pt' marginBottom='50px'>
												Escolher imagem de perfil
											</Box>
										</Box>
										<Box id='register-uf' margin='10px 40px'>
											<FormLabel htmlFor='uf-estado' marginLeft='10px'>Estado:</FormLabel>
											<Select
												placeholder='Selecione um Estado' {...register('state')}
												minWidth='230px' background='green.100'
											>
												{stateOptionsRender(props)}
											</Select>
										</Box>
									</Box>
								</FormControl>
								<Box id='submit buttons'>
									<Box justifyContent='space-between' marginTop='20px'>
										<Button
											size='lg'
											boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
											variant='ghost'
											backgroundColor='green'
											marginRight='30%'
											isLoading={loadingSubmitButton}
											type='submit'
										>
											Salvar
										</Button>
										<Link href='/' passHref>
											<Button
												size='lg'
												boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
												variant='ghost'
												backgroundColor='red'
												marginLeft='30%'
											>
												Cancelar
											</Button>
										</Link>
									</Box>
								</Box>
							</form>
						</Box>
					</Flex>
				</Flex>
			</main>
		</>
	);
}

export async function getStaticProps(_context: EndpointInterface): Promise<PagePropsInterface<RegisterProps>> {
	const allBrazilStates = await getAllBrazilStates();

	const statesList = allBrazilStates.map((state) => ({
		id: state.id,
		code: state.sigla,
		name: state.nome,
	}));

	const orderedStatelist = statesList.sort((a, b) => {
		return a.id - b.id;
	});

	return {
		props: {
			stateList: orderedStatelist,
		}
	};
}
