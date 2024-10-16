import type { HashService } from '../../core/services/hash-service'
import * as bcrypt from 'bcrypt'

export class BcryptHashService implements HashService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return hash
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isEquals = await bcrypt.compare(password, hash)

    return isEquals
  }
}
