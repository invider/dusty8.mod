// @depends(lib/arch/op)

const NOP = 0

// registers manipulation
const MOVAB  = 1
const MOVAX  = 2
const MOVAT  = 3
const MOVAR  = 4
const MOVADS = 5
const MOVATS = 6
const MOVARS = 7
const MOVAQ  = 8
const MOVAY  = 9

const MOVBA  = 10
const MOVXA  = 11
const MOVTA  = 12
const MOVRA  = 13
const MOVDSA = 14
const MOVTSA = 15
const MOVRSA = 16
const MOVQA  = 17
const MOVYA  = 18

const MOVBX  = 19
const MOVXB  = 20

const SWAPAB = 21
const SWAPAX = 22
const SWAPBX = 23

// stack ops
const POP   = 30
const PEEK  = 31
const PUSH  = 32

// memory
const LDA   = 33
const LDB   = 34
const STA   = 35
const STB   = 36

// flow control
const JMP  = 40
const JZ   = 41
const JNZ  = 42
const CALL = 43
const RET  = 44

const ADD  = 50
const SUB  = 51
const MUL  = 52
const DIV  = 53
const MOD  = 54
const POW  = 55
const SQRT = 56
const NEG  = 57
const ABS  = 58
const INC  = 59
const DEC  = 60
const OR   = 61
const AND  = 62
const NOT  = 63
const XOR  = 64
const SHL  = 65
const SHR  = 66
const SAR  = 67

const ZERO = 70
const EQ   = 71
const NEQ  = 72
const LT   = 73
const LTQ  = 74
const GT   = 75
const GTQ  = 76
const LTZ  = 77
const GTZ  = 78
const LEZ  = 79
const GEZ  = 80

const WAIT = 98
const HALT = 99

let id = 0
class CPU {

    constructor(st) {
        augment(this, st)

        this.name = 'cpu' + (++id)
        this.device = []

        this.time = 0
        this.last = 0

        // general-purpose registers
        this.A = 0 // accumulator register
        this.B = 0 // operand register
        this.X = 0 // index register

        const Segment = dna.dust.Segment
        this.segmentLength = Segment.LENGTH

        // pointer registers - shift within a segment
        this.C = 0 // command pointer
        this.T = this.segmentLength - 1 // data stack pointer
        this.R = this.segmentLength - 1 // return stack pointer

        // create code, data stack and return stack segments
        this.CS = new Segment(Segment.CODE, 'nocode')
        this.capsule.addSegment(this.CS)
        this.DS = new Segment(Segment.DATA, 'data')
        this.capsule.addSegment(this.DS)
        this.TS = new Segment(Segment.DATA, 'data stack')
        this.capsule.addSegment(this.TS)
        this.RS = new Segment(Segment.DATA, 'call stack')
        this.capsule.addSegment(this.RS)

        // special registers
        this.Q = 1 // frequency
        this.Y = 0 // cycles counter

        this.HALT = true // stop execution flag
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

        const op = this.CS.mem[this.C++]

        switch(op) {
            case LDA:
                this.A = this.CS.mem[this.C++]
                break

            case LDB:
                this.B = this.CS.mem[this.C++]
                break

            case STA:
                this.capsule.store(
                    this.CS.mem[this.C++],
                    this.CS.mem[this.C++],
                    this.A
                )
                break

            // stack ops
            case POP:
                if (this.T >= this.segmentLength - 1) {
                    throw 'stack is empty'
                }
                this.A = this.TS.mem[++this.T]
                break

            case PEEK:
                const i = this.T + this.A
                if (i < 0 || i > this.segmentLength - 1) {
                    throw `index is out of range [${i}]`
                }
                this.A = this.TS.mem[i]
                break

            case PUSH:
                if (this.T < 0) throw 'stack overflow'
                this.TS.mem[this.T--] = this.A
                break

            // math ops
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

            case POW:
                this.A = Math.pow(this.A, this.B)
                break

            case SQRT:
                this.A = Math.sqrt(this.A) | 0
                break

            case NEG:
                this.A = -this.A
                break

            case ABS:
                this.A = Math.abs(this.A)
                break

            case INC:
                this.A ++
                break

            case DEC:
                this.A --
                break

            // bitwise ops
            case OR:
                this.A = (this.A | this.B)
                break

            case AND:
                this.A = (this.A & this.B)
                break

            case NOT:
                this.A = (~this.A)
                break

            case XOR:
                this.A = (this.A ^ this.B)
                break

            case SHL:
                this.A = this.A << this.B
                break

            case SHR:
                this.A = this.A >> this.B
                break

            case SAR:
                this.A = this.A >>> this.B
                break

            // logic
            case ZERO:
                this.A = this.A === 0? 1 : 0
                break

            case EQ:
                this.A = this.A === this.B? 1 : 0
                break

            case NEQ:
                this.A = this.A !== this.B? 1 : 0
                break

            case LT:
                this.A = this.A < this.B? 1 : 0
                break

            case LTQ:
                this.A = this.A <= this.B? 1 : 0
                break

            case GT:
                this.A = this.A > this.B? 1 : 0
                break

            case GTQ:
                this.A = this.A >= this.B? 1 : 0
                break

            case LTZ:
                this.A = this.A < 0? 1 : 0
                break

            case GTZ:
                this.A = this.A > 0? 1 : 0
                break

            case LEZ:
                this.A = this.A <= 0? 1 : 0
                break

            case GEZ:
                this.A = this.A >= 0? 1 : 0
                break

            // system execution
            case NOP:
                // do nothing...
                break

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

        MOVAB,
        MOVAX,
        MOVAT,
        MOVAR,
        MOVADS,
        MOVATS,
        MOVARS,
        MOVAQ,
        MOVAY,
        MOVBA,
        MOVXA,
        MOVTA,
        MOVRA,
        MOVDSA,
        MOVTSA,
        MOVRSA,
        MOVQA,
        MOVYA,
        MOVBX,
        MOVXB,
        SWAPAB,
        SWAPAX,
        SWAPBX,

        POP,
        PEEK,
        PUSH,

        LDA,
        LDB,
        STA,
        STB,
        JMP,
        JZ,
        JNZ,
        CALL,
        RET,

        ADD,
        SUB,
        MUL,
        DIV,
        MOD,
        POW,
        SQRT,
        NEG,
        ABS,
        INC,
        DEC,

        OR,
        AND,
        NOT,
        XOR,
        SHL,
        SHR,
        SAR,

        ZERO,
        EQ,
        NEQ,
        LT,
        LTQ,
        GT,
        GTQ,
        LTZ,
        GTZ,
        LEZ,
        GEZ,

        WAIT,
        HALT,
    })
}
