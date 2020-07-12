class DustyMonitor extends dna.hud.Container {

    constructor(st) {
        super(st)
    }

    drawContent() {
        font('18px mono')
        alignLeft()
        baseTop()
        fill(env.style.content)

        const B = 10
        const HR = 20
        let x = B
        let y = B
        let dy = 25

        const cpu = this.cpu

        function prn(txt) {
            text(txt, x, y)
            y += dy
        }

        prn(cpu.name.toUpperCase()
            + ' ['
            + (cpu.FS? '.':'*')
            + ']')
        y += HR

        prn('A:' + cpu.A)
        prn('B:' + cpu.B)

        y += HR
        prn('C:' + cpu.C)
        prn('T:' + cpu.T)
        prn('R:' + cpu.R)


        y += HR
        prn('Y:' + cpu.Y)

        x = 150 + B
        y = B + dy + HR

        prn('X:' + cpu.X)

        y += HR
        prn('CS:' + cpu.CS.id)
        prn('DS:' + cpu.DS.id)
        prn('TS:' + cpu.DS.id)
        prn('RS:' + cpu.RS.id)


        y += HR
        prn('Q:' + cpu.Q)
    }

    drawBackground() {
        fill('#102510')
        rect(0, 0, this.w, this.h)
    }
}
