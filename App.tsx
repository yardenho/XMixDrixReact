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
}> = (props) => {
    const [player, setPlayer] = useState(0);

    const onBrickClick = () => {
        setPlayer(props.getCurrentPlayer());
        props.onClick(props.brickNumber);
    };

    const player1 = () => {
        if (player == 1) {
            return "flex";
        } else {
            return "none";
        }
    };

    const player2 = () => {
        if (player == 2) {
            return "flex";
        } else {
            return "none";
        }
    };
    console.log(player);

    return (
        <View style={styles.brick}>
            <TouchableOpacity
                style={[styles.button]}
                onPress={onBrickClick}
                disabled={player ? true : false}
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

const BrickRow: FC<{
    brickRowNumber: number;
    onClick: (brickNUm: number) => void;
    getCurrentPlayer: () => number;
    linesInfo: () => number[];
}> = (props) => {
    const horizontalDisplay = () => {
        const [topHorizontal, middleHorizontal, bottomHorizontal] =
            props.linesInfo();
        console.log("topHorizontal " + topHorizontal);
        console.log("middleHorizontal " + middleHorizontal);
        console.log("bottomHorizontal " + bottomHorizontal);

        if (topHorizontal == 1) {
            if (props.brickRowNumber == 1) {
                return "flex";
            } else {
                return "none";
            }
        } else if (middleHorizontal == 1) {
            if (props.brickRowNumber == 4) {
                return "flex";
            } else {
                return "none";
            }
        } else if (bottomHorizontal == 1) {
            if (props.brickRowNumber == 7) {
                return "flex";
            } else {
                return "none";
            }
        } else {
            return "none";
        }
    };

    return (
        <View style={styles.row}>
            <Brick
                brickNumber={props.brickRowNumber}
                onClick={props.onClick}
                getCurrentPlayer={props.getCurrentPlayer}
            ></Brick>
            <Brick
                brickNumber={props.brickRowNumber + 1}
                onClick={props.onClick}
                getCurrentPlayer={props.getCurrentPlayer}
            ></Brick>
            <Brick
                brickNumber={props.brickRowNumber + 2}
                onClick={props.onClick}
                getCurrentPlayer={props.getCurrentPlayer}
            ></Brick>
            <Image
                style={[styles.imageLines, { display: horizontalDisplay() }]}
                source={require("./assets/horizontal.png")}
            />
        </View>
    );
};

const App: FC = () => {
    // 0: not selected, 1: 'x', 2: 'o'
    var turn = 1;
    var oCells: number[] = [];
    var xCells: number[] = [];
    const [topHorizontal, setTopHorizontal] = useState(0);
    const [middleHorizontal, setMiddleHorizontal] = useState(0);
    const [bottomHorizontal, setBottomHorizontal] = useState(0);
    const [leftVertical, setLeftVertical] = useState(0);
    const [middleVertical, setMiddleVertical] = useState(0);
    const [rightVertical, setRightVertical] = useState(0);
    const [mainDiagonal, setMainDiagonal] = useState(0);
    const [seconderyDiagonal, setSeconderyDiagonal] = useState(0);
    const [newGameClicked, setNewGameClicked] = useState(0);

    const getCurrentPlayer = () => {
        return turn;
    };

    const getLinesInfo = () => {
        return [topHorizontal, middleHorizontal, bottomHorizontal];
    };

    const updateCells = (brickNum: number) => {
        if (turn == 1) {
            xCells.push(brickNum);
        } else if (turn == 2) {
            oCells.push(brickNum);
        }
    };

    const onBrickClick = (brickNumber: number) => {
        console.log("onBrickClick");
        if (turn == 1) {
            turn = 2;
        } else {
            turn = 1;
        }
        updateCells(brickNumber);
        checkWinner();
    };

    const verticalDisplay = (vertical: string) => {
        console.log("in display");
        console.log("leftVertical" + leftVertical);
        console.log("middleVertical" + middleVertical);
        console.log("rightVertical" + rightVertical);

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
        console.log(diagonal);

        if (mainDiagonal == 1 && diagonal == "toRight") {
            return "flex";
        } else if (seconderyDiagonal == 1 && diagonal == "toLeft") {
            return "flex";
        } else {
            return "none";
        }
    };

    const checkVertical = (arr: number[]) => {
        // 1, 4, 7
        if (
            arr.indexOf(1) != -1 &&
            arr.indexOf(4) != -1 &&
            arr.indexOf(7) != -1
        ) {
            //win - to place the left vertical
            setLeftVertical(1);
        }
        //2, 5, 8
        if (
            arr.indexOf(2) != -1 &&
            arr.indexOf(5) != -1 &&
            arr.indexOf(8) != -1
        ) {
            //win - to place the middel vertical

            setMiddleVertical(1);
        }
        //3, 6, 9
        if (
            arr.indexOf(3) != -1 &&
            arr.indexOf(6) != -1 &&
            arr.indexOf(9) != -1
        ) {
            //win - to place the right vertical
            setRightVertical(1);
        }
    };

    const checkHorizontal = (arr: number[]) => {
        //1, 2, 3
        if (
            arr.indexOf(1) != -1 &&
            arr.indexOf(2) != -1 &&
            arr.indexOf(3) != -1
        ) {
            //win - to place the top herizontal
            setTopHorizontal(1);
        }
        //4, 5, 6
        if (
            arr.indexOf(4) != -1 &&
            arr.indexOf(5) != -1 &&
            arr.indexOf(6) != -1
        ) {
            //win - to place the middel herizontal
            setMiddleHorizontal(1);
        }
        //7, 8, 9
        if (
            arr.indexOf(7) != -1 &&
            arr.indexOf(8) != -1 &&
            arr.indexOf(9) != -1
        ) {
            //win - to place the bottom herizontal
            setBottomHorizontal(1);
        }
    };

    const checkDiagonals = (arr: number[]) => {
        //1, 5, 9
        if (
            arr.indexOf(1) != -1 &&
            arr.indexOf(5) != -1 &&
            arr.indexOf(9) != -1
        ) {
            //win - to place the main diagonal
            setMainDiagonal(1);
        }
        //3, 5, 7
        if (
            arr.indexOf(3) != -1 &&
            arr.indexOf(5) != -1 &&
            arr.indexOf(7) != -1
        ) {
            //win - to place the secondery diagonal
            setSeconderyDiagonal(1);
        }
    };

    const checkWinner = () => {
        if (turn == 1) {
            checkVertical(xCells);
            checkHorizontal(xCells);
            checkDiagonals(xCells);
        } else if (turn == 2) {
            checkVertical(oCells);
            checkHorizontal(oCells);
            checkDiagonals(oCells);
        }
    };

    console.log("My app is running");

    const newGame = () => {
        setNewGameClicked(1);
        console.log("newGame was pressed");
        turn = 1;
        oCells = [];
        xCells = [];
        setTopHorizontal(0);
        setMiddleHorizontal(0);
        setBottomHorizontal(0);
        setLeftVertical(0);
        setMiddleVertical(0);
        setRightVertical(0);
        setMainDiagonal(0);
        setSeconderyDiagonal(0);
    };

    return (
        <View style={styles.container}>
            <BrickRow
                brickRowNumber={1}
                onClick={onBrickClick}
                getCurrentPlayer={getCurrentPlayer}
                linesInfo={getLinesInfo}
            ></BrickRow>
            <BrickRow
                brickRowNumber={4}
                onClick={onBrickClick}
                getCurrentPlayer={getCurrentPlayer}
                linesInfo={getLinesInfo}
            ></BrickRow>
            <BrickRow
                brickRowNumber={7}
                onClick={onBrickClick}
                getCurrentPlayer={getCurrentPlayer}
                linesInfo={getLinesInfo}
            ></BrickRow>
            <Image
                style={[
                    styles.imageLines,
                    { display: verticalDisplay("left") },
                ]}
                source={require("./assets/vertical.png")}
            />
            <Image
                style={[
                    styles.imageLines,
                    { display: verticalDisplay("middle"), marginLeft: 150 },
                ]}
                source={require("./assets/vertical.png")}
            />
            <Image
                style={[
                    styles.imageLines,
                    { display: verticalDisplay("right"), marginLeft: 300 },
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
                        marginLeft: 140,
                    },
                ]}
                source={require("./assets/vertical.png")}
            />

            <Text>Its the turn of player number {turn}</Text>
            <Button onPress={newGame} title=" New Game !"></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "gray",
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
});

export default App;
