import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	useColorModeValue,
	Box, Flex, Button,
	Input, InputGroup, InputRightElement,
	FormLabel, FormControl, FormHelperText,
	useToast
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DocumentHead from '@pages/components/document_head';
import MinNavbar from '@pages/components/min_navbar';
import { AuthContext, SignInProps } from '@pages/auth/AuthContext';
import ToastMessagesConstants from '@configs/constants/ToastMessages.constants';
import axios from 'axios';
import { getToken, saveToken } from '@common/cookies';
import { decodeJwt } from '@common/token';


export default function Login() {
	const { isAuthenticated, setAuthUser, setIsAuthenticated } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated)
			router.push('/home');
	}, []);

	const colorMode = useColorModeValue('light', 'dark');
	const pageBgColor = (colorMode === 'light' ? 'clear_lake' : 'dark_forest');
	const boxBgColor = (colorMode === 'light' ? 'marine' : 'primary');
	const toast = useToast();
	const { register, handleSubmit } = useForm<SignInProps, undefined, SignInProps>();
	const [loadingSubmitButton, setLoadingSubmitButton] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const handleShowPass = () => { setShowPass(!showPass); };

	// REVIEW - use react query
	async function SignIn({ email = '', password = '' }: SignInProps): Promise<boolean> {
		const axiosClient = axios.create({ baseURL: `${process.env.MOCKED_SERVICE_URL}` });

		const validateToken = async (token: string) => {
			const { content, expired, invalidSignature } = await decodeJwt(token);

			if (!invalidSignature && !expired) {
				setIsAuthenticated(true);
				setAuthUser(content as any);
			}
		};

		try {
			const existentToken = getToken();

			if (!!existentToken?.length) {
				await validateToken(existentToken);
			} else {
				const { data: loggedUser } = await axiosClient.put(`http://localhost:4000/api/users/`, {
					email,
					password,
				});

				saveToken(loggedUser.token);
				await validateToken(getToken());
			}
		} catch (error) {
			console.error(error);
			setIsAuthenticated(false);
		}

		return isAuthenticated;
	}
	async function handleSignIn(data: SignInProps): Promise<void> {
		const { loginToasts: { success: successToast, error: errorToast } } = new ToastMessagesConstants();

		setLoadingSubmitButton(true);
		const signed = await SignIn(data);

		if (signed) {
			toast({
				status: successToast.status as any,
				title: successToast.title,
				description: successToast.description,
				duration: 1500,
				isClosable: true,
			});

			router.push('/home');
		} else {
			toast({
				status: errorToast.status as any,
				title: errorToast.title,
				description: errorToast.description,
				duration: 1500,
				isClosable: true,
			});

			setLoadingSubmitButton(false);
		}
	}

	return (
		<>
			<DocumentHead title='Entre para acessar seu espaço de trabalho' />
			<main>
				<MinNavbar pageName='Acessar o MyWorkspace' />

				<Flex
					width='100%'
					height='100%'
					position='fixed'
					backgroundColor={pageBgColor}
					justifyContent='center'
				>
					<Box
						height='65vh'
						width={['90vw', '50vw']}
						marginTop={['20px', '60px']}
						boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
						borderRadius='20px'
						backgroundColor={boxBgColor}
						fontSize={['x-large', 'xx-large']}
						textAlign='center'
						justifyContent='center'
					>
						<Box margin='10px'>
							<h2>Entrar</h2>
						</Box>
						<Box id='login-form'
							marginTop={['5px', '20px']}
							marginBottom={['5px', '20px']}
							marginLeft={['2px', '50px']}
							marginRight={['2px', '50px']}
						>
							<form onSubmit={handleSubmit(handleSignIn)}>
								<FormControl isRequired>
									<Box id='login-email' margin='10px 10% 0px 15%'>
										<FormLabel htmlFor='email' marginLeft='15px'>e-Mail:</FormLabel>
										<InputGroup>
											<Input
												type='email' {...register('email')} isRequired={true}
												placeholder='Ex: nome.sobrenome@gmail.com' _placeholder={{ color: 'gray.500' }}
												color='black' maxHeight={['70px', '90px']} maxWidth={['90%', '40vw']} background='green.100'
											/>
										</InputGroup>
										<Link href='/auth/register' passHref>
											<FormHelperText fontWeight='bold'>
												<>
													<Box display={['none', 'contents']}>
														Não possui uma conta? Cadastre-se aqui!
													</Box>
													<Box display={['contents', 'none']}>
														Cadastrar-se →
													</Box>
												</>
											</FormHelperText>
										</Link>
									</Box>
									<Box id='login-pass' margin='10px 10% 0px 15%'>
										<FormLabel htmlFor='password' marginLeft='15px'>Senha:</FormLabel>
										<InputGroup>
											<Input
												type={showPass ? 'text' : 'password'} {...register('password')} isRequired={true}
												placeholder='Jamais compartilhe sua senha!' _placeholder={{ color: 'gray.500' }}
												color='black' maxHeight={['70px', '90px']} maxWidth={['90%', '40vw']} background='green.100'
											/>
											<InputRightElement width='72px' display={['none', 'flex']}>
												<Button onClick={handleShowPass} h='28px' size='sm' background='green.100'>
													{showPass ? <FaEyeSlash size='20' color='black' /> : <FaEye size='20' color='black' />}
												</Button>
											</InputRightElement>
										</InputGroup>
										<Link href='/auth/recovery' passHref>
											<FormHelperText fontWeight='bold'>
												<>
													<Box display={['none', 'contents']}>
														Esqueceu sua senha? Recupere seu acesso aqui!
													</Box>
													<Box display={['contents', 'none']}>
														Recuperar senha →
													</Box>
												</>
											</FormHelperText>
										</Link>
									</Box>
									<Button
										id='login-submit-button'
										margin='30px'
										size='lg'
										boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
										variant='mw_button'
										isLoading={loadingSubmitButton}
										type='submit'
									>
										Entrar
									</Button>
								</FormControl>
							</form>
						</Box>
					</Box>
				</Flex>
			</main>
		</>
	);
}
