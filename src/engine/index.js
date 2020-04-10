function createDivisionProblems(b, f, bt, count) {
    const parse = v => +v
    b = parse(b)
    const numberRange = []
    for (let k = 1; k < f; k++) {
        if (k % b === 0) {
            numberRange.push(k)
        }
    }
    debugger;
    const { from, to } = { from: parse(bt[0]), to: parse(bt[1]) }
    const filteredRange = numberRange.filter(n => n >= from && n <= to)
    const r = []

    for (let k = 0; k < filteredRange.length; k++) {
        let v = randomNumberFromRange(filteredRange, filteredRange.length)
        if (v) r.push(v)
    }
    count = parse(count)
    return r.splice(0, count).map(n => `${n}/${b}`)
    function randomNumberFromRange(range, count) {
        let index = Math.floor(Math.random() * count)
        return range[index]
    }
}

function generateQuestions({ timeTables, end, selectionRange, select }) {

    timeTables = timeTables || [3, 5, 6, 7, 8, 9, 12]
    end = end || 999
    selectionRange = selectionRange || [50, 999]
    select = select || 5
    const arr = []
    for (let t of timeTables) {
        let r = createDivisionProblems(t, end, selectionRange, select)
        if (r) arr.push(r)
    }
    const result = arr.flat()
    return result
}

export default generateQuestions
