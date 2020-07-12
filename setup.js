function setup() {
    const capsule = lab.spawn(dna.dust.Capsule)

    const cpu = lab.spawn(dna.dust.CPU, {
        capsule: capsule,
    })

    const hud = lab.spawn(dna.hud.Hud, {
        name: 'hud'
    })

    const dot64 = lab.hud.spawn(dna.hud.Dot64, {
        capsule: capsule,
    })
    cpu.addDevice(dot64)

    const con = lab.hud.spawn(dna.hud.Console, {
        name: 'con',
        x: 20,
        y: 20,
        w: 200,
        h: 100,
    })
    cpu.addDevice(con)

    const dustyMonitor = lab.hud.spawn(
        dna.hud.DustyMonitor, {
            x: 20,
            y: 20,
            w: 300,
            h: 250,
            cpu: cpu,
        }
    )

    const coreMonitor = lab.hud.spawn(
        dna.hud.CoreMonitor, {
            x: 20,
            y: 300,
            w: 450,
            h: 250,
            cpu: cpu,
            capsule: capsule,
        }
    )

    const coreMonitor2 = lab.hud.spawn(
        dna.hud.CoreMonitor, {
            x: 20,
            y: 570,
            w: 450,
            h: 250,
            cpu: cpu,
            capsule: capsule,
        }
    )

    cpu.powerUp()

    lib.arch.d8(lib.d8.test, capsule)

    cpu.call('subA')
}
