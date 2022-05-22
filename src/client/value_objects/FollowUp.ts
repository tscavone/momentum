import { IDataIdentifiedObject } from '../data_definitions/GlobalDefinitions'
import { IdentifiedObject } from '../util/IdentifiedObject'

export class FollowUp extends IdentifiedObject {
    private _text: string
    private _resolvedDate: Date

    constructor() {
        super()
        this._text = ''
        this._resolvedDate = null
    }

    public serialize(): IDataIdentifiedObject {
        throw new Error('Method not implemented.')
    }
}
