// 
//

import { Id } from "../util/Id";
import { IdentifiedObject } from "../util/IdentifiedObject";

export class StretchAnswer extends IdentifiedObject {

    //
    //members
    //
    _answer: string;
    _question: Id;
  
    //
    // constructors
    //
    constructor(answer: string, question: Id) {
        super();
        this._answer = answer;
        this._question = question;
    }

    //
    //accessors
    //

    //
    //private methods
    //

    //
    //public methods
    //

}