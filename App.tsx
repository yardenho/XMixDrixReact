import { FC } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const Brick: FC = () => {
    return (
        <View style={styles.brick}>
            <TouchableOpacity></TouchableOpacity>
        </View>
    );
};

const App: FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
});
