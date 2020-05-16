const LENGTH = 64
const MAX_NAME_LENGTH = 8

const TYPE = {
    DATA: 0,
    CODE: 1,
    IO: 5,
    BUFFER: 9,
    PAL: 11,
    TILE: 12,
}

class Segment {
    constructor(type, name) {
        this.type = type || TYPE.DATA
        this.name = name || ''
        if (this.name.length > MAX_NAME_LENGTH) {
            this.name = this.name.substring(MAX_NAME_LENGTH)
        }

        this.mem = []
        this.memt = []
        this.length = LENGTH

        this.clear()
    }

    clear() {
        for (let i = 0; i < this.length; i++) {
            this.mem[i] = 0
            this.memt[i] = 0
        }
    }
}
augment(Segment, TYPE)
