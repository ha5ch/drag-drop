// https://stackoverflow.com/a/35002237
const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;


export function string2file(data: string, filename: string, type: string) {
  if (!base64regex.test(data)) {
    data = window.btoa(data);
  }

  const byteCharacters = window.atob(data);
  const byteNumbers = new Array(byteCharacters.length);
  for(let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], filename, {type});

  return file;
}
