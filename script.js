// not colapsed image
const IMAGE_NOTHING = "img/nothing.png";

// no state left error
const STATE_ERROR = "ERROR";

// basic states
const STATE_BLANK = "blank";
const STATE_ALL = "all";
const STATE_FORK = "fork";
const STATE_CORNER = "corner";
const STATE_END = "end";
const STATE_STRAIGHT = "straight";

// transition states
const STATE_BLANK_T = "blank_t";
const STATE_END_T = "end_t";
const STATE_STRAIGHT_T = "straight_t";

// extra states
const STATE_BLANK_2 = "blank_2";
const STATE_ALL_2 = "all_2";
const STATE_FORK_2 = "fork_2";
const STATE_CORNER_2 = "corner_2";
const STATE_END_2 = "end_2";
const STATE_STRAIGHT_2 = "straight_2";

// map states to images
const STATE_IMAGES_DICT = {
    [STATE_ERROR]: "img/error.png",

    [STATE_BLANK]: "img/blank.png",
    [STATE_ALL]: "img/all.png",
    [STATE_FORK]: "img/fork.png",
    [STATE_CORNER]: "img/corner.png",
    [STATE_END]: "img/end.png",
    [STATE_STRAIGHT]: "img/straight.png",

    [STATE_BLANK_T]: "img/blank_t.png",
    [STATE_END_T]: "img/end_t.png",
    [STATE_STRAIGHT_T]: "img/straight_t.png",

    [STATE_BLANK_2]: "img/blank_2.png",
    [STATE_ALL_2]: "img/all_2.png",
    [STATE_FORK_2]: "img/fork_2.png",
    [STATE_CORNER_2]: "img/corner_2.png",
    [STATE_END_2]: "img/end_2.png",
    [STATE_STRAIGHT_2]: "img/straight_2.png",
}

// map states to connections (each side's connections should be written left to right, in relative perspective)
const BASE_CONNECTIONS_DICT = {
    [STATE_BLANK]: {
        up: ["1_0", "1_0", "1_0"],
        down: ["1_0", "1_0", "1_0"],
        left: ["1_0", "1_0", "1_0"],
        right: ["1_0", "1_0", "1_0"],
    },
    [STATE_ALL]: {
        up: ["1_0", "1_1", "1_0"],
        down: ["1_0", "1_1", "1_0"],
        left: ["1_0", "1_1", "1_0"],
        right: ["1_0", "1_1", "1_0"],
    },
    [STATE_FORK]: {
        up: ["1_0", "1_1", "1_0"],
        down: ["1_0", "1_0", "1_0"],
        left: ["1_0", "1_1", "1_0"],
        right: ["1_0", "1_1", "1_0"],
    },
    [STATE_CORNER]: {
        up: ["1_0", "1_1", "1_0"],
        down: ["1_0", "1_0", "1_0"],
        left: ["1_0", "1_1", "1_0"],
        right: ["1_0", "1_0", "1_0"],
    },
    [STATE_END]: {
        up: ["1_0", "1_1", "1_0"],
        down: ["1_0", "1_0", "1_0"],
        left: ["1_0", "1_0", "1_0"],
        right: ["1_0", "1_0", "1_0"],
    },
    [STATE_STRAIGHT]: {
        up: ["1_0", "1_1", "1_0"],
        down: ["1_0", "1_1", "1_0"],
        left: ["1_0", "1_0", "1_0"],
        right: ["1_0", "1_0", "1_0"],
    },

    [STATE_BLANK_T]: {
        up: ["1_0", "1_0", "1_0"],
        down: ["2_0", "2_0", "2_0"],
        left: ["0.5/2_0", "0.5/0.5_0", "0.5/1_0"],
        right: ["0.5/1_0", "0.5/0.5_0", "0.5/2_0"],
    },
    [STATE_END_T]: {
        up: ["1_1", "1_1", "1_1"],
        down: ["2_0", "2_0", "2_0"],
        left: ["0.5/2_0", "0.5/0.5_0", "0.5/1_0"],
        right: ["0.5/1_0", "0.5/0.5_0", "0.5/2_0"],
    },
    [STATE_STRAIGHT_T]: {
        up: ["1_1", "1_1", "1_1"],
        down: ["2_1", "2_1", "2_1"],
        left: ["0.5/2_0", "0.5/0.5_0", "0.5/1_0"],
        right: ["0.5/1_0", "0.5/0.5_0", "0.5/2_0"],
    },

    [STATE_BLANK_2]: {
        up: ["2_0", "2_0", "2_0"],
        down: ["2_0", "2_0", "2_0"],
        left: ["2_0", "2_0", "2_0"],
        right: ["2_0", "2_0", "2_0"],
    },
    [STATE_ALL_2]: {
        up: ["2_1", "2_1", "2_1"],
        down: ["2_1", "2_1", "2_1"],
        left: ["2_1", "2_1", "2_1"],
        right: ["2_1", "2_1", "2_1"],
    },
    [STATE_FORK_2]: {
        up: ["2_1", "2_1", "2_1"],
        down: ["2_0", "2_0", "2_0"],
        left: ["2_1", "2_1", "2_1"],
        right: ["2_1", "2_1", "2_1"],
    },
    [STATE_CORNER_2]: {
        up: ["2_1", "2_1", "2_1"],
        down: ["2_0", "2_0", "2_0"],
        left: ["2_1", "2_1", "2_1"],
        right: ["2_0", "2_0", "2_0"],
    },
    [STATE_END_2]: {
        up: ["2_1", "2_1", "2_1"],
        down: ["2_0", "2_0", "2_0"],
        left: ["2_0", "2_0", "2_0"],
        right: ["2_0", "2_0", "2_0"],
    },
    [STATE_STRAIGHT_2]: {
        up: ["2_1", "2_1", "2_1"],
        down: ["2_1", "2_1", "2_1"],
        left: ["2_0", "2_0", "2_0"],
        right: ["2_0", "2_0", "2_0"],
    },
}

// list of usable states, for rotation
const BASE_STATES = [
    STATE_BLANK,
    STATE_ALL,
    STATE_FORK,
    STATE_CORNER,
    STATE_END,
    STATE_STRAIGHT,

    STATE_BLANK_T,
    STATE_END_T,
    STATE_STRAIGHT_T,

    STATE_BLANK_2,
    STATE_ALL_2,
    STATE_FORK_2,
    STATE_CORNER_2,
    STATE_END_2,
    STATE_STRAIGHT_2,
];

// map states to connections, autogenerated with rotations
const CONNECTIONS_DICT = {};

// all existing states, including rotation
const EXISTING_STATES = {};
// the board
const BOARD = [];
// all usable state names for cells at the begining
const USED_STATES = [];


var SIZE = 20;
var DELAY = 10;


const sleep = time => new Promise(res => setTimeout(res, time));

function mod(num, mod)
{
    return ((num % mod) + mod) % mod;
}

$(async function()
{
    // events
    $(window).on("resize", resizeBoard);
    // general setup
    resizeBoard();
    biuldRotatedStates();
    buildStateController();
    // board setup
    rebuildUsedStates();
    populateBoard();
});

function resizeBoard(evt)
{
    console.log($("#board").width());
    $("#board").height($("#board").width());
}

function biuldRotatedStates()
{
    Object.keys(EXISTING_STATES).forEach(key => delete EXISTING_STATES[key]);
    Object.keys(CONNECTIONS_DICT).forEach(key => delete CONNECTIONS_DICT[key]);
    BASE_STATES.forEach(state => {
        for (let rotation = 0; rotation < 360; rotation += 90)
        {
            let id = buildRotatedConnection(state, rotation);
            if (id != null)
            {
                EXISTING_STATES[id] = {
                    imageKey: state,
                    rotation: rotation,
                    used: true
                };
            }
        }
    });
    CONNECTIONS_DICT[STATE_ERROR] = {
        up: null,
        down: null,
        left: null,
        right: null,
    };
}

function buildRotatedConnection(stateKey, rotation)
{
    let id = stateKey + "_" + rotation;
    if (id in CONNECTIONS_DICT)
    {
        return null;
    }
    let rotationOffset = Math.floor(rotation / 90);
    let originalRules = BASE_CONNECTIONS_DICT[stateKey];
    let originalRuleList = [originalRules.up, originalRules.right, originalRules.down, originalRules.left];
    let len = originalRuleList.length;
    // new rotation
    let rotatedRuleList = [
        originalRuleList[(0 + rotationOffset) % len],
        originalRuleList[(1 + rotationOffset) % len],
        originalRuleList[(2 + rotationOffset) % len],
        originalRuleList[(3 + rotationOffset) % len]
    ]
    // duplicate rotation
    if (rotationExists(stateKey, rotatedRuleList))
    {
        return null;
    }

    CONNECTIONS_DICT[id] = {
        up: rotatedRuleList[0],
        right: rotatedRuleList[1],
        down: rotatedRuleList[2],
        left: rotatedRuleList[3],
    }
    return id;
}

function rotationExists(stateKey, newRulesList)
{
    let partialID = stateKey + "_";
    for (let rotation = 0; rotation < 360; rotation += 90)
    {
        let id = partialID + rotation;
        if (id in CONNECTIONS_DICT)
        {
            let rotatedRules = CONNECTIONS_DICT[id];
            if (
                isRuleEqual(newRulesList[0], rotatedRules.up) &&
                isRuleEqual(newRulesList[1], rotatedRules.right) &&
                isRuleEqual(newRulesList[2], rotatedRules.down) &&
                isRuleEqual(newRulesList[3], rotatedRules.left)
            )
            {
                return true;
            }
        }
    }
    return false;
}

function isRuleEqual(rule1, rule2)
{
    for (let x = 0; x < rule1.length; x++)
    {
        if (rule1[x] != rule2[x])
        {
            return false;
        }
    }
    return true;
}

function buildStateController()
{
    let statesDiv = $("#states");
    statesDiv.empty();
    Object.values(EXISTING_STATES).forEach(function (eState, x) {
        statesDiv.append(`<input type="checkbox" id="state_${x}" ${eState.used ? "checked" : ""}><img src="${STATE_IMAGES_DICT[eState.imageKey]}" data-rotate="${eState.rotation}" class="stateIcon" alt="state">`);
    });
    rotateImages($(".stateIcon"));
}

function rotateImages(images)
{
    images.each(function() {
        var deg = $(this).data("rotate") * -1 || 0;
        var rotate = "rotate(" + deg + "deg)";
        $(this).css({
            "transform": rotate,
        });
    });
}

function updateUsedStates()
{
    Object.values(EXISTING_STATES).forEach(function (eState, x) {
        eState.used = $(`#state_${x}`).is(':checked');
    });
    rebuildUsedStates();
}

function rebuildUsedStates()
{
    USED_STATES.length = 0;
    Object.keys(EXISTING_STATES).forEach(stateID => {
        if (EXISTING_STATES[stateID].used)
        {
            USED_STATES.push(stateID);
        }
    });
}

function regenerateBoard()
{
    SIZE = $("#boardSize").val() * 1;
    DELAY = $("#genDelay").val() * 1;
    generateBoard();
}

async function generateBoard()
{
    populateBoard();
    let done = false;
    while (!done)
    {
        let cellNumber = findBestCell();
        done = colapseCell(cellNumber);
        updateStates();
        updateBoard();
        if (DELAY >= 0)
        {
            await sleep(DELAY);
        }
    }
}

function populateBoard()
{
    BOARD.length = 0;

    let board = $("#board");
    board.empty();
    for (let x = 0; x < SIZE * SIZE; x++)
    {
        board.append(`<img class="cell" src="${IMAGE_NOTHING}" alt="cell">`);
        BOARD.push({
            colapsed: false,
            states: USED_STATES
        });
    }

    $(".cell").width(`${100/SIZE}%`);
}

function resetBoard()
{
    $(".cell").attr("src", IMAGE_NOTHING);
}

function updateBoard()
{
    $(".cell").each(function(x)
    {
        let boardCell = BOARD[x];
        if (!boardCell.colapsed && boardCell.states.length == 1)
        {
            let cell = $(this)
            let state = EXISTING_STATES[boardCell.states[0]];
            let image = STATE_IMAGES_DICT[state == undefined ? STATE_ERROR : state.imageKey]
            cell.attr("src", image);
            if (state != undefined)
            cell.attr("data-rotate", state.rotation);
            rotateImages(cell);
            boardCell.colapsed = true;
        }
    });
}

function findBestCell()
{
    let bestCell = -1;
    let bestCellStates = 1000000;
    for (let x = 0; x < BOARD.length; x++)
    {
        let cell = BOARD[x];
        if (!cell.colapsed && cell.states.length < bestCellStates)
        {
            bestCell = x;
            bestCellStates = cell.states.length;
        }
    }
    return bestCell;
}

function colapseCell(bestCellNumber)
{
    // done
    if (bestCellNumber == -1)
    {
        return true;
    }

    // colapse
    let bestCell = BOARD[bestCellNumber];
    if (bestCell.states.length != 1)
    {
        let stateNum = Math.floor((Math.random() * bestCell.states.length));
        bestCell.states = [bestCell.states[stateNum]];
    }
    return false;
}

function getCellSideStateConnections(cell, side)
{
    let cellStates = cell == null || cell.states.length == 0 ? null : cell.states;
    if (cellStates == null)
    {
        return null;
    }
    let connections = [];
    for (let x = 0; x < cellStates.length; x++)
    {
        let sideState = CONNECTIONS_DICT[cellStates[x]][side];
        if (sideState == null)
        {
            return null;
        }
        connections.push(sideState);
    }
    if (connections.length == 0)
    {
        return null;
    }
    return connections;
}

function updateStates()
{
    for (let x = 0; x < BOARD.length; x++) {
        let cell = BOARD[x];
        if (!cell.colapsed && cell.states.length > 0)
        {
            let coll = x % SIZE;
            let row = Math.floor(x / SIZE);
            let upCell = row < 1 ? null : BOARD[x - SIZE];
            let downCell = row >= SIZE - 1 ? null : BOARD[x + SIZE];
            let leftCell = coll < 1 ? null : BOARD[x - 1];
            let rightCell = coll >= SIZE - 1 ? null : BOARD[x + 1];

            let upCellStateConnections = getCellSideStateConnections(upCell, "down");
            let downCellStateConnections = getCellSideStateConnections(downCell, "up");
            let leftCellStateConnections = getCellSideStateConnections(leftCell, "right");
            let rightCellStateConnections = getCellSideStateConnections(rightCell, "left");

            let newStates = [];
            cell.states.forEach(state => {
                let stateRules = CONNECTIONS_DICT[state];
                if (
                    isConnectionCorrect(stateRules.up, upCellStateConnections) &&
                    isConnectionCorrect(stateRules.down, downCellStateConnections) &&
                    isConnectionCorrect(stateRules.left, leftCellStateConnections) &&
                    isConnectionCorrect(stateRules.right, rightCellStateConnections)
                )
                {
                    newStates.push(state);
                }
            });
            cell.states = newStates;
        }
        if (cell.states.length == 0)
        {
            cell.states = [STATE_ERROR];
        }
    }
}

function isConnectionCorrect(cellSideRule, neighbourCellSideRules)
{
    if (neighbourCellSideRules == null)
    {
        return true;
    }
    for (let x = 0; x < neighbourCellSideRules.length; x++)
    {
        let neighbourRule = neighbourCellSideRules[x];
        let otherSideRule = [];
        for (let y = 0; y < neighbourRule.length; y++)
        {
            otherSideRule[y] = neighbourRule[neighbourRule.length - y - 1]
        }
        if (isRuleEqual(cellSideRule, otherSideRule))
        {
            return true;
        }
    }
    return false;
}