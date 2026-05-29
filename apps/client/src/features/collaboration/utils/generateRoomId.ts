const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

export function generateRoomId() {

  let result = "";

  for (let i = 0; i < 6; i++) {

    result +=
      chars[
        Math.floor(
          Math.random() *
            chars.length
        )
      ];
  }

  return result;
}