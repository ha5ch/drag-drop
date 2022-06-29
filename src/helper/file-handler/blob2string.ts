type ConvertType = 'ArrayBuffer' | 'BinaryString' | 'DataURL' | 'Text';

class ReaderError extends Error {
  constructor(message: string, public readonly blob: Blob) { super(message); }
}

export async function blob2string(data: Blob, type: ConvertType = 'DataURL', encoding?: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    switch (type) {
      case 'BinaryString':
        reader.readAsBinaryString(data);
        break;
      case 'Text':
        reader.readAsText(data, encoding);
        break;
      case 'ArrayBuffer':
        reader.readAsArrayBuffer(data);
        break;
      case 'DataURL':
      default:
        reader.readAsDataURL(data);
        break;
    }

    reader.onload = () => {
      const result = reader.result;
      if (result) { return resolve(result.toString()); }
      reject(new ReaderError('nothing read', data));
    };

    reader.onerror = (error) => { reject(error); };
  });
}
