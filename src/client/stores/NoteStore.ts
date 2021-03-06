// store for employee note objects
//

import { TemporalCollection } from '../util/TemporalCollection'
import { Note } from '../value_objects/Note'
import { Id } from '../util/Id'
import {
    IDataNote,
    IDataNotes,
    IDataTemporalObject,
    IDatedObject,
} from '../../shared/data_definitions/GlobalDefinitions'
import { AbstractTemporalStore } from './AbstractTemporalStore'
import { DateRange } from '../util/DateRange'
import { dateToString } from '../../shared/utils'

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

    getNoteSummary(employeeId: string): string {
        let status = ''
        const employeeCollection = this.getCollectionForEmployee(employeeId)
        if (employeeCollection && employeeCollection.getLatestSaved()) {
            status = employeeCollection.getLatestSaved().text
        }
        return this.summarize([status])
    }

    async load(): Promise<string> {
        const employeeNotesData =
            (await this._persistenceProvider.getNotesData()) as IDataNotes

        //clear all existing data
        this._allEmployeeObjects.clear()

        for (let employeeId in employeeNotesData) {
            const notesData = employeeNotesData[employeeId]
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
                (datedObject) =>
                    this.getCollectionForEmployee(employeeId).put(
                        Note.fromJSON(datedObject._obj as IDataNote),
                        new Date(datedObject._date)
                    )
            )
        }

        return Promise.resolve('Notes loaded')
    }

    write(): Promise<string> {
        if (this._persistenceProvider === null)
            throw new Error('peristenceProvider null in noteStore')

        let notesData: IDataNotes = {}

        for (const [employeeID, temporalNotes] of this._allEmployeeObjects) {
            let serializedTemportalNote: IDataTemporalObject<IDataNote> = {
                _temporalObjects: [],
            }
            serializedTemportalNote._current = temporalNotes.current.serialize()

            for (const temporalNote of temporalNotes.getSaved(
                new DateRange(DateRange.BEFORE_TIMES, DateRange.AFTER_TIMES)
            )) {
                let datedNote: IDatedObject<IDataNote> = {
                    _obj: null,
                    _date: null,
                }
                datedNote._obj = temporalNote.obj.serialize()
                datedNote._date = dateToString(temporalNote.date)

                serializedTemportalNote._temporalObjects.push(datedNote)
            }

            notesData[employeeID] = serializedTemportalNote
        }
        return this.persistenceProvider.writeNotesData(notesData)
    }
}
