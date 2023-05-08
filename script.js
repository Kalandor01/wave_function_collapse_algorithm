
const IMAGE_NOTHING = "img/nothing.png";
const IMAGE_ERROR = "img/error.png";

const IMAGE_BLANK = "img/blank.png";
const IMAGE_ALL = "img/all.png";

const IMAGE_FORK_UP = "img/fork_up.png";
const IMAGE_FORK_DOWN = "img/fork_down.png";
const IMAGE_FORK_LEFT = "img/fork_left.png";
const IMAGE_FORK_RIGHT = "img/fork_right.png";

const IMAGE_CORNER_TOP_LEFT = "img/corner_top_left.png";
const IMAGE_CORNER_TOP_RIGHT = "img/corner_top_right.png";
const IMAGE_CORNER_BOTTOM_LEFT = "img/corner_bottom_left.png";
const IMAGE_CORNER_BOTTOM_RIGHT = "img/corner_bottom_right.png";

const IMAGE_END_UP = "img/end_up.png";
const IMAGE_END_DOWN = "img/end_down.png";
const IMAGE_END_LEFT = "img/end_left.png";
const IMAGE_END_RIGHT = "img/end_right.png";

const IMAGE_STRAIGHT_VERTICAL = "img/straight_vertical.png";
const IMAGE_STRAIGHT_HORIZONTAL = "img/straight_horizontal.png";


const CONNECTIONS_DICT = {
    [IMAGE_ERROR]: {
        up: null,
        down: null,
        left: null,
        right: null
    },
    [IMAGE_BLANK]: {
        up: false,
        down: false,
        left: false,
        right: false
    },
    [IMAGE_ALL]: {
        up: true,
        down: true,
        left: true,
        right: true
    },
    [IMAGE_FORK_UP]: {
        up: true,
        down: false,
        left: true,
        right: true
    },
    [IMAGE_FORK_DOWN]: {
        up: false,
        down: true,
        left: true,
        right: true
    },
    [IMAGE_FORK_LEFT]: {
        up: true,
        down: true,
        left: true,
        right: false
    },
    [IMAGE_FORK_RIGHT]: {
        up: true,
        down: true,
        left: false,
        right: true
    },
    [IMAGE_CORNER_TOP_LEFT]: {
        up: true,
        down: false,
        left: true,
        right: false
    },
    [IMAGE_CORNER_TOP_RIGHT]: {
        up: true,
        down: false,
        left: false,
        right: true
    },
    [IMAGE_CORNER_BOTTOM_LEFT]: {
        up: false,
        down: true,
        left: true,
        right: false
    },
    [IMAGE_CORNER_BOTTOM_RIGHT]: {
        up: false,
        down: true,
        left: false,
        right: true
    },
    [IMAGE_END_UP]: {
        up: true,
        down: false,
        left: false,
        right: false
    },
    [IMAGE_END_DOWN]: {
        up: false,
        down: true,
        left: false,
        right: false
    },
    [IMAGE_END_LEFT]: {
        up: false,
        down: false,
        left: true,
        right: false
    },
    [IMAGE_END_RIGHT]: {
        up: false,
        down: false,
        left: false,
        right: true
    },
    [IMAGE_STRAIGHT_VERTICAL]: {
        up: true,
        down: true,
        left: false,
        right: false
    },
    [IMAGE_STRAIGHT_HORIZONTAL]: {
        up: false,
        down: false,
        left: true,
        right: true
    },
}

const BOARD = [];

const EXISTING_STATES = [
    {state: IMAGE_BLANK, used: true},
    {state: IMAGE_ALL, used: true},

    {state: IMAGE_FORK_UP, used: true},
    {state: IMAGE_FORK_DOWN, used: true},
    {state: IMAGE_FORK_LEFT, used: true},
    {state: IMAGE_FORK_RIGHT, used: true},

    {state: IMAGE_CORNER_TOP_LEFT, used: true},
    {state: IMAGE_CORNER_TOP_RIGHT, used: true},
    {state: IMAGE_CORNER_BOTTOM_LEFT, used: true},
    {state: IMAGE_CORNER_BOTTOM_RIGHT, used: true},

    {state: IMAGE_END_UP, used: true},
    {state: IMAGE_END_DOWN, used: true},
    {state: IMAGE_END_LEFT, used: true},
    {state: IMAGE_END_RIGHT, used: true},

    {state: IMAGE_STRAIGHT_VERTICAL, used: true},
    {state: IMAGE_STRAIGHT_HORIZONTAL, used: true},
];

var USED_STATES = [];


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

function buildStateController()
{
    let statesDiv = $("#states");
    statesDiv.empty();
    EXISTING_STATES.forEach(function (eState, x) {
        statesDiv.append(`<input type="checkbox" id="state_${x}" ${eState.used ? "checked" : ""}><img src="${eState.state}" class="stateIcon" alt="state">`);
    });
}

function updateUsedStates()
{
    EXISTING_STATES.forEach(function (eState, x) {
        eState.used = $(`#state_${x}`).is(':checked');
    });
    rebuildUsedStates();
}

function rebuildUsedStates()
{
    USED_STATES.length = 0;
    EXISTING_STATES.forEach(eState => {
        if (eState.used)
        {
            USED_STATES.push(eState.state);
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
            $(this).attr("src", boardCell.states[0]);
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
    cellStates.forEach(state => {
        let sideState = CONNECTIONS_DICT[state][side];
        if (sideState == null)
        {
            return null
        }
        connections.push(sideState);
    });
    if (connections.length == 0)
    {
        return null
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
                    (upCellStateConnections == null || upCellStateConnections.includes(stateRules.up)) &&
                    (downCellStateConnections == null || downCellStateConnections.includes(stateRules.down)) &&
                    (leftCellStateConnections == null || leftCellStateConnections.includes(stateRules.left)) &&
                    (rightCellStateConnections == null || rightCellStateConnections.includes(stateRules.right))
                )
                {
                    newStates.push(state);
                }
            });
            cell.states = newStates;
        }
        if (cell.states.length == 0)
        {
            cell.states = [IMAGE_ERROR];
        }
    }
}