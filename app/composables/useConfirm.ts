interface ConfirmDialog {
  show: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
}

export const useConfirm = () => {
  const dialog = useState<ConfirmDialog>('confirmDialog', () => ({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  }))

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
