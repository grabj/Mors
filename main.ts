let wyraz = ""
let znak = ""
let szukana = ""
let dlugoscSygnalu = 0
let litera = ""
let listaA: string[] = []
let listaM: string[] = []
listaM = [".-", "-...", "-.-.", "-..", ".", ".._.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", ".-.", "...", "-", "..-", ".--", "-.--", "--.."]
listaA = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "W", "Y", "Z"]
sensors.color4.setThreshold(Light.Bright, 90)
sensors.color4.setThreshold(Light.Dark, 25)
brick.showImage(images.expressionsZzz)
forever(function () {
    console.sendToScreen()
})
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    Menu()
})
function Menu() {
    while (true) {
        brick.clearScreen()
        brick.showString("Wybierz opcje:", 2)
        brick.showString("<: Przekaz sygnal", 4)
        brick.showString(">: Wyswietl alfabet", 5)
        if (brick.buttonLeft.isPressed()) {
            OdczytKodu()
            break;
        }
        if (brick.buttonRight.isPressed()) {
            WypiszAlfabet()
            break;
        }
    }
}
function WypiszAlfabet() {
    brick.clearScreen()
    console.log("Alfabet Morse'a:")
    for (let i = 0; i <= listaM.length - 1; i++) {
        console.log("" + listaA[i] + ": " + listaM[i])
    }
}
function OdczytKodu() {
    brick.clearScreen()
    console.log("Swiec latarka w sensor swiatla poslugujac sie alfabetem Morse'a.")
    while (true) {
        while (true) {
            console.log("Trzymaj sensor dotyku w trakcie przesylu ostatniego sygnalu, by zakonczyc przesylanie.")
            while (true) {
                console.log("Oczekiwanie na sygnal...")
                OdczytSygnalu()
                szukana = "" + szukana + znak
                pause(500)
                if (sensors.touch3.isPressed()) {
                    break;
                }
            }
            console.log(szukana)
            SzukajLitery()
            szukana = ""
            if (litera == "") {
                console.log("Nie rozpoznano litery")
            } else {
                wyraz = "" + wyraz + litera + " "
                console.log("Podane litery: " + wyraz)
                litera = ""
            }
            console.log("By przeslac kolejna litere nacisnij sensor dotyku")
            sensors.touch3.pauseUntil(ButtonEvent.Pressed)
        }
    }
}
function OdczytSygnalu() {
    sensors.color4.pauseUntilLightDetected(LightIntensityMode.Ambient, Light.Bright)
    control.timer1.reset()
    sensors.color4.pauseUntilLightDetected(LightIntensityMode.Ambient, Light.Dark)
    dlugoscSygnalu = control.timer1.seconds()
    if (dlugoscSygnalu <= 2 && dlugoscSygnalu > 0) {
        znak = "."
        console.log(znak)
    } else if (dlugoscSygnalu > 2 && dlugoscSygnalu < 6) {
        znak = "-"
        console.log(znak)
    } else {
        console.log("Nie rozpoznano sygnalu")
        znak = ""
    }
}
function SzukajLitery() {
    for (let j = 0; j <= listaM.length - 1; j++) {
        if (szukana == listaM[j]) {
            litera = listaA[j]
        }
    }
}
