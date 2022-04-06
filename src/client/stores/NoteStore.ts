// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Note } from '../value_objects/Note'
import { Id } from '../util/Id'
import {
    IDataEmployee,
    IDataNote,
    IDataTemporalObject,
} from '../data_definitions/GlobalDefinitions'
import { AbstractTemporalStore } from './AbstractTemporalStore'
import { Employee } from '../value_objects/Employee'

export class NoteStore extends AbstractTemporalStore<Note> {
    //
    //constructors
    //
    constructor() {
        super()
    }

    //
    //public methods
    //
    addEmployee(newEmployeeId: Id | string): void {
        const employeeId = Id.asString(newEmployeeId)

        if (this._allEmployeeObjects.get(employeeId) !== undefined) {
            throw `adding employee over existing: ${employeeId}`
        }

        this._allEmployeeObjects.set(
            employeeId,
            new TemporalCollection<Note>(new Note())
        )
    }

    load(jsonObj: IDataTemporalObject<IDataNote>, employeeId?: Id): void {
        this.addEmployee(employeeId.id)

        let notes: TemporalCollection<Note> =
            this.getEmployeeObjects(employeeId)

        notes.clear(new Note())

        //currently we're not saving the current object of a temporal collection, but we might want to in the future
        // to preserve people's work
        if (jsonObj._current) notes.current = Note.fromJSON(jsonObj._current)

        jsonObj._temporalObjects.forEach(
            //todo: check for obj and date members
            (obj) =>
                this.getEmployeeObjects(employeeId).put(
                    Note.fromJSON(obj._obj),
                    new Date(obj._date)
                )
        )
    }
}
