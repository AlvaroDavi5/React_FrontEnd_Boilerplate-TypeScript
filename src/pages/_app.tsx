import 'regenerator-runtime/runtime'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '@configs/layout/themes'
import './styles/globals.css'


export default function AppRoot({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeScript />
			<ColorModeProvider options={{}}>
				{/* TODO - add AuthProvider */}
				{/* <AuthProvider> */}
				<Component {...pageProps} />
				{/* </AuthProvider> */}
			</ColorModeProvider>
		</ChakraProvider>
	)
}
