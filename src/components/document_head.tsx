import { ReactElement } from 'react';
import Head from 'next/head';


interface HeadProps {
	title?: string,
}

export default function DocumentHead(props: HeadProps): ReactElement {
	return (
		<Head>
			<title>{`${props.title} - Boilerplate`}</title>
			<meta name='application-name' content='Boilerplate' />
			<meta name='description' content='Webapp para organização de projetos, tarefas e consulta a acervos e catálogos.' />
			<link rel='icon' href='/favicon.ico' />
			<meta name='theme-color' content='#000000' />
			<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
			<link rel='manifest' href='manifest.json' />
			<link rel='manifest' href='manifest.webmanifest' />

			<meta name='apple-mobile-web-app-capable' content='yes' />
			<meta name='apple-mobile-web-app-status-bar-style' content='default' />
			<meta name='apple-mobile-web-app-title' content='PWA App' />
			<meta name='format-detection' content='telephone=no' />
			<meta name='mobile-web-app-capable' content='yes' />
			<meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
			<meta name='msapplication-TileColor' content='#2B5797' />
			<meta name='msapplication-tap-highlight' content='no' />

			<link rel='apple-touch-icon' href='/static/icons/touch-icon-iphone.png' />
			<link rel='apple-touch-icon' sizes='152x152' href='/static/icons/touch-icon-ipad.png' />
			<link rel='apple-touch-icon' sizes='180x180' href='/static/icons/touch-icon-iphone-retina.png' />
			<link rel='apple-touch-icon' sizes='167x167' href='/static/icons/touch-icon-ipad-retina.png' />

			<link rel='apple-touch-startup-image' href='/static/images/apple_splash_2048.png' sizes='2048x2732' />
			<link rel='apple-touch-startup-image' href='/static/images/apple_splash_1668.png' sizes='1668x2224' />
			<link rel='apple-touch-startup-image' href='/static/images/apple_splash_1536.png' sizes='1536x2048' />
			<link rel='apple-touch-startup-image' href='/static/images/apple_splash_1125.png' sizes='1125x2436' />
			<link rel='apple-touch-startup-image' href='/static/images/apple_splash_1242.png' sizes='1242x2208' />
			<link rel='apple-touch-startup-image' href='/static/images/apple_splash_750.png' sizes='750x1334' />
			<link rel='apple-touch-startup-image' href='/static/images/apple_splash_640.png' sizes='640x1136' />

			<link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />
			<link rel='manifest' href='/static/manifest.json' />
			<link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />
			<link rel='shortcut icon' href='/favicon.ico' />

			<meta property='og:type' content='website' />
			<meta property='og:title' content='PWA App' />
			<meta property='og:description' content='Best PWA App in the world' />
			<meta property='og:site_name' content='PWA App' />
			<meta property='og:url' content='https://yourdomain.com' />
			<meta property='og:image' content='https://yourdomain.com/static/icons/apple-touch-icon.png' />
			<meta httpEquiv='X-UA-Compatible' content='ie=edge,chrome-1' />
		</Head>
	);
}
