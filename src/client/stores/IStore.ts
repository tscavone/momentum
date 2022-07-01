// declares methods used by value object stores
//

export interface IStore {
    load(): Promise<string>
}
