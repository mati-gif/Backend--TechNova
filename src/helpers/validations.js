export const validateString = (str, minLength, maxLength) => {
    if (minLength && str.length < minLength)
        return false;
    else if (maxLength && str.length > maxLength)
        return false;

    return true;
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validatePassword = (password, minLength, maxLength, needsUppercase, needsNumber) => {
    if (minLength && password.length < minLength)
        return false;

    else if (maxLength && password.length > maxLength)
        return false;

    else if (needsUppercase && !/[A-Z]/.test(password))
        return false;

    else if (needsNumber && !/\d/.test(password))
        return false;

    return true;
}

// Validations
export const validateLoginUser = (req) => {
    const result = {
        error: false,
        message: ''
    }
    const { email, password } = req;

    if (!email || !validateEmail(email)) {
        return {
            error: true,
            message: 'Mail inválido'
        }
    }
    else if (!password || !validatePassword(password, 7, null, true, true)) {
        return {
            error: true,
            message: 'Contraseña inválida'
        }
    }

    return result;
}

export const validateRegisterUser = (req) => {
    const result = {
        error: false,
        message: ''
    }

    const { name, email, password } = req.body


    if (!name || !validateString(name, 3, 50)) {
        return {
            error: true,
            message: "Nombre inválido. Debe tener entre 3 y 50 caracteres."
        }
    }


    if (!email || !validateEmail(email)) {
        return {
            error: true,
            message: "Email inválido."
        }
    }

    if (!password || !validatePassword(password, 7, null, true, true)) {

        return {
            error: true,
            message: "La contraseña debe tener al menos 7 caracteres, una mayúscula y un número."
        }
    }
}