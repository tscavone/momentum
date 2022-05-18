import { IPersistenceProvider } from './IPersistenceProvider'

export interface IWriteable {
    _persistenceProvider: IPersistenceProvider
    write(): Promise<string>
}
