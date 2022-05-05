// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Note } from '../value_objects/Note'
import { Id } from '../util/Id'
import { IDataEmployees } from '../data_definitions/GlobalDefinitions'
import { AbstractTemporalStore } from './AbstractTemporalStore'

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

    load(employeeData: IDataEmployees): void {
        //clear all existing data
        this._allEmployeeObjects.clear()

        for (let employeeId in employeeData) {
            const notesData = employeeData[employeeId]._notes
            this.addEmployee(employeeId)

            let notes: TemporalCollection<Note> =
                this.getCollectionForEmployee(employeeId)

            notes.clear(new Note())

            //currently we're not saving the current object of a temporal collection, but we might want to in the future
            // to preserve people's work
            if (notesData._current)
                notes.current = Note.fromJSON(notesData._current)

            notesData._temporalObjects.forEach(
                //todo: check for obj and date members
                (obj) =>
                    this.getCollectionForEmployee(employeeId).put(
                        Note.fromJSON(obj._obj),
                        new Date(obj._date)
                    )
            )
        }
    }
}
