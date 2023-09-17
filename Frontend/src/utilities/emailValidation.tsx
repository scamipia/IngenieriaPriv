export const isValidEmail = (email: string) => {
    /* puede contener letras, números, puntos, guiones bajos y guiones medios.
    debe haber un símbolo "@" en medio.
    El dominio puede contener letras, números y guiones, y debe estar separado del nombre de usuario por un punto.
    Después del dominio, debe haber un sufijo de dominio de 2 a 4 letras.*/
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email)
}