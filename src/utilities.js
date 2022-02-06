

export function weatherPipe(value, unit = "C°") {

    return Math.ceil(value) + " " + unit

}

export function percentagePipe(value) {
    return value + " %"
}

export function metricPipe(value) {
    if (value >= 1000) {
        let x = value / 1000
        return x + " Km"
    }
    return value
}

export function getMainPollutant(componentsObject) {
    let pollutant = null
    let concentration = 0

    for (let PL in componentsObject) {
        if (componentsObject[PL] > concentration) {
            pollutant = PL
            concentration = componentsObject[PL]
        }
    }
    return {
        pollutant: pollutant.replace("_", ".").toUpperCase(),
        concentration
    }
}

export function windSpeedmetricPipe(value) {
    let kmhValue = (value * 60 * 60) / 1000
    if (kmhValue >= 1) {

        return Math.floor(kmhValue) + " Km/h"
    }
    return Math.floor(value) + " m/s"
}

export function windStrengthPipe(value) {
    let kmhValue = (value * 60 * 60) / 1000

    if (kmhValue >= 118) {
        return "Hurricane force"
    }
    else if (kmhValue >= 103) { return "Violent storm" }
    else if (kmhValue >= 89) { return "Storm" }
    else if (kmhValue >= 75) { return "severe gale" }
    else if (kmhValue >= 62) { return "fresh gale" }
    else if (kmhValue >= 50) { return "High wind" }
    else if (kmhValue >= 39) { return "Strong breeze" }
    else if (kmhValue >= 29) { return "Fresh breeze" }
    else if (kmhValue >= 20) { return "Moderate breeze" }
    else if (kmhValue >= 12) { return "Gentle breeze" }
    else if (kmhValue >= 6) { return "Light breeze" }
    else if (kmhValue >= 2) { return "Light air" }
    else { return "Calm wind" }

}

export function getWindDirection(degree) {

    if (degree == 0) {
        return "No Wind Direction"
    }

    let desiredDirection = null
    let spaceBetweenValues = 1000
    let directions = {
        East: 90,
        South: 180,
        West: 270,
        North: 360
    }

    for (let direction in directions) {
        let value = Math.abs(degree - directions[direction])

        if (value < spaceBetweenValues) {
            desiredDirection = direction;
            spaceBetweenValues = value
        }

    }

    return desiredDirection + " Wind"

}

export function UnixToDate(unixTimeStamp) {

    return new Date(unixTimeStamp * 1000)
}

export function UVIriskPipe(value) {
    let x = parseInt(value)
    console.log(x);

    if (x > 11) { return "Extreme" }
    else if (x > 8) { return "Very High" }
    else if (x > 6) { return "High" }
    else if (x > 3) { return "Moderate" }
    else if (x > 1) { return "Low" }
    else { return "Minimal" }
}

export function UpperCasePipe(value) {
    return value.toUpperCase()
}


