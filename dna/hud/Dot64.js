const W = 64
const H = 64

function Dot64(st) {
    this.x = 0
    this.y = 0
    this.w = 512
    this.h = 512
    augment(this, st)

    /*
    const view = this
    this.space.onReplot = chain(this.space.onReplot, function() {
        view.gx = 0
        view.gy = 0
        view.gw = this.w
        view.gh = this.h
        view.createBuffer()
    })
    this.createBuffer()
    */

    /*
    this.bufContext.fillStyle = '#209050'
    this.bufContext.fillRect(0, 0, 10, 10)

    this.bufContext.strokeStyle = '#814050'
    this.bufContext.beginPath()
    this.bufContext.moveTo(0, 0)
    this.bufContext.lineTo(48, 48)
    this.bufContext.stroke()
    */
}

Dot64.prototype.powerUp = function() {
    const Segment = dna.dust.Segment
    this.sw = ceil(W/Segment.SIDE)
    this.sh = ceil(H/Segment.SIDE)

    // create palette segment
    this.pal = this.capsule.addSegment(new Segment(Segment.PAL, 'palette'))
    this.pal.mem[0] = 0x000000
    this.pal.mem[1] = 0xffffff
    this.pal.mem[2] = 0xff0000
    this.pal.mem[3] = 0x00ff00
    this.pal.mem[4] = 0x0000ff
    this.pal.mem[5] = 0xff00ff
    this.pal.mem[6] = 0x00ffff
    this.pal.mem[6] = 0xffff00
    this.pal.mem[7] = 0x808080

    // create video memory segments
    let vid = 0
    for (let sy = 0; sy < this.sh; sy++) {
        for (let sx = 0; sx < this.sw; sx++) {
            const seg = this.capsule.addSegment(
                new Segment(Segment.TILE, 'vid' + vid++)
            )
            if (!this.seg) this.seg = seg
        }
    }

    this.seg.mem[0] = 1
    this.seg.mem[7] = 2
    this.seg.mem[56] = 3
    this.seg.mem[63] = 4

    this.createBuffer()
    this.x = rx(1) - this.w - 20
    this.y = 20
}

Dot64.prototype.createBuffer = function() {
    this.bufCanvas = document.createElement('canvas')
    this.bufCanvas.width = W
    this.bufCanvas.height = H
    this.bufContext = this.bufCanvas.getContext('2d')
}

Dot64.prototype.ghostX = function(x) {
    return floor(x/this.w/W)
}

Dot64.prototype.ghostY = function(y) {
    return floor(y/this.h/H)
}

Dot64.prototype.viewX = function(gx) {
    return gx * this.w/W
}

Dot64.prototype.viewY = function(gy) {
    return gy * thsi.h/H
}

Dot64.prototype.draw = function() {
    save()
    translate(this.x, this.y)

    // frame
    stroke(.1, .5, .5)
    lineWidth(2)
    rect(0, 0, this.w, this.h)

    // render grid data
    const idata = this.bufContext.getImageData(0, 0, W, H)

    /*
    for (let gy = 0; gy < H; gy++) {
        for (let gx = 0; gx < W; gx++) {
            //const t = this.space.get(this.gx + gx, this.gy + gy)

            let sh = (gy*W + gx) * 4
            idata.data[sh++] = RND(255)
            idata.data[sh++] = RND(255)
            idata.data[sh++] = RND(255)
            idata.data[sh] = 255
        }
    }
    */

    const Segment = dna.dust.Segment
    let vsegmentShift = this.seg.id
    const nextLineShift = (W-Segment.SIDE) * 4

    for (let sy = 0; sy < this.sh; sy++) {
        for (let sx = 0; sx < this.sw; sx++) {
            const baseX = sx * Segment.SIDE
            const baseY = sy * Segment.SIDE
            const seg = this.capsule.segmentAt( vsegmentShift++ )

            let sh = (baseY * W + baseX) * 4
            let column = 0
            for (let i = 0; i < Segment.LENGTH; i++) {
                const icolor = seg.mem[i]
                const color = this.pal.mem[icolor] || 0

                if (column >= Segment.SIDE) {
                    sh += nextLineShift
                    column = 0
                }

                idata.data[sh++] = (color & 0xff0000) >> 16
                idata.data[sh++] = (color & 0xff00) >> 8
                idata.data[sh++] = (color & 0xff)
                idata.data[sh++] = 255

                column ++
            }
        }
    }
    this.bufContext.putImageData(idata, 0, 0)

    blocky()
    image(this.bufCanvas, 0, 0, this.w, this.h)

    restore()
}

Dot64.prototype.onClick = function(x, y, e) {
    const gx = this.ghostX(x)
    const gy = this.ghostY(y)
    this.ghostView.centerAt(gx, gy)
}
