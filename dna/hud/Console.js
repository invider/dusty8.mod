'use strict'

const df = {
    title: 'Console',
    command: '',
    cursor: '_',
    blink: 0.5,
    blinkState: 0,

    x: 0,
    y: 0,
    w: 100,
    h: 100,

    //font: '24px moon',
    //font: '20px pixel-operator-mono8',
    //font: '28px pixel-operator',
    font: '24px coolville',
    pane: '#202020',
    content: '#10c050',
}

function Console(st) {
    this.log = []
    sys.supplement(this, df)
    dna.hud.Pane.call(this, st)
}
Console.prototype = Object.create(dna.hud.Pane.prototype)

Console.prototype.adjust = function() {
    this.w = 512
    this.x = rx(1) - this.w - 20
    this.y = 512 + 40
    this.h = ry(1) - this.y - 20
}

Console.prototype.powerUp = function() {}

Console.prototype.execute = function(command) {
    //log('executing [' + command + ']')
    job.command(command)
    this.log.push('> ' + command)
}

Console.prototype.evo = function(dt) {
    if (!this.focus) return
    this.blinkState -= dt
    if (this.blinkState < 0) {
        this.blinkState = this.blink * 2
    }
}

Console.prototype.drawContent = function() {
    font(this.font)
    fill(this.content)
    alignLeft()
    baseTop()

    const border = 15
    const th = 30

    let y = this.h - th

    let txt = this.command
    if (this.focus && this.blinkState < this.blink) {
        txt += this.cursor
    }

    text('$ ' + txt, border, y)
    y -= th

    let i = this.log.length - 1
    while (y > 0 && i >= 0) {
        text(this.log[i--], border, y)
        y -= th
    }
}

Console.prototype.drawBackground = function() {
    fill(this.pane)
    rect(0, 0, this.w, this.h)
    if (this.focus) {
        lineWidth(2)
        stroke(this.content)
        rect(0, 0, this.w, this.h)
    }
}

Console.prototype.capture = function() {
    lab.hud.release()
    lab.hud.captureFocus(this)
}

Console.prototype.onFocus = function() {
    this.focus = true
    this.blinkState = this.blink*2
}

Console.prototype.onUnfocus = function() {
    this.focus = false
}

Console.prototype.onKeyDown = function(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return
    if (e.key === 'Escape') {
        this.command = ''
    } else if (e.key === 'Backspace') {
        if (this.command.length > 0) {
            this.command = this.command
                .substring(0, this.command.length-1)
        }
    } else if (e.key === 'Enter') {
        this.execute(this.command)
        this.command = ''
    } else if (e.key.length === 1) {
        this.command += e.key
    }
}
