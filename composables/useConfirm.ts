export const useConfirm = () => {
  const dialog = useState('confirmDialog', () => ({ show: false, title: '', message: '', onConfirm: null }))

  const confirm = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      dialog.value = {
        show: true,
        title,
        message,
        onConfirm: () => {
          dialog.value.show = false
          resolve(true)
        },
        onCancel: () => {
          dialog.value.show = false
          resolve(false)
        }
      }
    })
  }

  return { dialog, confirm }
}
