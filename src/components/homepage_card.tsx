import { ReactElement } from 'react';
import { Box, Image, useColorModeValue } from '@chakra-ui/react';


interface CardPropos {
	children: string,
	pageHref: string,
	imgSource: string,
}

export default function HomePageCard(props: CardPropos): ReactElement {
	const colorMode = useColorModeValue('light', 'dark');
	const boxBgColor = (colorMode === 'light' ? 'marine' : 'primary');

	return (
		<Box
			h='410px'
			w='300px'
			marginTop='60px'
			marginLeft='50px'
			marginRight='50px'
			boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
			borderRadius='20px'
			backgroundColor={boxBgColor}
			fontSize='xx-large'
			textAlign='center'
			justifyContent='center'
		>
			<a
				href={props.pageHref}
			>
				<Image alt={`${props.children} image`}
					borderRadius='20px'
					width='94%'
					height='70%'
					marginTop='3%'
					marginLeft='3%'
					src={props.imgSource}
				/>
				<Box
					marginTop='15px'
				>
					{props.children}
				</Box>
			</a>
		</Box>
	);
}
