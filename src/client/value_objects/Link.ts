// a hyperlink
//

import { IDataLink } from '../data_definitions/GlobalDefinitions'
import { Id } from '../util/Id'
import { IdentifiedObject } from '../util/IdentifiedObject'

export class Link extends IdentifiedObject {
    private _text: string
    private _target: string

    constructor() {
        super()
        this._text = ''
        this._target = ''
    }

    public get text(): string {
        return this._text
    }
    public set text(value: string) {
        this._text = value
    }
    public get target(): string {
        return this._target
    }
    public set target(value: string) {
        this._target = value
    }

    public deepClone(): Link {
        let newLink = new Link()
        newLink._target = this._target
        newLink._text = this._text

        return newLink
    }

    public static fromJSON(jsonLink: IDataLink): Link {
        let link = Object.assign(new Link(), jsonLink) as Link
        link.id = Id.fromString(jsonLink._id)

        return link
    }
}
