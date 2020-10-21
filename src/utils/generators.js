export const makeCustomId = (length) => {
    let result = '';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      if (i === 0) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
      } else {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    return result;
}