const colors = [
  "#ff4d4f",
  "#52c41a",
  "#1890ff",
  "#faad14",
  "#b37feb",
  "#13c2c2",
]

export const getCursorColor = (
  userId: string
) => {
  let hash = 0

  for (
    let i = 0;
    i < userId.length;
    i++
  ) {
    hash =
      userId.charCodeAt(i) +
      ((hash << 5) - hash)
  }

  return colors[
    Math.abs(hash) %
      colors.length
  ]
}