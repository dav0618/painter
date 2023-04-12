

const fatherCell = document.getElementById("father")
let width = 10
let height = 10

let pencolor = "black"
let isntClear = true
let currentPaintCell = "black"
let cpc = "black"
let maxId = width * height
let mouseOn = false
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let multyplayer = 127

function start() {

}

window.addEventListener("keydown", (event) => {
    console.log(event)
    if (event.code == "KeyC") {
        isntClear = !isntClear
        if (!isntClear) {
            document.getElementById(cpc).classList.remove("round3")
            document.getElementById("white").classList.add("round3")
        } else {
            document.getElementById("white").classList.remove("round3")
            document.getElementById(cpc).classList.add("round3")

        }
    }
})

document.getElementById("saveButton").addEventListener("click", function () {
    createLocalStorage(maxId)
})


window.addEventListener("mousedown", function () {
    mouseOn = true
})
window.addEventListener("mouseup", function () {
    mouseOn = false
})

function createPaintArea(width, height) {
    for (let i = 0; i < height; i++) {
        let rowCell = document.createElement("div")
        rowCell.id = "row" + (i + 1)
        rowCell.classList.add("rCell")

        father.appendChild(rowCell)
        for (let j = 0; j < width; j++) {
            let cell = document.createElement("div")
            cell.addEventListener("click", onCellClick)
            cell.addEventListener("mousemove", onCellMove)
            cell.id = i * width + j
            cell.classList.add("cell")
            rowCell.appendChild(cell)
        }
    }
}


if (localStorage.getItem("size")) {
    // debugger
    let sizes = JSON.parse(localStorage.getItem("size"))
    document.getElementById("father").innerHTML = ""

    width = sizes[0]
    height = sizes[1]
    maxId = width * height
    document.getElementById("wSize").value = width
    document.getElementById("hSize").value = height

    createPaintArea(width, height)
    createCanvasArea(width, height)

} else {
    createPaintArea(width, height)
    createCanvasArea(width, height)

}

if (localStorage.getItem("colorData")) {
    // debugger
    let idColor = JSON.parse(localStorage.getItem("colorData"))

    for (let i = 0; i < idColor.length; i++) {
        document.getElementById(idColor[i][0]).style.backgroundColor = idColor[i][1]
    }
}

if (localStorage.getItem("colors")) {
    // debugger
    let colors = JSON.parse(localStorage.getItem("colors"))

    for (let i = 0; i < colors.length; i++) {
        let idNumber = document.getElementById("paintBar").childElementCount
        let row = document.getElementById("paintRow" + idNumber)
        if (row.childElementCount <= 5) {
            let newColorCells = document.createElement("div")
            newColorCells.classList.add("paintBarCell")
            newColorCells.id = colors[i]
            newColorCells.style.backgroundColor = colors[i]
            newColorCells.addEventListener("click", onColorClick)
            if (row.childElementCount == 5) {
                idNumber++
                row = document.createElement("div")
                row.id = "paintRow" + idNumber
                row.classList.add("paintBarRow")
                document.getElementById("paintBar").appendChild(row)
            }
            row.appendChild(newColorCells)

        }
    }
}

if (localStorage.getItem("backgrColor")) {
    // debugger
    document.getElementById("backColor").value = localStorage.getItem("backgrColor")
    fatherCell.style.backgroundColor = document.getElementById("backColor").value
}




function onCellClick(event) {
    if (isntClear) {

        event.target.style.backgroundColor = pencolor

    } else if (!isntClear) {

        event.target.style.backgroundColor = ""
    }

}

function onCellMove(event) {
    if (isntClear) {
        if (mouseOn) {
            event.target.style.backgroundColor = pencolor
        }
    } else if (!isntClear) {
        if (mouseOn) {
            event.target.style.backgroundColor = ""
        }
    }
}



function markCurrentColor(event) {
    document.getElementById("white").classList.remove("round3")
    document.getElementById(currentPaintCell).classList.remove("round3")


    currentPaintCell = event.target.id

    event.target.classList.add("round3")
}


function onColorClick(event) {
    // debugger
    markCurrentColor(event)
    cpc = currentPaintCell
    let color = event.target.style.backgroundColor
    pencolor = color
    if (!isntClear) {
        isntClear = !isntClear
    }
}

let addedColors = []
if (localStorage.getItem("colors")) {
    // debugger
    let colors = JSON.parse(localStorage.getItem("colors"))
    for (let i = 0; i < colors.length; i++) {
        addedColors.push(colors[i])
    }
}

document.getElementById("submitColor").addEventListener("click", function () {
    // debugger
    let color = document.getElementById("fname").value
    addedColors.push(color)
    let idNumber = document.getElementById("paintBar").childElementCount
    let row = document.getElementById("paintRow" + idNumber)
    if (row.childElementCount <= 5) {
        let newColorCells = document.createElement("div")
        newColorCells.classList.add("paintBarCell")
        newColorCells.id = color
        newColorCells.style.backgroundColor = color
        newColorCells.addEventListener("click", onColorClick)
        if (row.childElementCount == 5) {
            idNumber++
            row = document.createElement("div")
            row.id = "paintRow" + idNumber
            row.classList.add("paintBarRow")
            document.getElementById("paintBar").appendChild(row)
        }
        row.appendChild(newColorCells)
    }

    document.getElementById("fname").value = ""
})

document.getElementById("submitSize").addEventListener("click", function () {
    // debugger
    localStorage.clear("colorData")
    localStorage.clear("size")
    document.getElementById("father").innerHTML = ""
    width = parseInt(document.getElementById("wSize").value)
    height = parseInt(document.getElementById("hSize").value)
    maxId = width * height

    createPaintArea(width, height)
    createCanvasArea(width, height)

})


function createLocalStorage(maxId) {
    // debugger
    let blockSize = [width, height]
    let idColors = []

    for (let i = 0; i < maxId; i++) {
        let j = i.toString()
        console.log("j", j)
        let g = document.getElementById(j).style.backgroundColor
        if (g) {
            idColors.push([j, g])
        }
    }

    localStorage.setItem("colors", JSON.stringify(addedColors))
    localStorage.setItem("size", JSON.stringify(blockSize))
    localStorage.setItem("colorData", JSON.stringify(idColors))
    localStorage.setItem("backgrColor", document.getElementById("backColor").value)

}

window.addEventListener("keydown", (event) => {
    if (event.code == "KeyS") {
        // debugger
        fillCanvasArea()
        document.getElementById("canvasFather").style.visibility = "visible"
    }
})


function fillCanvasArea() {
    for (let i = 0; i < width * height; i++) {
        // debugger
        let j = i * multyplayer
        let idColor = document.getElementById(i.toString()).style.backgroundColor
        let y = (Math.floor(j / (width * multyplayer))) * multyplayer
        let x = j - (y * width)


        ctx.fillStyle = idColor ? idColor : document.getElementById("backColor").value
        ctx.fillRect(x, y, multyplayer, multyplayer)
    }
}



function paintBackgroundColor(event) {
    fatherCell.style.backgroundColor = event.target.value
}

function createCanvasArea(width, height) {
    document.getElementById("canvasFather").style.width = width * 25 + "px"
    document.getElementById("canvasFather").style.height = height * 25 + "px"


    canvas.style.width = width * 25 + "px"
    canvas.style.height = height * 25 + "px"
    canvas.width = width * multyplayer
    canvas.height = height * multyplayer

}


function downloadImage() {
    fillCanvasArea()
    const link = document.createElement('a');
    link.setAttribute('download', 'masterpiece.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}