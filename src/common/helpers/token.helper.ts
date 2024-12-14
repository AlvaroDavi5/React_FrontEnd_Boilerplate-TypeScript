import { SignJWT, jwtVerify, JWTPayload, decodeJwt } from 'jose';


const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET ?? '');

export async function encodeJwtAsync<PT extends object = any>(payload: PT, expiration = '7d'): Promise<string> {
	const jwt = await new SignJWT(payload as JWTPayload)
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime(expiration)
		.sign(secret);

	return jwt;
}

export async function decodeJwtAsync(token: string): Promise<{ content: JWTPayload | string | null, invalidSignature: boolean, expired: boolean }> {
	try {
		const { payload } = await jwtVerify(token, secret, {
			algorithms: ['HS256']
		});

		return {
			content: payload,
			invalidSignature: false,
			expired: false,
		};
	} catch (err) {
		const error = err as any;
		let expired = false;
		let invalidSignature = false;

		if (error.code === 'ERR_JWT_EXPIRED')
			expired = true;
		if (error.code === 'ERR_JWT_INVALID') {
			invalidSignature = error.message.includes('signature');
		}

		return {
			content: null,
			invalidSignature,
			expired,
		};
	}
}

export async function validateTokenAsync(token: string): Promise<{ valid: boolean, content: any }> {
	const { content, expired, invalidSignature } = await decodeJwtAsync(token);

	return {
		content,
		valid: !invalidSignature && !expired,
	};
}

export function decode(token: string): any {
	return decodeJwt(token);
}
