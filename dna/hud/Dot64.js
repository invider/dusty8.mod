const W = 64
const H = 64

function Dot64(st) {
    this.x = 0
    this.y = 0
    this.w = 256
    this.h = 256
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
    this.capsule.addSegment(new Segment(Segment.PAL, 'palette'))

    // create video memory segments
    let vid = 0
    for (let sy = 0; sy < this.sh; sy++) {
        for (let sx = 0; sx < this.sw; sx++) {
            this.capsule.addSegment(
                new Segment(Segment.TILE, 'vid' + vid++)
            )
        }
    }

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

    // render grid data
    const idata = this.bufContext.getImageData(0, 0, W, H)

    for (let gy = 0; gy < H; gy++) {
        for (let gx = 0; gx < W; gx++) {
            //const t = this.space.get(this.gx + gx, this.gy + gy)

            let sh = (gy*W + gx) * 4
            idata.data[sh++] = RND(255)
            idata.data[sh++] = RND(255)
            idata.data[sh++] = RND(255)
            idata.data[sh] = 255
            /*
            if (!t || t.type === this.space.token.NIL) {
                idata.data[sh++] = 0
                idata.data[sh++] = 0
                idata.data[sh++] = 0
                idata.data[sh] = 255
            } else if (t.type === this.space.token.DOT) {
                idata.data[sh++] = t.r
                idata.data[sh++] = t.g
                idata.data[sh++] = t.b
                idata.data[sh] = 255

            } else {
                idata.data[sh++] = 255
                idata.data[sh++] = 255
                idata.data[sh++] = 255
                idata.data[sh] = 255

            }
            */
        }
    }
    this.bufContext.putImageData(idata, 0, 0)

    blocky()
    image(this.bufCanvas, 0, 0, this.w, this.h)

    if (this.showPort) {
        // highlight the port to the ghost view
        const ds = this.w / this.gw
        const vpx = this.ghostView.gx - this.gx
        const vpy = this.ghostView.gy - this.gy
        this.dotSize = ds

        stroke(.1, 1, 1)
        lineWidth(2)

        const x = max(vpx*ds, 2)
        const y = max(vpy*ds, 2)
        const w = min(this.ghostView.gw * ds, this.w-x-2)
        const h = min(this.ghostView.gh * ds, this.h-y-2)
        rect(x, y, w, h)
    }

    stroke(.1, .5, .5)
    lineWidth(2)
    rect(0, 0, this.w, this.h)

    restore()
}

Dot64.prototype.onClick = function(x, y, e) {
    const gx = this.ghostX(x)
    const gy = this.ghostY(y)
    this.ghostView.centerAt(gx, gy)
}
