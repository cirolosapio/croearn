export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const [isLoading, toggleLoading] = useToggle()

export const handleLoading = async (cb: Function) => {
  toggleLoading(true)
  await cb()
  toggleLoading(false)
}
