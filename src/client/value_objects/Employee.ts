// representation of a user of the system
//

import { IDataEmployee } from '../data_definitions/EmployeeDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { dateToString } from '../util/utils'

export class Employee extends IdentifiedObject {
    private _first: string
    private _last: string
    private _email: string
    private _startDate: Date
    private _position: Id // settings entry id
    private _skills: string[] // settings entry ids
    private _interests: string[]
    private _college: string
    private _hometown: string
    private _townOfResidence: string
    private _birthMonthDay: Date
    private _pets: string[]
    private _additionalDetails: string

    constructor() {
        super()
        this._first = ''
        this._last = ''
        this._email = ''
        this._startDate = null
        this._position = null
        this._skills = []
        this._interests = []
        this._college = ''
        this._hometown = ''
        this._townOfResidence = ''
        this._birthMonthDay = null
        this._pets = []
        this._additionalDetails = ''
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
    public get email(): string {
        return this._email
    }
    public set email(value: string) {
        this._email = value
    }
    public get skills(): string[] {
        return this._skills
    }
    public set skills(value: string[]) {
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

    public get interests(): string[] {
        return this._interests
    }
    public set interests(value: string[]) {
        this._interests = value
    }
    public get pets(): string[] {
        return this._pets
    }
    public set pets(value: string[]) {
        this._pets = value
    }
    public get hometown(): string {
        return this._hometown
    }
    public set hometown(value: string) {
        this._hometown = value
    }
    public get townOfResidence(): string {
        return this._townOfResidence
    }
    public set townOfResidence(value: string) {
        this._townOfResidence = value
    }
    public get college(): string {
        return this._college
    }
    public set college(value: string) {
        this._college = value
    }
    public get additionalDetails(): string {
        return this._additionalDetails
    }
    public set additionalDetails(value: string) {
        this._additionalDetails = value
    }
    public get birthMonthDay(): Date {
        return this._birthMonthDay
    }
    public set birthMonthDay(value: Date) {
        this._birthMonthDay = value
    }

    public static fromJSON(jsonEmployee: IDataEmployee): Employee {
        let employee = Object.assign(new Employee(), jsonEmployee) as Employee
        employee.id = Id.fromString(jsonEmployee._id)
        employee.startDate = jsonEmployee._startDate
            ? null
            : new Date(jsonEmployee._startDate)
        employee.position = Id.fromString(jsonEmployee._position)
        if (jsonEmployee._skills.length === 0) {
            employee.skills = []
        } else {
            employee.skills = jsonEmployee._skills.map((skill) =>
                Id.fromString(skill)
            )
        }
        employee.birthMonthDay = jsonEmployee._birthMonthDay
            ? new Date(jsonEmployee._birthMonthDay)
            : null

        return employee
    }

    public serialize(): IDataEmployee {
        return {
            _id: this.id.id,
            _first: this._first,
            _last: this._last,
            _email: this._email,
            _startDate: this.startDate ? dateToString(this.startDate) : '',
            _position: this.position.id,
            _skills: [...this.skills],
            _interests: [...this.interests],
            _college: this.college,
            _hometown: this.hometown,
            _townOfResidence: this.townOfResidence,
            _birthMonthDay: this.birthMonthDay
                ? dateToString(this.birthMonthDay)
                : '',
            _pets: this.pets,
            _additionalDetails: this._additionalDetails,
        }
    }
}
