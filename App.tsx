import React, { FC, useState } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Button,
} from "react-native";

const Brick: FC<{
    brickNumber: number;
    onClick: (brickNUm: number) => void;
    getCurrentPlayer: () => number;
    cells: number[];
    winner: number;
}> = (props) => {
    const [player, setPlayer] = useState(0);
    const onBrickClick = () => {
        setPlayer(props.getCurrentPlayer());
        props.onClick(props.brickNumber);
    };

    const player1 = () => {
        if (props.cells[props.brickNumber] == 1) {
            return "flex";
        } else {
            return "none";
        }
    };

    const player2 = () => {
        if (props.cells[props.brickNumber] == 2) {
            return "flex";
        } else {
            return "none";
        }
    };

    const disableBrick = () => {
        if (props.winner != 0) {
            return true;
        }
        return props.cells[props.brickNumber] ? true : false;
    };

    return (
        <View style={styles.brick}>
            <TouchableOpacity
                style={[styles.button]}
                onPress={onBrickClick}
                disabled={disableBrick()}
            >
                <Image
                    style={[styles.image, { display: player1() }]}
                    source={require("./assets/x.png")}
                />
                <Image
                    style={[styles.image, { display: player2() }]}
                    source={require("./assets/o.png")}
                />
            </TouchableOpacity>
        </View>
    );
};

const App: FC = () => {
    // 0: not selected, 1: 'x', 2: 'o'
    const [turn, setTurn] = useState(1);
    const [Cells, setCells] = useState(Array(9).fill(0));
    const [topHorizontal, setTopHorizontal] = useState(0);
    const [middleHorizontal, setMiddleHorizontal] = useState(0);
    const [bottomHorizontal, setBottomHorizontal] = useState(0);
    const [leftVertical, setLeftVertical] = useState(0);
    const [middleVertical, setMiddleVertical] = useState(0);
    const [rightVertical, setRightVertical] = useState(0);
    const [mainDiagonal, setMainDiagonal] = useState(0);
    const [seconderyDiagonal, setSeconderyDiagonal] = useState(0);
    const [winner, setWinner] = useState(0);

    const getCurrentPlayer = () => {
        return turn;
    };

    const horizontalDisplay = (rowNumber: number) => {
        if (topHorizontal == 1) {
            if (rowNumber == 1) {
                return "flex";
            } else {
                return "none";
            }
        } else if (middleHorizontal == 1) {
            if (rowNumber == 2) {
                return "flex";
            } else {
                return "none";
            }
        } else if (bottomHorizontal == 1) {
            if (rowNumber == 3) {
                return "flex";
            } else {
                return "none";
            }
        } else {
            return "none";
        }
    };

    const updateCells = (brickNum: number) => {
        Cells[brickNum] = turn;

        setCells(Cells);
    };

    const onBrickClick = (brickNumber: number) => {
        updateCells(brickNumber);

        if (turn == 1) {
            setTurn(2);
        } else {
            setTurn(1);
        }
        checkWinner();
    };

    const verticalDisplay = (vertical: string) => {
        console.log("leftVertical = " + leftVertical);
        console.log("middleVertical = " + middleVertical);

        console.log("rightVertical = " + rightVertical);

        if (leftVertical == 1 && vertical == "left") {
            return "flex";
        } else if (middleVertical == 1 && vertical == "middle") {
            return "flex";
        } else if (rightVertical == 1 && vertical == "right") {
            return "flex";
        } else {
            return "none";
        }
    };

    const diagonalDisplay = (diagonal: String) => {
        console.log("mainDiagonal = " + mainDiagonal);

        console.log("seconderyDiagonal = " + seconderyDiagonal);

        if (mainDiagonal == 1 && diagonal == "toRight") {
            return "flex";
        } else if (seconderyDiagonal == 1 && diagonal == "toLeft") {
            return "flex";
        } else {
            return "none";
        }
    };

    const checkVertical = () => {
        // 0, 3, 6
        if (Cells[0] && Cells[0] == Cells[3] && Cells[3] == Cells[6]) {
            //win - to place the left vertical
            setLeftVertical(1);
            setWinner(Cells[0]);
        }
        //1, 4, 7
        if (Cells[1] && Cells[1] == Cells[4] && Cells[4] == Cells[7]) {
            //win - to place the middel vertical
            setMiddleVertical(1);
            setWinner(Cells[1]);
        }
        //2, 5, 8
        if (Cells[2] && Cells[2] == Cells[5] && Cells[5] == Cells[8]) {
            //win - to place the right vertical
            setRightVertical(1);
            setWinner(Cells[2]);
        }
    };

    const checkHorizontal = () => {
        //0, 1, 2
        if (Cells[0] && Cells[0] == Cells[1] && Cells[1] == Cells[2]) {
            //win - to place the top herizontal
            setTopHorizontal(1);
            setWinner(Cells[0]);
        }
        //3, 4, 5
        if (Cells[3] && Cells[3] == Cells[4] && Cells[4] == Cells[5]) {
            //win - to place the middel herizontal
            setMiddleHorizontal(1);
            setWinner(Cells[3]);
        }
        //6, 7, 8
        if (Cells[6] && Cells[6] == Cells[7] && Cells[7] == Cells[8]) {
            //win - to place the bottom herizontal
            setBottomHorizontal(1);
            setWinner(Cells[6]);
        }
    };

    const checkDiagonals = () => {
        //0, 4, 8
        if (Cells[0] && Cells[0] == Cells[4] && Cells[4] == Cells[8]) {
            //win - to place the main diagonal
            setMainDiagonal(1);
            setWinner(Cells[0]);
        }
        //2, 4, 6
        if (Cells[2] && Cells[2] == Cells[4] && Cells[4] == Cells[6]) {
            //win - to place the secondery diagonal
            setSeconderyDiagonal(1);
            setWinner(Cells[2]);
        }
    };

    const checkNoWinner = () => {
        for (var i = 0; i < Cells.length; ++i) {
            if (Cells[i] == 0) {
                return;
            }
        }
        setWinner(-1);
    };

    const checkWinner = () => {
        console.log(Cells);
        checkVertical();
        checkHorizontal();
        checkDiagonals();
        checkNoWinner();
    };

    console.log("My app is running");

    const newGame = () => {
        console.log("newGame was pressed");
        setCells(Array(9).fill(0));
        setTurn(1);
        setTopHorizontal(0);
        setMiddleHorizontal(0);
        setBottomHorizontal(0);
        setLeftVertical(0);
        setMiddleVertical(0);
        setRightVertical(0);
        setMainDiagonal(0);
        setSeconderyDiagonal(0);
        setWinner(0);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Brick
                    brickNumber={0}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Brick
                    brickNumber={1}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Brick
                    brickNumber={2}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Image
                    style={[
                        styles.imageLines,
                        { display: horizontalDisplay(1) },
                    ]}
                    source={require("./assets/horizontal.png")}
                />
            </View>
            <View style={styles.row}>
                <Brick
                    brickNumber={3}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Brick
                    brickNumber={4}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Brick
                    brickNumber={5}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Image
                    style={[
                        styles.imageLines,
                        { display: horizontalDisplay(2), marginTop: 10 },
                    ]}
                    source={require("./assets/horizontal.png")}
                />
            </View>
            <View style={styles.row}>
                <Brick
                    brickNumber={6}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Brick
                    brickNumber={7}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Brick
                    brickNumber={8}
                    onClick={onBrickClick}
                    getCurrentPlayer={getCurrentPlayer}
                    cells={Cells}
                    winner={winner}
                ></Brick>
                <Image
                    style={[
                        styles.imageLines,
                        { display: horizontalDisplay(3) },
                    ]}
                    source={require("./assets/horizontal.png")}
                />
            </View>
            <Image
                style={[
                    styles.imageLines,
                    { display: verticalDisplay("left"), marginLeft: 20 },
                ]}
                source={require("./assets/vertical.png")}
            />
            <Image
                style={[
                    styles.imageLines,
                    { display: verticalDisplay("middle"), marginLeft: 160 },
                ]}
                source={require("./assets/vertical.png")}
            />
            <Image
                style={[
                    styles.imageLines,
                    { display: verticalDisplay("right"), marginLeft: 290 },
                ]}
                source={require("./assets/vertical.png")}
            />
            <Image
                style={[
                    styles.imageLines,
                    {
                        display: diagonalDisplay("toLeft"),
                        transform: [{ rotate: "45deg" }],
                        marginLeft: 140,
                    },
                ]}
                source={require("./assets/vertical.png")}
            />
            <Image
                style={[
                    styles.imageLines,
                    {
                        display: diagonalDisplay("toRight"),
                        transform: [{ rotate: "-45deg" }],
                        marginLeft: 170,
                    },
                ]}
                source={require("./assets/vertical.png")}
            />

            <Text style={styles.textBox}>
                {winner === -1
                    ? "No winner :("
                    : winner != 0
                    ? "The winner is " + winner + " !!!"
                    : "Its the turn of player number " + turn}
            </Text>
            <TouchableOpacity onPress={newGame} style={styles.newGameButton}>
                <Text
                    style={{
                        color: "white",
                        backgroundColor: "dodgerblue",
                        fontSize: 25,
                        textAlign: "center",
                        borderRadius: 6,
                    }}
                >
                    New Game !
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "black",
    },
    row: {
        flexDirection: "row",
        backgroundColor: "blue",
    },
    brick: {
        flex: 1,
        backgroundColor: "white",
        margin: 5,
        aspectRatio: 1,
    },
    button: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        aspectRatio: 1,
        display: "none",
    },
    imageLines: {
        flex: 1,
        position: "absolute",
    },
    containerColumn: {
        flex: 1,
        flexDirection: "column",
    },
    textBox: {
        backgroundColor: "grey",
        padding: 10,
        textAlign: "center",
        margin: 5,
        fontSize: 18,
        marginBottom: 20,
    },
    newGameButton: {
        flex: 1,
        margin: 5,
        padding: 20,
    },
});

export default App;
