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

        prn('C:' + cpu.C)
        prn('D:' + cpu.D)
        prn('R:' + cpu.R)

        y += HR
        prn('A:' + cpu.A)
        prn('B:' + cpu.B)

        y += HR
        prn('Y:' + cpu.Y)

        x = 150 + B
        y = B + dy + HR
        prn('CS:' + cpu.CS.id)
        prn('DS:' + cpu.DS.id)
        prn('RS:' + cpu.RS.id)

        y += HR
        prn('I:' + cpu.I)


        y += dy + HR
        prn('Q:' + cpu.Q)
    }

    drawBackground() {
        fill('#102510')
        rect(0, 0, this.w, this.h)
    }
}
