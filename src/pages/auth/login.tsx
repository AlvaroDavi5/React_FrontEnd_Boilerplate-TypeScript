import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	useColorModeValue,
	Box, Flex, Button,
	Input, InputGroup, InputRightElement,
	FormLabel, FormControl, FormHelperText
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DocumentHead from '@pages/components/document_head';
import MinNavbar from '@pages/components/min_navbar';
import { AuthContext, SignInProps } from '@pages/auth/AuthContext';


export default function Login() {
	const router = useRouter();
	const { SignIn, isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		if (isAuthenticated)
			router.push('/home');
	}, []);

	const colorMode = useColorModeValue('light', 'dark');
	const pageBgColor = (colorMode === 'light' ? 'clear_lake' : 'dark_forest');
	const boxBgColor = (colorMode === 'light' ? 'marine' : 'primary');
	const { register, handleSubmit } = useForm<SignInProps, undefined, SignInProps>();
	const [loadingSubmitButton, setLoadingSubmitButton] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const handleShowPass = () => { setShowPass(!showPass); };

	async function handleSignIn(data: SignInProps): Promise<void> {
		setLoadingSubmitButton(true);

		const logged = await SignIn(data);
		setLoadingSubmitButton(logged);
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
												type='email' {...register('email')}
												placeholder='Ex: nome.sobrenome@gmail.com'
												maxHeight={['70px', '90px']} maxWidth={['90%', '40vw']} background='green.100'
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
												type={showPass ? 'text' : 'password'} {...register('password')}
												placeholder='Jamais compartilhe sua senha!'
												maxHeight={['70px', '90px']} maxWidth={['90%', '40vw']} background='green.100'
											/>
											<InputRightElement width='72px' display={['none', 'flex']}>
												<Button onClick={handleShowPass} h='28px' size='sm' background='green.100'>
													{showPass ? <FaEyeSlash size='20' /> : <FaEye size='20' />}
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
