class DocumentIterator<T> {
    private index = 0;

    constructor(private collection: T[]) {}

    next(): T | null {
        return this.collection[this.index++] || null;
    }

    hasNext(): boolean {
        return this.index < this.collection.length;
    }

    reset(): void {
        this.index = 0;
    }
}

export default DocumentIterator;