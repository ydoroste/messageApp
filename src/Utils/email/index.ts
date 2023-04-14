



export const emailNameParcer = (email: string): string => {
    const parceStartIndex = email.indexOf("@");
    return email.slice(0, parceStartIndex);
  };
  