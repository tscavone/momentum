export interface IDataNote {
    _text: string
  }
  
export interface IDatedObject<T> {
    _obj: T,
    _date: string
  }
  
export interface IDataTemporalObject<T> {
    _current: T,
    _temporalObjects: IDatedObject<T>[]
  }

export interface IDataNotes{
  _notes: IDataTemporalObject<IDataNote>
}

export interface IDataGlobal {
    [key: string] : IDataNotes
}
   