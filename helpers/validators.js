export function emailValidator(value) {
  let error

  if (!value) {
    error = 'Es necesario introducir un email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'El formato no es correcto'
  }

  return error
}

export function nameValidator(value) {
  let error

  if (!value) {
    error = 'Es necesario introducir un nombre'
  } else if (!/^([A-Z]||\s)+/i.test(value)) {
    error = 'El formato no es correcto'
  }

  return error
}

export function addressValidator(value) {
  let error

  if (!value) {
    error = 'Es necesario introducir una dirección'
  } else if (!/^([A-Za-z0-9]+|(,\.)*)+/i.test(value)) {
    error = 'El formato de dirección no es correcto'
  }

  return error
}

export function phoneValidator(value) {
  let error

  if (!value) {
    error = 'Es necesario introducir tu número de teléfono'
  } else if (!/^[0-9]{9}/i.test(value)) {
    error = 'El formato del número de teléfono no es correcto'
  }

  return error
}

export function postalCodeValidator(value) {
  let error

  if (!value) {
    error = 'Es necesario introducir un código postal'
  } else if (!/^[0-9]{5}/i.test(value)) {
    error = 'El formato de código postal no es correcto'
  }

  return error
}

export function validateCity(value) {
  let error

  if (!value) {
    error = 'Es necesario introducir una localidad'
  } else if (!/^([A-Z|a-z]|\s)+/i.test(value)) {
    error = 'El formato de localidad no es correcto'
  }

  return error
}

export const NIF_LETTER_BY_ORDER = 'TRWAGMYFPDXBNJZSQVHLCKE'
export const NIE_LETTER = 'XYZ'

export const NIF_REGEXP = /^(\d{7,8})([A-Z])$/i

export function NIFvalidator (nif) {
  if (!nif) return 'Es necesario introducir un nif'

  const matcher = NIF_REGEXP.exec(nif)

  if (!matcher) return 'Formato nif no válido'

  const letter = matcher[2]
  const numbers = matcher[1]

  const letterByOrder = NIF_LETTER_BY_ORDER[parseInt(numbers, 10) % 23]

  if (letter !== letterByOrder) return 'Formato nif no válido'

}

export const NIEvalidator = (nie) => {
  if (!nie) return 'Es necesario introducir un nie'

  const firstLetter= nie[0]

  const nif = NIE_LETTER.indexOf(firstLetter) + nie.slice(1)

  return NIFvalidator(nif)
}

export const dayValidator = (day) => {
  if (!day) return 'Es necesario introducir tu día de nacimiento'

  if (parseInt(day) < 1 || parseInt(day) > 31) return 'Introduce un día válido'
}

export const monthValidator = (month) => {
  if (!month) return 'Es necesario introducir tu mes de nacimiento'

  if (parseInt(month) < 1 || parseInt(month) > 12) return 'Introduce un mes válido'
}

export const yearValidator = (year) => {
  if (!year) return 'Es necesario introducir tu año de nacimiento'

  const validUntil = new Date().getFullYear() - 16

  if (parseInt(year) < 1900) return `El año tiene que ser mayor que ${1900}`
  if (parseInt(year) > validUntil) return `El año tiene que ser menor que ${validUntil}`
}

export const dateValidator = (date) => {
  if (!date) return 'Es necesario introducir tu fecha de nacimiento'

  const split = date.split('/')

  const day = split[0]
  const month = split[1]
  const year = split[2]

  let err = ''

  if ((err = dayValidator(day))) return err
  if ((err = monthValidator(month))) return err
  if ((err = yearValidator(year))) return err
}