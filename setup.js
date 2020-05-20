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


    cpu.powerUp()

    lib.arch.d8(lib.d8.test, capsule)

    cpu.call('subA')
}
