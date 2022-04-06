import { IdentifiedObject } from './IdentifiedObject'

export abstract class TemporalObject extends IdentifiedObject {
    abstract isNewlyMinted(): boolean
}
