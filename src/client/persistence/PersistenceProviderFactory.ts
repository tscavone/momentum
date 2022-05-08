import { SettingsStore } from '../stores/SettingsStore'
import { IPersistenceProvider } from './IPersistenceProvider'
import { TestPersistenceProvider } from './TestPersistenceProvider'

export class PersistenceProviderFactory {
    static getPersistenceProvider(
        userId: string,
        settingsStore: SettingsStore
    ): IPersistenceProvider {
        return new TestPersistenceProvider(userId)
    }
}
