export interface IDataIdentifiedObject {
    _id: string
}

export interface IDataNote extends IDataIdentifiedObject {
    _text: string
}

export interface IDataStretchAnswer extends IDataIdentifiedObject {
    _answer: string
    _questionId: string
}

export interface IDataLink extends IDataIdentifiedObject {
    _text: string
    _target: string
}

export interface IDataGoal extends IDataIdentifiedObject {
    _settingEntryId: string
    _details: string
    _milestones: []
    _links: IDataLink[]
    _progress: number
}

export interface IDataStatusAndGoals extends IDataIdentifiedObject {
    _status: string
    _goals: IDataGoal[]
}

export interface IDatedObject<T> {
    _obj: T
    _date: string
}

export interface IDataTemporalObject<T> {
    _current?: T
    _temporalObjects: IDatedObject<T>[]
}

export interface IDataEmployee {
    _notes: IDataTemporalObject<IDataNote>
    _stretchAnswers: IDataTemporalObject<IDataStretchAnswer>
    _statusAndGoals: IDataTemporalObject<IDataStatusAndGoals>
}

export interface IDataEmployees {
    [key: string]: IDataEmployee
}

export interface IDataGlobal {
    [key: string]: IDataEmployees
}
