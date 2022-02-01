export const extractFileExtension = (filename: string) => {
  const fileExtension = (filename.match(/\.[^/.]+$/) || [])[0]
  const trimedFileName = filename.replace(/\.[^/.]+$/, '')
  return { trimedFileName, fileExtension }
}
