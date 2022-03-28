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
    addEmployee(newEmployee: Employee | string): void {
        const employeeId: string =
            newEmployee instanceof Employee ? newEmployee.id.id : newEmployee

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
        notes.current = Note.fromJSON(jsonObj._current)

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
