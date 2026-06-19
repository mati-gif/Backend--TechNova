export const validateShippingAddress = (req) => {
  const result = {
    error: false,
    message: "",
  };

  const { fullName, address, city, province, zipCode, phone } = req.body;

  // Validamos campos obligatorios y vacíos
  if (!fullName || fullName.trim() === "") {
    return { error: true, message: "El nombre no puede estar vacío" };
  }
  if (!address || address.trim() === "") {
    return { error: true, message: "La dirección es obligatoria" };
  }
  if (!city || city.trim() === "") {
    return { error: true, message: "La ciudad es obligatoria" };
  }
  if (!province || province.trim() === "") {
    return { error: true, message: "La provincia no puede estar vacía" };
  }
  if (!zipCode || zipCode.trim() === "") {
    return { error: true, message: "El código postal no puede estar vacío" };
  }
  if (!phone || phone.trim() === "") {
    return { error: true, message: "El teléfono no puede estar vacío" };
  }

  // Validación de formato de teléfono (7 a 15 dígitos)
  if (!/^\d{7,15}$/.test(phone)) {
    return {
      error: true,
      message: "Ingrese un número de teléfono válido (7-15 dígitos)",
    };
  }

  // Si todo está correcto, retornamos error en false
  return result;
};
