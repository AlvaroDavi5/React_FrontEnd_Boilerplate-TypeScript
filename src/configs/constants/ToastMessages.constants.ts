
export default class ToastMessagesConstants {
	public readonly warningToast = {
		title: 'Oops!',
		description: 'Algo inesperado aconteceu, por favor, tente novamente dentro de alguns instantes!',
	};

	public readonly loginToasts = {
		success: {
			title: 'Login realizado com sucesso',
			description: 'Tudo certo! Aguarde enquanto carregamos seu espaço de trabalho...',
		},
		error: {
			title: 'Login ou senha incorretos',
			description: 'Por favor, verifique suas credenciais e tente novamente.',
		},
	};

	public readonly registerToasts = {
		success: {
			title: 'Usuário cadastrado com sucesso.',
			description: 'Volte à tela de login e insira suas credenciais para acessar.',
		},
		error: {
			title: 'Erro ao cadastrar usuário!',
			description: 'Por favor, verifique seus dados e tente novamente.',
		},
	};
}
