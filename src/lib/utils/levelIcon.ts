export function getLevelIcon(level: number): string {
    return `/static/levels/${level}.png`
}

export function getWCAGMasterIcon(level: number): string {
    return `/static/WCAGMaster/${level}.png`
}

export function getLevelColor(level: number): string {
    if (level <= 5) {
        return '#74C8DE'
    } else if (level <= 7) {
        return '#5DABFF'
    } else if (level <= 9) {
        return '#6583FF'
    } else if (level <= 19) {
        return '#53BE78'
    } else if (level <= 29) {
        return '#26A69A'
    } else if (level <= 39) {
        return '#A088E4'
    } else if (level <= 49) {
        return '#D66AD3'
    } else if (level <= 59) {
        return '#D1D66B'
    } else if (level <= 69) {
        return '#C99646'
    } else if (level <= 79) {
        return '#FF700B'
    } else if (level <= 89) {
        return '#DE1848'
    } else if (level <= 99) {
        return '#187DDE'
    } else {
        return '#FFDE94'
    }
}
