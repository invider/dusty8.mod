function setup() {

    const capsule = lab.spawn(dna.dust.Capsule)

    const cpu = lab.spawn(dna.dust.CPU, {
        capsule: capsule,
    })

}
