export function randomStr(longitud)
{
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	for(let i=0; i < longitud; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}