/* eslint-disable import/no-extraneous-dependencies */
import { extendTheme } from '@chakra-ui/react';
import { mode, darken, whiten } from '@chakra-ui/theme-tools';
import { colors } from './colorScheme';
/* eslint-enable import/no-extraneous-dependencies */


const fonts = { mono: '\'Menlo\', monospace' };

const breakpoints = {
	sm: '40em',
	md: '52em',
	lg: '64em',
	xl: '80em',
};

const buttonStyles = {
	// style object for base or default style
	baseStyle: {},
	// styles for different sizes ("sm", "md", "lg")
	sizes: {},
	// styles for different visual variants ("outline", "solid")
	variants: {
		mw_button: (props: any) => ({
			bg: mode('primary', 'secondary')(props),
			color: mode('black', 'white')(props),
			_hover: {
				bg: mode(darken('primary', 15), whiten('secondary', 25))(props),
				boxShadow: 'md',
				transform: 'scale(1.05)'
			}
		})
	},
	// default values for `size` and `variant`
	defaultProps: {},
};

const theme = extendTheme(
	{
		useSystemColorMode: true,
		//initialColorMode: 'light',
		colors: colors,
		fonts,
		breakpoints: breakpoints,
		components: {
			Button: buttonStyles,
		},
		icons: {
			logo: {},
			add: {},
			remove: {},
			search: {},
		},
	}
);

export default theme;
