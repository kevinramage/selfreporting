export class History<T> {
    private _states : Array<T>;
    private _index = 0;
    private _changes : Array<string>;

    constructor() {
        this._states = [];
        this._changes = [];
        this._index = -1;
    }

    public addState(element: T, change: string) {

        // Resize list
        this._states = this._states.slice(0, (this._index+1));
        this._changes = this._changes.slice(0, (this._index+1));

        // Push element in list
        this.states.push(element);
        this._changes.push(change);

        // Update index
        this._index++;
    }

    public undo() {
        if (this.states.length > 0 && this._index > 0) {
            return this.states[--this._index];
        } else {
            return null;
        }
    }

    public isCancelable() {
        return this._index > 0;
    }

    public redo() {
        if (this._index < this.states.length - 1) {
            return this.states[++this._index];
        } else {
            return null;
        }
    }

    public isRepeatable() {
        return this._index < this.states.length - 1;
    }

    public get states() {
        return this._states;
    }

    public get changes() {
        return this._changes;
    }

    public get elements() {
        return this.states.map((s, index) => { return {
            state: s,
            change: this.changes[index],
            isCurrent: (index === this._index)
        }});
    }
}