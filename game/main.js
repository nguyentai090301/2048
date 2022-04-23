const numRow = 4, numCol = 4, maxNumWhenInit = 2

const UP = 1, DOWN = 2, RIGHT = 3, LEFT = 4
let Game = {
    table: [],
    tableEl: null,
    isPlaying: false,
    setEl: function (id) {
        let el = $(`#${id}`)
        if (!el) {
            alert('ABC')
            return
        }
        this.tableEl = el
    },
    renderTable: function () {
        this.tableEl.html('')
        let html = ''
        this.table.map((r, i) => {
            html += `<tr class="row-${i}">`
            r.map((c, j) => {
                html += `<td class="col-${i}-${j} cell-${c}">${c==0?"":c}</td>`
            })
            html += '</tr>'
        })
        this.tableEl.html(html)
    },
    initTable: function () {
        for (let i = 0; i < numRow; i++) {
            this.table[i] = []
            for (let j = 0; j < numCol; j++){
                this.table[i][j] = 0
            }
        }
        this.table = this.addRandom(this.table, 2)
    },
    start: function () {
        this.isPlaying = true
        this.initTable()
        this.renderTable()
    },
    move: function (direction) {
        let preArr = JSON.stringify(this.table)
        switch (direction) {
            case UP:
                this.table = this.moveUp(this.table)
                break
            case DOWN:
                this.table = this.moveDown(this.table)
                break
            case RIGHT:
                this.table = this.moveRight(this.table)
                break
            case LEFT:
                this.table = this.moveLeft(this.table)
                break
            default: return
        }
        let afterArr = JSON.stringify(this.table)
        if(preArr!=afterArr){
            this.table = this.addRandom(this.table)
            this.renderTable();
        }
        else{
            if(getZerosNumber(this.table).length == 0){
                if(JSON.stringify(this.table)==JSON.stringify(this.moveLeft(this.table)))
                    if(JSON.stringify(this.table)==JSON.stringify(this.moveUp(this.table)))
                        window.alert("Game over!!!")
            }
        }
        
    },
    addRandom: function(game_arr, numElement){
        let idZeros = getZerosNumber(game_arr);
        if(!numElement){
            numElement = takeNumberByPercent(1, 2, 80)
        }
        while(numElement>0){
            idRandom = getRandomInt(idZeros.length)
            game_arr[idZeros[idRandom][0]][idZeros[idRandom][1]] = takeNumberByPercent(2, 4, 80)
            numElement-=1
        }
        return game_arr
    },
    moveUp: function (game_arr) {
        for(let index_c = 0; index_c  < numCol; index_c++){
            let col = new Array();
            for(let index_r = 0; index_r < numCol; index_r++){
                col.push(game_arr[index_r][index_c])
            }
            col = merge(col)
            for(let index_r = 0; index_r < numCol; index_r++){
                game_arr[index_r][index_c] = col[index_r]
            }
        }
        return game_arr
    },
    moveDown: function (game_arr) {
        for(let index_c = 0; index_c  < numCol; index_c ++){
            let col = new Array();
            for(let index_r = 0; index_r < numCol; index_r++){
                col.push(game_arr[index_r][index_c])
    
            }
            col = merge(col.reverse()).reverse()
            for(let index_r = 0; index_r < numCol; index_r++){
                game_arr[index_r][index_c] = col[index_r]
            }
        }
        return game_arr
    },
    moveRight: function (game_arr) {
        return game_arr.map((ele) => {
            ele = merge(ele.reverse()).reverse();
            return ele
        })
    },
    moveLeft: function (game_arr) {
        return game_arr.map((ele) => {
            ele = merge(ele);
            return ele
        })
    },
}

function gather(game_arr)
{
    //gather
    for(let i = 0; i< numCol; i++)
    {
        for(let j = i;j>=0;j--)
        {
            if (game_arr[j]!= 0&& game_arr[j-1]==0)
            {     
                game_arr[j-1] = game_arr[j];
                game_arr[j] = 0;
            }
        }
    }
    return game_arr;
}
function merge  (game_arr)
{    
    game_arr = gather(game_arr)
    //Merge
    let index = 0;
    while(index <numCol-1)
    {
        if(game_arr[index]==game_arr[index +1])
        {
            game_arr[index] += game_arr[index + 1]
            game_arr[index+1] = 0   
            index +=1;
        }
        index +=1;
    }
    game_arr = gather(game_arr)
    return game_arr;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getZerosNumber(game_arr){
    var zerosNumber=new Array();
    for(let row = 0; row< numRow; row++){
        for(let col = 0; col <numCol; col++){
            if (game_arr[row][col]== 0){
                zerosNumber.push([row, col])
            }
        }
    }
    return zerosNumber
}
function takeNumberByPercent(num1, num2, percent){
    return getRandomInt(100) + 1 > percent ? num2 : num1
}
function loadAudio()
{			
    var audioObj = document.createElement('audio');
    audioObj.setAttribute('id', 'id-audio');
    
    var sourceObj = document.createElement('source');
    sourceObj.setAttribute('type', 'audio/ogg');
    sourceObj.setAttribute('src',  'sfx_theme_menu_intro.ogg');

    audioObj.appendChild(sourceObj);
    
    document.getElementById('id-stdio').appendChild(audioObj);
    document.getElementById('id-audio').load();
}

function playAudio_1()
{
    var audioObj = document.getElementById('id-audio');
    audioObj.play();
}