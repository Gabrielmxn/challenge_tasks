

export function buildRoutePath(path){
	const routeParametersRegex = /:([a-zA-Z]+)/g
	const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
	
	//A url tem que começar com pathWithParams
	const pathRegex = new RegExp(`^${pathWithParams}(?<query>//?(.*))?$`)
	
	

	return pathRegex
}