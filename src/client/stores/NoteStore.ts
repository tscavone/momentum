// store for employee note objects
//

import { TemporalCollection } from "../util/TemporalCollection";
import { Note } from "../value_objects/Note";
import { Id } from "../util/Id";
import { DateRange } from "../util/DateRange";
import { DatedObject } from "../util/DatedObject";
import { IdentifiedObject } from "../util/IdentifiedObject";
import { ITemporalStore } from "./ITemporalStore";
import { IDataNotes } from "../data_definitions/GlobalDefinitions";

export class NoteStore implements ITemporalStore {

    //
    //members
    //
    _allEmployeeNotes: Map<string, TemporalCollection<Note>>

    //
    //constructors
    //
    constructor(){
        this._allEmployeeNotes = new Map<string, TemporalCollection<Note>>()
    }
    //
    //accessors
    //

    //
    //private methods
    //
    private getEmployeeObjects(employeeId: Id) : TemporalCollection<Note> {

        if(this._allEmployeeNotes.get(employeeId.id) === undefined){
            this._allEmployeeNotes.set(employeeId.id, new TemporalCollection<Note>(new Note()))
        }

        return this._allEmployeeNotes.get(employeeId.id)!;
    }

    //
    //public methods
    //
    setCurrent(employeeId : Id, newValue : string){
        this._allEmployeeNotes.get(employeeId.id)!.current.text = newValue;
    }

    save(id: Id, date: Date) {
        this._allEmployeeNotes.get(id.id)!.save(date)
    }
  
    getSaved(id: Id, dateRange: DateRange): DatedObject<IdentifiedObject>[] {
        return this.getEmployeeObjects(id).getSaved(dateRange)
    }

    load(jsonObj: IDataNotes, employeeId?: Id): void
    {
        let notes: TemporalCollection<Note> = this.getEmployeeObjects(employeeId);

        notes.clear(new Note());
        notes.current = Note.fromJSON(jsonObj._notes._current);

        jsonObj._notes._temporalObjects.forEach(
            //todo: check for obj and date members
            obj => this.getEmployeeObjects(employeeId).put(Note.fromJSON(obj._obj), new Date(obj._date))
        )
     }
}