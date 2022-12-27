export default function setCookieAuth(token) {
  return (document.cookie = `token=${token}; max-age=${
    60 * 60 * 24 * 30 // 30 dias
  }; path=/; samesite=stric`);
}
