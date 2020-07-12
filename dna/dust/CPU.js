// @depends(lib/arch/op)

const NOP = 0
const LDA = 1
const LDB = 2
const STA = 3
const STB = 4
const JMP = 5
const JMZ = 6
const JNZ = 7

const ADD = 10
const SUB = 11
const MUL = 12
const DIV = 13
const MOD = 14

const RET = 91
const WAIT = 98
const HALT = 99

let id = 0
class CPU {

    constructor(st) {
        this.name = 'cpu' + (++id)
        this.device = []

        this.time = 0
        this.last = 0

        // general-purpose registers
        this.A = 0 // accumulator register
        this.B = 0 // operand register
        this.X = 0 // index register

        // pointer registers - shift within a segment
        this.C = 0 // command pointer
        this.T = 0 // data stack pointer
        this.R = 0 // return stack pointer

        // create code, data stack and return stack segments
        const Segment = dna.dust.Segment
        this.CS = new Segment(Segment.CODE, 'nocode')
        this.DS = new Segment(Segment.DATA, 'data')
        this.TS = new Segment(Segment.DATA, 'data stack')
        this.RS = new Segment(Segment.DATA, 'call stack')

        // special registers
        this.Q = 1 // frequency
        this.Y = 0 // cycles counter

        this.HALT = true // stop execution flag

        augment(this, st)
    }

    addDevice(dev) {
        this.device.push(dev)
    }

    powerUp() {
        this.device.forEach(d => d.powerUp())
    }

    next() {
        if (this.HALT) return

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

            case ADD:
                this.A = this.A + this.B
                break

            case SUB:
                this.A = this.A - this.B
                break

            case MUL:
                this.A = this.A * this.B
                break

            case DIV:
                this.A = (this.A / this.B) | 0
                break

            case MOD:
                this.A = this.A % this.B
                break

            case NOP:
            case RET:
            case HALT:
                this.HALT = true
                break

            default:
                log('found unknown op: ' + op)
                this.HALT = true
        }
    }

    exec(seg) {
        this.C = 0
        this.CS = seg
        this.HALT = false
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

        ADD,
        SUB,
        MUL,
        DIV,
        MOD,

        RET,
        HALT,
    })
}

