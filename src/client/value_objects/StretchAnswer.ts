//
//
import { IDataStretchAnswer } from '../data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { TemporalObject } from '../util/TemporalObject'

export class StretchAnswer extends TemporalObject {
    private _answer: string
    private _questionId: Id

    constructor() {
        super()
        this._answer = ''
        this._questionId = null
    }

    public get answer(): string {
        return this._answer
    }
    public set answer(value: string) {
        this._answer = value
    }
    public get questionId(): Id {
        return this._questionId
    }
    public set questionId(value: Id) {
        if (this._questionId === null) {
            this._questionId = Id.fromString(value.id)
        } else {
            this._questionId.id = value.id
        }
    }

    //
    //public methods
    //
    public static fromJSON(jsonObj: IDataStretchAnswer): StretchAnswer {
        let answer = Object.assign(
            new StretchAnswer(),
            jsonObj
        ) as StretchAnswer
        answer._questionId = Id.fromString(jsonObj._questionId)
        answer.id = Id.fromString(jsonObj._id)

        return answer
    }

    public serialize(): IDataStretchAnswer {
        return {
            _id: this.id.id,
            _answer: this._answer,
            _questionId: this._questionId.id,
        }
    }

    isNewlyMinted(): boolean {
        return this.answer === '' || this.questionId === null
    }
}
