// This generic allows the representation, saving and loading of the various objects
// for each Employee and as they change over time
//
// adapted from https://martinfowler.com/eaaDev/TemporalProperty.html

import { DateRange } from './DateRange'
import { DatedObject } from './DatedObject'
import { clone } from 'lodash'
import { makeAutoObservable } from 'mobx'
import { IdentifiedObject } from './IdentifiedObject'
import { Id } from './Id'

export class TemporalCollection<T extends IdentifiedObject> {
    //members
    private _current: T
    private _temporalObjects: Map<Date, T>
    private _milestoneCache: Date[] | null

    //constructors
    constructor(current: T) {
        makeAutoObservable(this)
        this._current = current
        this._temporalObjects = new Map<Date, T>()
        this._milestoneCache = null
    }

    //private methods
    private milestoneCache(): Date[] {
        if (this._milestoneCache == null) {
            this._milestoneCache = []
            this.calculateMilestones()
        }
        return this._milestoneCache
    }

    private calculateMilestones(): void {
        this._milestoneCache = []
        this._milestoneCache.push(...Array.from(this._temporalObjects.keys()))
        this._milestoneCache
            .slice()
            .sort((a: Date, b: Date) => b.getTime() - a.getTime())
    }

    private clearMilestoneCache() {
        this._milestoneCache = null
    }

    put(newMilestone: T, at: Date): void {
        this._temporalObjects.set(at, newMilestone)
        this.clearMilestoneCache()
    }

    //returns null if there is no milestone for that date. Else returns a list of all milestones
    //  that match <targetDate>.  <targetDate> time values are ignored
    getSavedByDate(targetDate: Date): DatedObject<IdentifiedObject>[] {
        let start: Date = new Date(targetDate.getTime())
        start.setHours(0, 0, 0, 0)
        let end: Date = new Date(targetDate.getTime())
        end.setHours(23, 59, 59, 999)

        return this.getSaved(new DateRange(start, end))
    }

    //returns an array of DatedObjects latest first. an empty array if there aren't any for that range
    getSaved(targetRange: DateRange): DatedObject<T>[] {
        let resultSet: DatedObject<T>[] = []

        for (let milestoneDate of this.milestoneCache()) {
            if (targetRange.includes(milestoneDate)) {
                let match = this._temporalObjects.get(milestoneDate)
                if (!match) {
                    throw `internal error, missing object in _temporalObjects: ${this._temporalObjects} `
                }
                let datedObject: DatedObject<T> = new DatedObject(
                    milestoneDate,
                    match
                )
                resultSet.push(datedObject)
            }
        }

        return resultSet
    }

    //return null if not found
    getSavedById(id: Id | string): T | null {
        const idStr = Id.asString(id)

        for (const obj of this._temporalObjects.values()) {
            if (obj.id.id === idStr) {
                return obj
            }
        }

        return null
    }

    getLatestSaved(): T {
        const cache = this.milestoneCache()
        let latestDate = cache[cache.length - 1]
        return this._temporalObjects.get(latestDate)
    }

    get current(): T {
        return this._current
    }

    set current(newCurrent: T) {
        this._current = newCurrent
    }

    save(date?: Date) {
        date = date ? date : new Date()
        this.put(clone(this._current), date)
        console.log('new temporal object added', this._temporalObjects)
    }

    clear(newCurrent: T) {
        this._current = newCurrent
        this._temporalObjects.clear()
        this.clearMilestoneCache()
    }
}
