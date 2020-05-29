function hexColor(i) {
    i = i? i : 0
    let h = i.toString(16)
    while(h.length < 6) {
        h = '0' + h
    }
    return h
}
