const SIDE = 8
const LENGTH = SIDE*SIDE
const MAX_NAME_LENGTH = 8

const TYPE = {
    DATA: 0,
    CODE: 1,
    IO: 5,
    BUFFER: 9,
    PAL: 11,
    TILE: 12,
}

const KIND = {
    NUMBER: 0,
    CODE: 1,
    PAL: 2,
    COLOR: 3,

    SEG: 11,
    LINK: 12,
}

class Segment {
    constructor(type, name) {
        this.id = 0
        this.type = type || TYPE.DATA

        this.name = name || ''
        // normalize name
        if (this.name.length > MAX_NAME_LENGTH) {
            this.name = this.name.substring(MAX_NAME_LENGTH)
        }

        this.mem = []
        this.memt = []
        this.marker = 0

        this.clear()
    }

    clear() {
        for (let i = 0; i < LENGTH; i++) {
            this.mem[i] = 0
            this.memt[i] = 0
        }
    }

    flush(v, t) {
        if (this.marker === LENGTH) {
            throw 'overflush at #'
                + `${this.id}[${this.name}]`
        }
        this.mem[this.marker] = v || 0
        this.memt[this.marker++] = t || 0
    }

    getType() {
        switch(this.type) {
            case TYPE.DATA: return 'data';
            case TYPE.CODE: return 'code';
            case TYPE.IO: return 'io';
            case TYPE.BUFFER: return 'buffer';
            case TYPE.PAL: return 'palette';
            case TYPE.TILE: return 'tile';
        }
    }
}

Segment.SIDE = SIDE
Segment.LENGTH = LENGTH
Segment.KIND = KIND
augment(Segment, TYPE)
