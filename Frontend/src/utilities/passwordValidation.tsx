export const isValidPassword = (password: string) => {
    // Debe contener al menos un carácter especial, una mayúscula y más de 8 caracteres
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return regex.test(password)
}