export interface IDataIdentifiedObject {
    _id: string
}

export interface IDataNote extends IDataIdentifiedObject {
    _text: string
}

export interface IDataStretchAnswer extends IDataIdentifiedObject {
    _answer: string
    _question: string
}
export interface IDatedObject<T> {
    _obj: T
    _date: string
}

export interface IDataTemporalObject<T> {
    _current: T
    _temporalObjects: IDatedObject<T>[]
}

export interface IDataEmployee {
    _notes: IDataTemporalObject<IDataNote>
    _stretchAnswers: IDataTemporalObject<IDataStretchAnswer>
}

export interface IDataGlobal {
    [key: string]: IDataEmployee
}
