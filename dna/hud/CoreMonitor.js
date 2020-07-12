const JUMP = 8

class CoreMonitor extends dna.hud.Container {

    constructor(st) {
        super(st)
        this.segmentId = 0
    }

    drawData(seg) {
        const S = 8
        const bx = 10
        const by = 40
        const dx = 50
        const dy = 25

        let p = 0
        for (let i = 0; i < S; i++) {
            for (let j = 0; j < S; j++) {
                const v = seg.mem[i*S + j]
                const t = v? v : '.'
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

    codeSegment() {
        this.segmentId = this.cpu.CS.id
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
            case 'Insert': this.codeSegment(); break;
        }
    }

}
