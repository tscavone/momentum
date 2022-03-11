// An object that contains a date timestamp
//

export class DatedObject<T> {

    //
    //members
    //
    private _date: Date;
    private _obj: T;

    //
    //constructors
    //
    constructor(date: Date, obj: T){
        this._date = date;
        this._obj = obj;
    }

    //
    //accessors
    //
    get date(): Date{
        return this._date;
    }

    get obj(): T{
        return this._obj;
    }
}
