// representation of a user of the system
//

import { IDataEmployee } from '../data_definitions/EmployeeDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'

export class Employee extends IdentifiedObject {
    private _first: string
    private _last: string
    private _email: string
    private _startDate: Date
    private _skills: Id[] // settings entry ids
    private _position: Id // settings entry id
    private _interests: string[]
    private _pets: string[]
    private _details: string

    public get email(): string {
        return this._email
    }
    public set email(value: string) {
        this._email = value
    }
    public get skills(): Id[] {
        return this._skills
    }
    public set skills(value: Id[]) {
        this._skills = value
    }
    public get startDate(): Date {
        return this._startDate
    }
    public set startDate(value: Date) {
        this._startDate = value
    }
    public get position(): Id {
        return this._position
    }
    public set position(value: Id) {
        this._position = value
    }

    constructor() {
        super()

        this._first = ''
        this._last = ''
    }

    public get first(): string {
        return this._first
    }
    public set first(value: string) {
        this._first = value
    }
    public get last(): string {
        return this._last
    }
    public set last(value: string) {
        this._last = value
    }

    public static fromJSON(jsonObj: IDataEmployee): Employee {
        let employee = Object.assign(new Employee(), jsonObj) as Employee
        employee.id = Id.fromString(jsonObj._id)

        return employee
    }

    public serialize(): IDataEmployee {
        return {
            _id: this.id.id,
            _first: this._first,
            _last: this._last,
        }
    }
}
