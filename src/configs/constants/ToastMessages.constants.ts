
export default class ToastMessagesConstants {
	public readonly loginToasts = {
		success: {
			status: 'success',
			title: 'Login realizado com sucesso',
			description: 'Tudo certo! Aguarde enquanto carregamos seu espaço de trabalho...',
		},
		error: {
			status: 'error',
			title: 'Login ou senha incorretos',
			description: 'Por favor, verifique suas credenciais e tente novamente.',
		},
		warning: {
			status: 'warning',
			title: 'Oops!',
			description: 'Algo inesperado aconteceu, por favor, tente novamente dentro de alguns instantes!',
		},
	};
}
