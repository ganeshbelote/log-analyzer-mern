import bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10)
}

const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword)
}

export { comparePassword, hashPassword }
