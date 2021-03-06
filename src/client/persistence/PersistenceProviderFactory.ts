import { IPersistenceProvider } from './IPersistenceProvider'
import { LocalPersistenceProvider } from './LocalPersistenceProvider'
import { ServerPersistenceProvider } from './ServerPersistenceProvider'
import { TestPersistenceProvider } from './TestPersistenceProvider'

export class PersistenceProviderFactory {
    static getPersistenceProvider(
        userId: string,
        storage: string
    ): IPersistenceProvider {
        switch (storage) {
            case 'server':
                return new ServerPersistenceProvider(userId)
            case 'local':
                return new LocalPersistenceProvider(userId)
            case 'test':
                return new TestPersistenceProvider(userId)
            default:
                throw new Error(
                    `unknown value for storage setting:  ${storage}`
                )
        }
    }
}
