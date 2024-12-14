import Link from 'next/link';
import { useRef, ReactElement } from 'react';
import {
	useDisclosure,
	useColorMode, useColorModeValue,
	Center, Button, IconButton,
	Flex, Drawer,
	DrawerHeader, DrawerBody, DrawerFooter,
	DrawerOverlay, DrawerContent, DrawerCloseButton,
} from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
import { BiSun, BiMoon } from 'react-icons/bi';
import { DiGithubBadge } from 'react-icons/di';


function MenuDrawer(_props: unknown): ReactElement {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<any>();
	const colorMode = useColorModeValue('light', 'dark');
	const boxBgColor = (colorMode === 'light' ? 'marine' : 'primary');

	return (
		<>
			<IconButton
				aria-label='md-menu-icon-btn'
				ref={btnRef}
				variant='ghost'
				color='black'
				bg={boxBgColor}
				onClick={onOpen}
				height='10'
				width='10'
			>
				<MdMenu size='40' />
			</IconButton>

			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton
						size='30px'
						margin='5px'
					/>
					<DrawerHeader background={boxBgColor}>
						Menu
					</DrawerHeader>

					<DrawerBody boxSize='xs' background={boxBgColor}>
						<Link href='https://github.com/AlvaroDavi5' passHref>
							<Button
								size='lg'
								boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
								variant='mw_button'
							>
								Author
							</Button>
						</Link>
					</DrawerBody>

					<DrawerFooter background={boxBgColor} />
				</DrawerContent>
			</Drawer>
		</>
	);
}

interface NavbarProps {
	pageName: string,
}

export default function Navbar(props: NavbarProps): JSX.Element {
	const { colorMode, toggleColorMode } = useColorMode();
	const boxBgColor = (colorMode === 'light' ? 'marine' : 'primary');
	const textColor = (colorMode === 'light' ? 'white' : 'black');
	const iconColor = (colorMode === 'light' ? 'black' : 'white');

	return (
		<Flex
			bg={boxBgColor}
			width='100%'
			height={['80px', '100px']}
			p='5'
			color='black'
			boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
			boxSizing='border-box'
			padding='10px 15px'
			display='flex'
			justifyContent='space-between'
			alignItems='center'
		>
			<div
				className='logo'
			>
				<Link href='/' passHref
				>
					<IconButton
						aria-label='GitHub'
						size='xl'
						boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
						color={iconColor}
						variant='mw_button'
						bg={textColor}
						padding='5px'
						marginRight='5px'
						display='list-item'
					>
						<DiGithubBadge size='60' />
					</IconButton>
				</Link>
			</div>

			<Center
				color='black'
				display='inline-block'
				justifySelf='center'
				textAlign='center'
				margin='5px'
				fontSize={['xl', 'xx-large']}
				fontWeight={['bold', 'normal']}
			>
				{props.pageName}
			</Center>

			<Flex
				className='menu-button'
			>
				<IconButton
					aria-label='Toggle color mode'
					icon={colorMode === 'light' ? <BiMoon size='40' /> : <BiSun size='40' />}
					variant='ghost'
					backgroundColor={boxBgColor}
					color='black'
					marginLeft='10px'
					marginRight={['10px', '50px']}
					onClick={toggleColorMode}
				/>
				<MenuDrawer />
			</Flex>
		</Flex>
	);
}
