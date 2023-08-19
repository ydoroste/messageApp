export const isValidEmail = (email: string) => {
  const emailRegexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegexp.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string)=>{
  const phoneRegexExp = new RegExp(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{4}[-\s.]?[0-9]{4,6}$/);
  return phoneRegexExp.test(phoneNumber)
}