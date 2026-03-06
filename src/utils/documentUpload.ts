import * as DocumentPicker from 'expo-document-picker';

const ALLOWED_MIME = new Set(['application/pdf', 'image/jpeg']);
const MAX_BYTES = 10 * 1024 * 1024;

function isAllowed(mime?: string) {
  return !!mime && ALLOWED_MIME.has(mime);
}

export type UploadFile = {
  uri: string;
  name: string;
  mimeType: string;
  size?: number;
};

/**
 * This function allows picking a single PDF or JPEG file,
 * validates its type and size,
 * and returns an object with the file's details.
 * If the user cancels the picker or if the file is invalid,
 * it returns null or throws an error respectively.
 */
export async function pickPdfOrJpeg(): Promise<UploadFile | null> {
  const res = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/jpeg'],
    multiple: false,
    copyToCacheDirectory: true,
  });

  if (res.canceled) return null;

  const asset = res.assets?.[0];
  if (!asset?.uri) return null;

  const mimeType = asset.mimeType ?? 'application/octet-stream';

  if (!isAllowed(mimeType)) {
    throw new Error('Only PDF or JPEG is allowed');
  }

  const size = asset.size;
  if (typeof size === 'number' && size > MAX_BYTES) {
    throw new Error('File is too large');
  }

  return {
    uri: asset.uri,
    name: asset.name ?? 'document',
    mimeType,
    size,
  };
}
