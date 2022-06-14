import { IDataFollowUp } from '../../shared/data_definitions/FollowUpDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'
import { dateToString } from '../../shared/utils'

export class FollowUp extends IdentifiedObject {
    private _text: string
    private _resolvedDate: Date

    constructor() {
        super()
        this._text = ''
        this._resolvedDate = null
    }

    public get text(): string {
        return this._text
    }
    public set text(value: string) {
        this._text = value
    }

    public get resolvedDate(): Date {
        return this._resolvedDate
    }
    public set resolvedDate(value: Date) {
        this._resolvedDate = value
    }

    public static fromJSON(jsonFollowUp: IDataFollowUp): FollowUp {
        let followUp = Object.assign(new FollowUp(), jsonFollowUp) as FollowUp
        followUp.id = Id.fromString(jsonFollowUp._id)
        followUp.resolvedDate =
            jsonFollowUp._resolvedDate === ''
                ? null
                : new Date(jsonFollowUp._resolvedDate)

        return followUp
    }

    public serialize(): IDataFollowUp {
        return {
            _id: this.id.id,
            _text: this.text,
            _resolvedDate: this._resolvedDate
                ? dateToString(this.resolvedDate)
                : '',
        }
    }
}
