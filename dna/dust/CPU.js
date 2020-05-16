// @depends(lib/arch/op)

const HALT = 0
const LDA = 1
const LDB = 2
const STA = 3
const STB = 4
const JMP = 5
const JMZ = 6
const JNZ = 7

let id = 0
class CPU {

    constructor() {
        this.name = 'cpu' + (++id)

        this.cycles = 0
        this.time = 0
        this.last = 0
        this.fq = 1
    }

    next() {
        this.cycles ++
    }

    evo(dt) {
        this.time += dt
        if (this.time >= this.last + this.fq) {
            this.next()
            this.last = this.time
        }
    }
}

CPU.init = function() {
    lib.arch.op.defineOpCodes({
        HALT,
        LDA, 
        LDB,
        STA,
        STB,
        JMP,
        JMZ,
        JNZ,
    })
}

