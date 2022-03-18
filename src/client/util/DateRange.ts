// To represent a range of time
//
// adapted from https://martinfowler.com/eaaDev/Range.html

export class DateRange {
    //
    // members
    //
    private _start: Date
    private _end: Date

    //
    // constructors
    //
    constructor(start: Date, end: Date) {
        this._start = start
        this._end = end
    }

    static upTo(end: Date): DateRange {
        return new DateRange(DateRange.BEFORE_TIMES, end)
    }
    static startingOn(start: Date): DateRange {
        return new DateRange(start, DateRange.AFTER_TIMES)
    }
    static BEFORE_TIMES = new Date(1900, 1)
    static AFTER_TIMES = new Date(2300, 1)

    //
    // accessors
    //
    get start(): Date {
        return this._start
    }

    get end(): Date {
        return this._end
    }

    //
    // private methods
    //
    private static toEpoch(date: Date): number {
        return Math.floor(date.getTime() / 1000)
    }

    //
    // public methods
    //
    toString(): string {
        if (!this.isEmpty()) {
            return `${this._start.toLocaleDateString()} - ${this._end.toLocaleDateString()}`
        }

        return ''
    }

    isEmpty(): boolean {
        return DateRange.toEpoch(this._start) > DateRange.toEpoch(this._end)
    }

    includes(date: Date): boolean {
        return (
            DateRange.toEpoch(date) >= DateRange.toEpoch(this._start) &&
            DateRange.toEpoch(date) <= DateRange.toEpoch(this._end)
        )
    }

    equals(otherRange: DateRange): boolean {
        return (
            DateRange.toEpoch(otherRange.start) ===
                DateRange.toEpoch(this._start) &&
            DateRange.toEpoch(otherRange.end) === DateRange.toEpoch(this._end)
        )
    }

    overlaps(otherRange: DateRange): boolean {
        return (
            this.includesRange(otherRange) ||
            this.includes(otherRange.start) ||
            this.includes(otherRange.end)
        )
    }

    includesRange(otherRange: DateRange): boolean {
        return this.includes(otherRange.start) && this.includes(otherRange.end)
    }
}
