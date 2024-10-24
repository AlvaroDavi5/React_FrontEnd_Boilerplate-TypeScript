// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';


export interface RequestInterface extends Request {
	cookies: {
		[key: string]: unknown,
		['boilerplate-token']?: string,
	},
}
type ResponseInterface = Response

export interface EndpointInterface {
	req: RequestInterface,
	res: ResponseInterface,
}

export interface PagePropsInterface<PI = unknown> {
	redirect?: {
		destination: string,
		permanent: boolean,
	},
	props?: PI,
	context?: unknown,
}
