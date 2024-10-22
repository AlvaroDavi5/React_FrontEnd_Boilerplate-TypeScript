import { Router, Request, Response } from 'express';
import { encodeJwt } from '@common/token';


export default {
	login: async (req: Request, res: Response) => {
		const { authorization } = req.headers;
		console.log(`#Path: ${req.path}`);
		console.log('#Has Token: ', !!authorization);

		const user = {
			userId: 'b562b8b5-65cd-41c6-be15-087014f326a4',
		};

		try {
			const data = {
				token: await encodeJwt(user, '1d'),
				...user,
			};

			return res.status(200).send(data);
		} catch (error) {
			return res.status(5000).send(error);
		}
	},

	router() {
		const router = Router();

		router.put('/users/', this.login);

		return router;
	},
};
