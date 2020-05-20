// @depends(lib/arch/op)

const NOP = 0
const LDA = 1
const LDB = 2
const STA = 3
const STB = 4
const JMP = 5
const JMZ = 6
const JNZ = 7

const RET = 98
const HALT = 99

let id = 0
class CPU {

    constructor(st) {
        this.name = 'cpu' + (++id)
        this.device = []

        this.cycles = 0
        this.time = 0
        this.last = 0
        this.fq = 1

        this.code = null
        this.dstack = null
        this.rstack = null


        this.A = 0
        this.B = 0
        this.X = 0
        this.Y = 0
        this.Z = 0

        augment(this, st)
    }

    addDevice(dev) {
        this.device.push(dev)
    }

    powerUp() {
        this.device.forEach(d => d.powerUp())
    }

    next() {
        this.cycles ++
    }

    exec(seg) {
        let cp = 0
        const len = seg.mem.length
        while(cp < len) {
            const op = seg.mem[cp++]

            switch(op) {
                case LDA:
                    this.A = seg.mem[cp++]
                    break

                case LDB:
                    this.B = seg.mem[cp++]
                    break

                case STA:
                    this.capsule.store(
                        seg.mem[cp++],
                        seg.mem[cp++],
                        this.A
                    )
                    break

                case NOP:
                case RET:
                case HALT:
                    return

                default:
                    log('skipping ' + op)
            }
        }
    }

    call(name) {
        const seg = this.capsule.getSegment(name)
        if (seg) {
            this.exec(seg)
        } else {
            throw `can't find [${name}]`
        }
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
        NOP,
        LDA, 
        LDB,
        STA,
        STB,
        JMP,
        JMZ,
        JNZ,

        RET,
        HALT,
    })
}

