import { ReactElement, useState } from 'react';


export default function ServiceTherms(props: { author?: string }): ReactElement {
	const [authorName, setAuthorName] = useState(props.author);

	const onClick = () => {
		setAuthorName('Alvaro Davi');
	};

	return (
		<>
			<header>
				<h1>Termos de Serviço</h1>
			</header>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</p>
			<footer
				onClick={onClick}
			>
				by {authorName}
			</footer>
		</>
	);
}
