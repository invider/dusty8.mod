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

        this.time = 0
        this.last = 0

        this.A = 0
        this.B = 0
        this.I = 0

        this.Q = 1 // frequency
        this.Y = 0 // cycles counter
        this.C = 0
        this.D = 0
        this.R = 0

        const Segment = dna.dust.Segment
        this.CS = new Segment(Segment.CODE, 'nocode')
        this.DS = new Segment(Segment.DATA, 'datastack')
        this.RS = new Segment(Segment.DATA, 'retstack')

        this.FS = true

        augment(this, st)
    }

    addDevice(dev) {
        this.device.push(dev)
    }

    powerUp() {
        this.device.forEach(d => d.powerUp())
    }

    next() {
        if (this.FS) return

        this.Y ++
        const CS = this.CS

        const op = CS.mem[this.C++]

        switch(op) {
            case LDA:
                this.A = CS.mem[this.C++]
                break

            case LDB:
                this.B = CS.mem[this.C++]
                break

            case STA:
                this.capsule.store(
                    CS.mem[this.C++],
                    CS.mem[this.C++],
                    this.A
                )
                break

            case NOP:
            case RET:
            case HALT:
                this.FS = true
                break

            default:
                log('found unknown op: ' + op)
                this.FS = true
        }
    }

    exec(seg) {
        this.C = 0
        this.CS = seg
        this.FS = false
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
        if (this.time >= this.last + this.Q) {
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

