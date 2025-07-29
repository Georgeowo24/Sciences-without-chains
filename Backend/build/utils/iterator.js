"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DocumentIterator {
    constructor(collection) {
        this.collection = collection;
        this.index = 0;
    }
    next() {
        return this.collection[this.index++] || null;
    }
    hasNext() {
        return this.index < this.collection.length;
    }
    reset() {
        this.index = 0;
    }
}
exports.default = DocumentIterator;
