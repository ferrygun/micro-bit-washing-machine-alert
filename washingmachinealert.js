let washcycle = 0
let now1 = 0
let now = 0
let Xold = 0
let Yold = 0
let movement = false
let Xthreshold = 0
let Zold = 0
let Ythreshold = 0
let Zthreshold = 0
let timetostop = 0
let Ymovement = 0
let timetoend = 0
let Xmovement = 0
let timetostart = 0
let Zmovement = 0
let advertise = 0
input.onButtonPressed(Button.A, () => {
    control.reset()
})
bluetooth.onBluetoothConnected(() => {

})
bluetooth.onBluetoothDisconnected(() => {

})
basic.forever(() => {
    Zmovement = input.acceleration(Dimension.Z)
    Xmovement = input.acceleration(Dimension.X)
    Ymovement = input.acceleration(Dimension.Y)
    if (Zmovement != Zold) {
        if (Zmovement < Zold - Zthreshold || Zmovement > Zold + Zthreshold) {
            Zold = Zmovement
            movement = true
            basic.showLeds(`
                . . . . #
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        }
    }
    if (Ymovement != Yold) {
        if (Ymovement < Yold - Ythreshold || Ymovement > Yold + Ythreshold) {
            Yold = Ymovement
            movement = true
            basic.showLeds(`
                . . # . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        }
    }
    if (Xmovement != Xold) {
        if (Xmovement < Xold - Xthreshold || Xmovement > Xold + Xthreshold) {
            Xold = Xmovement
            movement = true
            basic.showLeds(`
                # . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        }
    }
    if (movement) {
        movement = false
        now1 = input.runningTime()
        if (now1 > now + timetostart) {
            if (washcycle == 0) {
                washcycle = 1 // cycle started
            }
        }
    } else {
        now = input.runningTime()
        if (now > now1 + timetoend) {
            if (washcycle == 1) {
                washcycle = 2 //cycle ended
            }
        }
        if (washcycle == 2) {
            if (now > now1 + timetostop) {
                washcycle = 0 // reset cycle
                bluetooth.stopAdvertising()
                advertise = 0
                basic.clearScreen()
            }
        }
    }
    basic.pause(500)
    basic.clearScreen()
    if (washcycle == 1) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        if (advertise == 0) {
            advertise = 1
            bluetooth.advertiseUrl(
                "https://makecode.com",
                7,
                false
            )
        }
    }
    if (washcycle == 2) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . #
            `)
    }
})
advertise = 0
timetostart = 5000 // threshold when the cycle will start
timetoend = 8 * 1000 * 60 //threshold when the cycle will stop
timetostop = 1 * 1000 * 60 /// threshold when to reset to initial stage
Zthreshold = 18
Ythreshold = 18
Xthreshold = 18

