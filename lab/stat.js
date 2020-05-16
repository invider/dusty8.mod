function draw() {
    if (!lab.cpu1) return

    fill('#909020')
    font('32px moon')
    alignLeft()
    baseTop()
    text('#' + lab.cpu1.cycles, 20, 20)
}
