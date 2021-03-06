const JUMP = 8

class CoreMonitor extends dna.hud.Container {

    constructor(st) {
        super(st)
        this.segmentId = 0
    }

    getHighlight() {
        if (this.segmentId === this.cpu.CS.id) {
            return this.cpu.C
        } else if (this.segmentId === this.cpu.TS.id) {
            return this.cpu.T
        } else if (this.segmentId === this.cpu.RS.id) {
            return this.cpu.R
        }
        return -1
    }

    drawData(seg) {
        const S = 8
        const bx = 10
        const by = 40
        const dx = 50
        const dy = 25

        const highlight = this.getHighlight()

        let p = 0
        for (let i = 0; i < S; i++) {
            for (let j = 0; j < S; j++) {
                const shift = i*S + j
                const v = seg.mem[shift]
                const t = v? v : '.'

                if (shift === highlight) {
                    fill(env.style.highlight)
                } else {
                    fill(env.style.content)
                }
                text(t, bx + j*dx, by + i*dy)
            }
        }
    }

    drawGrid(seg) {
        const S = 8
        const bx = 10
        const by = 40
        const dx = 25
        const dy = 25

        let p = 0
        for (let i = 0; i < S; i++) {
            for (let j = 0; j < S; j++) {
                const v = seg.mem[i*S + j]
                if (v !== undefined) {
                    const c = '#' + lib.util.hexColor(v)
                    fill(c)

                    const x = bx + j*dx
                    const y = by + i*dy
                    rect(x, y, 16, 16)
                }
            }
        }

    }

    drawContent() {
        const Segment = dna.dust.Segment
        const seg = this.capsule.segmentAt(this.segmentId)

        // title
        fill(env.style.content)
        font('16px moon')
        alignLeft()
        baseTop()

        const title = '#' + seg.id + '['
            + seg.name + ']: ' + seg.getType()
        text(title, 10, 10)

        // data
        switch(seg.type) {
            case Segment.PAL:
                this.drawGrid(seg)
                break
            default:
                this.drawData(seg)
        }
    }

    drawBackground() {
        fill('#151520')
        rect(0, 0, this.w, this.h)
        if (this.focus) {
            lineWidth(2)
            stroke('#ffff00')
            rect(0, 0, this.w, this.h)
        }
    }

    onFocus() {}

    prevSegment(n) {
        this.segmentId -= n
        if (this.segmentId < 0) {
            this.segmentId = this.capsule.segment.length - 1
        }
    }

    nextSegment(n) {
        this.segmentId += n
        if (this.segmentId >= this.capsule.segment.length) {
            this.segmentId = 0
        }
    }

    firstSegment() {
        this.segmentId = 0
    }

    lastSegment() {
        this.segmentId = this.capsule.segment.length - 1
    }

    showCodeSegment() {
        this.segmentId = this.cpu.CS.id
    }

    showDataSegment() {
        this.segmentId = this.cpu.DS.id
    }

    showDataStackSegment() {
        this.segmentId = this.cpu.TS.id
    }

    showCallStackSegment() {
        this.segmentId = this.cpu.RS.id
    }

    onKeyDown(e) {

        switch(e.code) {
            case 'ArrowUp':
                this.nextSegment(JUMP)
                break;
            case 'ArrowDown':
                this.prevSegment(JUMP)
                break
            case 'ArrowLeft':
                this.prevSegment(1)
                break
            case 'ArrowRight':
                this.nextSegment(1)
                break
            case 'Home': this.firstSegment(); break;
            case 'End': this.lastSegment(); break;
            case 'Insert':
                if (this.segmentId === this.cpu.CS.id) {
                    this.showDataSegment()
                } else if (this.segmentId === this.cpu.DS.id) {
                    this.showDataStackSegment()
                } else if (this.segmentId === this.cpu.TS.id) {
                    this.showCallStackSegment()
                } else {
                    this.showCodeSegment();
                }
                break;
        }
    }

}
