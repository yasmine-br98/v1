export const formatBytes = (bytes: number) => {
  const kb = bytes / 1024
  if (kb < 1024) {
    return kb.toFixed(2) + ' KB'
  } else {
    return (kb / 1024).toFixed(2) + ' MB'
  }
}
