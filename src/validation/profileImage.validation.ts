export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const ACCEPTED_FILES_TYPES = ["image/png", "image/jpeg"];

export function isAcceptedFileSize(filesize: number) {
  return filesize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileTypes(fileTypes: string) {
  return ACCEPTED_FILES_TYPES.includes(fileTypes);
}
