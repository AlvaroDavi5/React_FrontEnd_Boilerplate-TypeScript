import { readFileSync } from 'fs';


function readJSONFile(filePath: string): any {
	const content = readFileSync(filePath, { encoding: 'utf8' });
	return JSON.parse(content);
}

export async function getAllBrazilStates(): Promise<any[]> {
	try {
		return readJSONFile('src/common/templates/brazilStates.json');
	}
	catch (error: unknown) {
		return [];
	}
}
