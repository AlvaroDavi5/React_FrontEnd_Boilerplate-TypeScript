import Document, { Html, Head, Main, NextScript } from 'next/document';


export default class RootDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
