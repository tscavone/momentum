// An abstract class that implements a constructor assigning a new Id to a newly created
// object
//

import { IDataIdentifiedObject } from '../../shared/data_definitions/GlobalDefinitions'
import { Id } from './Id'
import { ISerializable } from './ISerializable'

export abstract class IdentifiedObject implements ISerializable {
    //
    //members
    //
    private _id: Id

    //
    //constructors
    //
    constructor() {
        this._id = new Id()
    }

    //
    //accessors
    //
    public get id(): Id {
        return this._id
    }
    public set id(value: Id) {
        this._id = value
    }

    public static fromJSON(jsonObj: object): IdentifiedObject {
        throw `IdentifiedObject.fromJSON should not be called;
        implement fromJSON in child.`
    }

    public abstract serialize(): IDataIdentifiedObject
}
