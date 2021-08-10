import './App.css';
import HeatMap from './heatmap';

function App () {
    // DEV DB data
    const data = [
        {
            "qty_pct": 0,
            "cov_01": 1,
            "cov_02": 5,
            "cov_03": 57,
            "cov_04": 122,
            "cov_05": 6,
            "cov_06": 16,
            "cov_07": 10,
            "cov_08": 3,
            "cov_09": 0,
            "cov_10": 0,
            "cov_11": 0,
            "cov_12": 0,
            "cov_13": 0,
            "cov_14": 0,
            "cov_15": 0,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 0
        },
        {
            "qty_pct": 5,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 1,
            "cov_05": 39,
            "cov_06": 129,
            "cov_07": 46,
            "cov_08": 4,
            "cov_09": 0,
            "cov_10": 0,
            "cov_11": 0,
            "cov_12": 1,
            "cov_13": 0,
            "cov_14": 0,
            "cov_15": 0,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 0
        },
        {
            "qty_pct": 10,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 94,
            "cov_06": 120,
            "cov_07": 7,
            "cov_08": 0,
            "cov_09": 1,
            "cov_10": 0,
            "cov_11": 0,
            "cov_12": 0,
            "cov_13": 0,
            "cov_14": 0,
            "cov_15": 0,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 0
        },
        {
            "qty_pct": 15,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 41,
            "cov_05": 171,
            "cov_06": 3,
            "cov_07": 2,
            "cov_08": 0,
            "cov_09": 0,
            "cov_10": 0,
            "cov_11": 0,
            "cov_12": 0,
            "cov_13": 0,
            "cov_14": 0,
            "cov_15": 0,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 0
        },
        {
            "qty_pct": 20,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 48,
            "cov_04": 145,
            "cov_05": 22,
            "cov_06": 0,
            "cov_07": 1,
            "cov_08": 1,
            "cov_09": 0,
            "cov_10": 1,
            "cov_11": 1,
            "cov_12": 0,
            "cov_13": 1,
            "cov_14": 0,
            "cov_15": 0,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 0
        },
        {
            "qty_pct": 25,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 198,
            "cov_04": 16,
            "cov_05": 0,
            "cov_06": 1,
            "cov_07": 0,
            "cov_08": 0,
            "cov_09": 0,
            "cov_10": 1,
            "cov_11": 2,
            "cov_12": 0,
            "cov_13": 0,
            "cov_14": 0,
            "cov_15": 1,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 1
        },
        {
            "qty_pct": 30,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 209,
            "cov_04": 0,
            "cov_05": 0,
            "cov_06": 0,
            "cov_07": 0,
            "cov_08": 0,
            "cov_09": 2,
            "cov_10": 0,
            "cov_11": 1,
            "cov_12": 1,
            "cov_13": 0,
            "cov_14": 3,
            "cov_15": 1,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 1,
            "cov_20": 1
        },
        {
            "qty_pct": 35,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 178,
            "cov_04": 34,
            "cov_05": 0,
            "cov_06": 0,
            "cov_07": 1,
            "cov_08": 1,
            "cov_09": 2,
            "cov_10": 0,
            "cov_11": 0,
            "cov_12": 1,
            "cov_13": 1,
            "cov_14": 0,
            "cov_15": 2,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 1
        },
        {
            "qty_pct": 40,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 34,
            "cov_04": 147,
            "cov_05": 17,
            "cov_06": 2,
            "cov_07": 4,
            "cov_08": 1,
            "cov_09": 3,
            "cov_10": 1,
            "cov_11": 2,
            "cov_12": 0,
            "cov_13": 1,
            "cov_14": 2,
            "cov_15": 2,
            "cov_16": 0,
            "cov_17": 2,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 2
        },
        {
            "qty_pct": 45,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 93,
            "cov_05": 103,
            "cov_06": 8,
            "cov_07": 1,
            "cov_08": 1,
            "cov_09": 1,
            "cov_10": 0,
            "cov_11": 0,
            "cov_12": 2,
            "cov_13": 0,
            "cov_14": 2,
            "cov_15": 2,
            "cov_16": 0,
            "cov_17": 1,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 4
        },
        {
            "qty_pct": 50,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 4,
            "cov_05": 92,
            "cov_06": 80,
            "cov_07": 8,
            "cov_08": 2,
            "cov_09": 3,
            "cov_10": 3,
            "cov_11": 1,
            "cov_12": 2,
            "cov_13": 2,
            "cov_14": 1,
            "cov_15": 2,
            "cov_16": 2,
            "cov_17": 5,
            "cov_18": 1,
            "cov_19": 1,
            "cov_20": 11
        },
        {
            "qty_pct": 55,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 9,
            "cov_06": 105,
            "cov_07": 67,
            "cov_08": 8,
            "cov_09": 2,
            "cov_10": 2,
            "cov_11": 2,
            "cov_12": 2,
            "cov_13": 1,
            "cov_14": 4,
            "cov_15": 0,
            "cov_16": 0,
            "cov_17": 3,
            "cov_18": 3,
            "cov_19": 0,
            "cov_20": 12
        },
        {
            "qty_pct": 60,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 0,
            "cov_06": 2,
            "cov_07": 69,
            "cov_08": 93,
            "cov_09": 12,
            "cov_10": 3,
            "cov_11": 4,
            "cov_12": 4,
            "cov_13": 0,
            "cov_14": 5,
            "cov_15": 3,
            "cov_16": 1,
            "cov_17": 5,
            "cov_18": 5,
            "cov_19": 3,
            "cov_20": 11
        },
        {
            "qty_pct": 65,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 0,
            "cov_06": 0,
            "cov_07": 9,
            "cov_08": 130,
            "cov_09": 54,
            "cov_10": 7,
            "cov_11": 1,
            "cov_12": 0,
            "cov_13": 2,
            "cov_14": 3,
            "cov_15": 0,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 13
        },
        {
            "qty_pct": 70,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 0,
            "cov_06": 2,
            "cov_07": 0,
            "cov_08": 58,
            "cov_09": 126,
            "cov_10": 21,
            "cov_11": 0,
            "cov_12": 1,
            "cov_13": 2,
            "cov_14": 2,
            "cov_15": 0,
            "cov_16": 0,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 1,
            "cov_20": 7
        },
        {
            "qty_pct": 75,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 0,
            "cov_06": 0,
            "cov_07": 1,
            "cov_08": 17,
            "cov_09": 132,
            "cov_10": 43,
            "cov_11": 4,
            "cov_12": 4,
            "cov_13": 1,
            "cov_14": 1,
            "cov_15": 2,
            "cov_16": 3,
            "cov_17": 0,
            "cov_18": 1,
            "cov_19": 1,
            "cov_20": 10
        },
        {
            "qty_pct": 80,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 0,
            "cov_06": 2,
            "cov_07": 5,
            "cov_08": 15,
            "cov_09": 45,
            "cov_10": 21,
            "cov_11": 13,
            "cov_12": 8,
            "cov_13": 12,
            "cov_14": 9,
            "cov_15": 7,
            "cov_16": 6,
            "cov_17": 5,
            "cov_18": 5,
            "cov_19": 5,
            "cov_20": 61
        },
        {
            "qty_pct": 85,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 0,
            "cov_06": 8,
            "cov_07": 23,
            "cov_08": 24,
            "cov_09": 22,
            "cov_10": 27,
            "cov_11": 15,
            "cov_12": 14,
            "cov_13": 11,
            "cov_14": 13,
            "cov_15": 9,
            "cov_16": 9,
            "cov_17": 7,
            "cov_18": 8,
            "cov_19": 1,
            "cov_20": 29
        },
        {
            "qty_pct": 90,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 0,
            "cov_06": 10,
            "cov_07": 21,
            "cov_08": 15,
            "cov_09": 33,
            "cov_10": 19,
            "cov_11": 13,
            "cov_12": 8,
            "cov_13": 8,
            "cov_14": 8,
            "cov_15": 59,
            "cov_16": 16,
            "cov_17": 4,
            "cov_18": 2,
            "cov_19": 1,
            "cov_20": 3
        },
        {
            "qty_pct": 95,
            "cov_01": 0,
            "cov_02": 0,
            "cov_03": 0,
            "cov_04": 0,
            "cov_05": 1,
            "cov_06": 10,
            "cov_07": 24,
            "cov_08": 18,
            "cov_09": 6,
            "cov_10": 5,
            "cov_11": 3,
            "cov_12": 0,
            "cov_13": 0,
            "cov_14": 52,
            "cov_15": 100,
            "cov_16": 1,
            "cov_17": 0,
            "cov_18": 0,
            "cov_19": 0,
            "cov_20": 0
        }
    ];

    // MMC DB Data
    // let data = [
    //     {
    //         "qty_pct": 0,
    //         "cov_01": 252240,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 0,
    //         "cov_06": 0,
    //         "cov_07": 0,
    //         "cov_08": 0,
    //         "cov_09": 0,
    //         "cov_10": 0,
    //         "cov_11": 0,
    //         "cov_12": 0,
    //         "cov_13": 0,
    //         "cov_14": 0,
    //         "cov_15": 76,
    //         "cov_16": 0,
    //         "cov_17": 0,
    //         "cov_18": 1,
    //         "cov_19": 0,
    //         "cov_20": 263
    //     },
    //     {
    //         "qty_pct": 5,
    //         "cov_01": 0,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 0,
    //         "cov_06": 0,
    //         "cov_07": 0,
    //         "cov_08": 0,
    //         "cov_09": 0,
    //         "cov_10": 0,
    //         "cov_11": 0,
    //         "cov_12": 0,
    //         "cov_13": 0,
    //         "cov_14": 0,
    //         "cov_15": 0,
    //         "cov_16": 0,
    //         "cov_17": 0,
    //         "cov_18": 0,
    //         "cov_19": 0,
    //         "cov_20": 0
    //     },
    //     {
    //         "qty_pct": 10,
    //         "cov_01": 0,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 0,
    //         "cov_06": 0,
    //         "cov_07": 0,
    //         "cov_08": 0,
    //         "cov_09": 0,
    //         "cov_10": 0,
    //         "cov_11": 0,
    //         "cov_12": 0,
    //         "cov_13": 0,
    //         "cov_14": 0,
    //         "cov_15": 0,
    //         "cov_16": 0,
    //         "cov_17": 0,
    //         "cov_18": 0,
    //         "cov_19": 0,
    //         "cov_20": 0
    //     },
    //     {
    //         "qty_pct": 15,
    //         "cov_01": 201099,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 0,
    //         "cov_06": 0,
    //         "cov_07": 0,
    //         "cov_08": 0,
    //         "cov_09": 25,
    //         "cov_10": 0,
    //         "cov_11": 0,
    //         "cov_12": 0,
    //         "cov_13": 0,
    //         "cov_14": 0,
    //         "cov_15": 23,
    //         "cov_16": 0,
    //         "cov_17": 0,
    //         "cov_18": 4,
    //         "cov_19": 0,
    //         "cov_20": 163
    //     },
    //     {
    //         "qty_pct": 20,
    //         "cov_01": 0,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 0,
    //         "cov_06": 0,
    //         "cov_07": 0,
    //         "cov_08": 0,
    //         "cov_09": 0,
    //         "cov_10": 0,
    //         "cov_11": 0,
    //         "cov_12": 0,
    //         "cov_13": 0,
    //         "cov_14": 0,
    //         "cov_15": 0,
    //         "cov_16": 0,
    //         "cov_17": 0,
    //         "cov_18": 0,
    //         "cov_19": 0,
    //         "cov_20": 0
    //     },
    //     {
    //         "qty_pct": 25,
    //         "cov_01": 72372,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 25676,
    //         "cov_06": 0,
    //         "cov_07": 11,
    //         "cov_08": 0,
    //         "cov_09": 0,
    //         "cov_10": 3,
    //         "cov_11": 12,
    //         "cov_12": 0,
    //         "cov_13": 1,
    //         "cov_14": 0,
    //         "cov_15": 33,
    //         "cov_16": 0,
    //         "cov_17": 11,
    //         "cov_18": 6,
    //         "cov_19": 0,
    //         "cov_20": 64
    //     },
    //     {
    //         "qty_pct": 30,
    //         "cov_01": 50996,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 9344,
    //         "cov_06": 5,
    //         "cov_07": 0,
    //         "cov_08": 5997,
    //         "cov_09": 18,
    //         "cov_10": 0,
    //         "cov_11": 0,
    //         "cov_12": 5,
    //         "cov_13": 11,
    //         "cov_14": 13,
    //         "cov_15": 12,
    //         "cov_16": 1,
    //         "cov_17": 3,
    //         "cov_18": 2,
    //         "cov_19": 2,
    //         "cov_20": 46
    //     },
    //     {
    //         "qty_pct": 35,
    //         "cov_01": 58400,
    //         "cov_02": 0,
    //         "cov_03": 9265,
    //         "cov_04": 5497,
    //         "cov_05": 4234,
    //         "cov_06": 0,
    //         "cov_07": 1856,
    //         "cov_08": 2,
    //         "cov_09": 2267,
    //         "cov_10": 9,
    //         "cov_11": 5,
    //         "cov_12": 8,
    //         "cov_13": 7,
    //         "cov_14": 2,
    //         "cov_15": 27,
    //         "cov_16": 1,
    //         "cov_17": 0,
    //         "cov_18": 2,
    //         "cov_19": 1,
    //         "cov_20": 50
    //     },
    //     {
    //         "qty_pct": 40,
    //         "cov_01": 22047,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 5124,
    //         "cov_05": 3912,
    //         "cov_06": 2599,
    //         "cov_07": 721,
    //         "cov_08": 0,
    //         "cov_09": 745,
    //         "cov_10": 2962,
    //         "cov_11": 10,
    //         "cov_12": 0,
    //         "cov_13": 2,
    //         "cov_14": 3,
    //         "cov_15": 3,
    //         "cov_16": 5,
    //         "cov_17": 5,
    //         "cov_18": 0,
    //         "cov_19": 2,
    //         "cov_20": 24
    //     },
    //     {
    //         "qty_pct": 45,
    //         "cov_01": 193065,
    //         "cov_02": 1896,
    //         "cov_03": 10832,
    //         "cov_04": 14264,
    //         "cov_05": 6495,
    //         "cov_06": 5193,
    //         "cov_07": 7441,
    //         "cov_08": 3222,
    //         "cov_09": 1621,
    //         "cov_10": 1025,
    //         "cov_11": 1549,
    //         "cov_12": 390,
    //         "cov_13": 99,
    //         "cov_14": 11,
    //         "cov_15": 54,
    //         "cov_16": 7,
    //         "cov_17": 4,
    //         "cov_18": 6,
    //         "cov_19": 3,
    //         "cov_20": 128
    //     },
    //     {
    //         "qty_pct": 50,
    //         "cov_01": 0,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 0,
    //         "cov_06": 0,
    //         "cov_07": 0,
    //         "cov_08": 0,
    //         "cov_09": 0,
    //         "cov_10": 0,
    //         "cov_11": 0,
    //         "cov_12": 0,
    //         "cov_13": 0,
    //         "cov_14": 0,
    //         "cov_15": 0,
    //         "cov_16": 0,
    //         "cov_17": 0,
    //         "cov_18": 0,
    //         "cov_19": 0,
    //         "cov_20": 0
    //     },
    //     {
    //         "qty_pct": 55,
    //         "cov_01": 0,
    //         "cov_02": 0,
    //         "cov_03": 0,
    //         "cov_04": 0,
    //         "cov_05": 0,
    //         "cov_06": 0,
    //         "cov_07": 0,
    //         "cov_08": 0,
    //         "cov_09": 0,
    //         "cov_10": 0,
    //         "cov_11": 0,
    //         "cov_12": 0,
    //         "cov_13": 0,
    //         "cov_14": 0,
    //         "cov_15": 0,
    //         "cov_16": 0,
    //         "cov_17": 0,
    //         "cov_18": 0,
    //         "cov_19": 0,
    //         "cov_20": 0
    //     },
    //     {
    //         "qty_pct": 60,
    //         "cov_01": 13243,
    //         "cov_02": 4021,
    //         "cov_03": 7326,
    //         "cov_04": 10668,
    //         "cov_05": 13299,
    //         "cov_06": 6149,
    //         "cov_07": 5980,
    //         "cov_08": 4619,
    //         "cov_09": 2282,
    //         "cov_10": 4004,
    //         "cov_11": 1249,
    //         "cov_12": 3823,
    //         "cov_13": 1038,
    //         "cov_14": 327,
    //         "cov_15": 170,
    //         "cov_16": 41,
    //         "cov_17": 19,
    //         "cov_18": 5,
    //         "cov_19": 2,
    //         "cov_20": 58
    //     },
    //     {
    //         "qty_pct": 65,
    //         "cov_01": 86403,
    //         "cov_02": 410,
    //         "cov_03": 798,
    //         "cov_04": 1296,
    //         "cov_05": 2823,
    //         "cov_06": 1105,
    //         "cov_07": 692,
    //         "cov_08": 1003,
    //         "cov_09": 347,
    //         "cov_10": 325,
    //         "cov_11": 183,
    //         "cov_12": 179,
    //         "cov_13": 145,
    //         "cov_14": 48,
    //         "cov_15": 75,
    //         "cov_16": 19,
    //         "cov_17": 20,
    //         "cov_18": 8,
    //         "cov_19": 1,
    //         "cov_20": 65
    //     },
    //     {
    //         "qty_pct": 70,
    //         "cov_01": 33650,
    //         "cov_02": 1546,
    //         "cov_03": 2850,
    //         "cov_04": 6146,
    //         "cov_05": 19524,
    //         "cov_06": 4228,
    //         "cov_07": 3925,
    //         "cov_08": 3023,
    //         "cov_09": 2333,
    //         "cov_10": 1370,
    //         "cov_11": 1013,
    //         "cov_12": 1197,
    //         "cov_13": 1016,
    //         "cov_14": 427,
    //         "cov_15": 264,
    //         "cov_16": 147,
    //         "cov_17": 108,
    //         "cov_18": 35,
    //         "cov_19": 22,
    //         "cov_20": 56
    //     },
    //     {
    //         "qty_pct": 75,
    //         "cov_01": 22252,
    //         "cov_02": 1052,
    //         "cov_03": 2972,
    //         "cov_04": 4663,
    //         "cov_05": 10972,
    //         "cov_06": 4712,
    //         "cov_07": 3484,
    //         "cov_08": 5801,
    //         "cov_09": 1996,
    //         "cov_10": 1348,
    //         "cov_11": 1271,
    //         "cov_12": 687,
    //         "cov_13": 732,
    //         "cov_14": 612,
    //         "cov_15": 335,
    //         "cov_16": 242,
    //         "cov_17": 169,
    //         "cov_18": 100,
    //         "cov_19": 69,
    //         "cov_20": 149
    //     },
    //     {
    //         "qty_pct": 80,
    //         "cov_01": 26669,
    //         "cov_02": 741,
    //         "cov_03": 7814,
    //         "cov_04": 13427,
    //         "cov_05": 8208,
    //         "cov_06": 5591,
    //         "cov_07": 6731,
    //         "cov_08": 2179,
    //         "cov_09": 3067,
    //         "cov_10": 2800,
    //         "cov_11": 1101,
    //         "cov_12": 774,
    //         "cov_13": 661,
    //         "cov_14": 668,
    //         "cov_15": 297,
    //         "cov_16": 270,
    //         "cov_17": 190,
    //         "cov_18": 138,
    //         "cov_19": 100,
    //         "cov_20": 275
    //     },
    //     {
    //         "qty_pct": 85,
    //         "cov_01": 20681,
    //         "cov_02": 2169,
    //         "cov_03": 6684,
    //         "cov_04": 15092,
    //         "cov_05": 8116,
    //         "cov_06": 7603,
    //         "cov_07": 5248,
    //         "cov_08": 4431,
    //         "cov_09": 2870,
    //         "cov_10": 2037,
    //         "cov_11": 1444,
    //         "cov_12": 1592,
    //         "cov_13": 943,
    //         "cov_14": 851,
    //         "cov_15": 407,
    //         "cov_16": 285,
    //         "cov_17": 287,
    //         "cov_18": 186,
    //         "cov_19": 110,
    //         "cov_20": 468
    //     },
    //     {
    //         "qty_pct": 90,
    //         "cov_01": 13594,
    //         "cov_02": 2606,
    //         "cov_03": 6536,
    //         "cov_04": 12093,
    //         "cov_05": 12956,
    //         "cov_06": 8921,
    //         "cov_07": 6852,
    //         "cov_08": 5282,
    //         "cov_09": 3737,
    //         "cov_10": 2606,
    //         "cov_11": 1930,
    //         "cov_12": 1458,
    //         "cov_13": 1206,
    //         "cov_14": 1061,
    //         "cov_15": 726,
    //         "cov_16": 458,
    //         "cov_17": 396,
    //         "cov_18": 296,
    //         "cov_19": 238,
    //         "cov_20": 980
    //     },
    //     {
    //         "qty_pct": 95,
    //         "cov_01": 6306,
    //         "cov_02": 1730,
    //         "cov_03": 4793,
    //         "cov_04": 9098,
    //         "cov_05": 10322,
    //         "cov_06": 9776,
    //         "cov_07": 8205,
    //         "cov_08": 6541,
    //         "cov_09": 4915,
    //         "cov_10": 3685,
    //         "cov_11": 2737,
    //         "cov_12": 2075,
    //         "cov_13": 1601,
    //         "cov_14": 1480,
    //         "cov_15": 1023,
    //         "cov_16": 823,
    //         "cov_17": 681,
    //         "cov_18": 558,
    //         "cov_19": 447,
    //         "cov_20": 2470
    //     }
    // ];

    data.columns = [
        "qty_pct",
        "cov_01",
        "cov_02",
        "cov_03",
        "cov_04",
        "cov_05",
        "cov_06",
        "cov_07",
        "cov_08",
        "cov_09",
        "cov_10",
        "cov_11",
        "cov_12",
        "cov_13",
        "cov_14",
        "cov_15",
        "cov_16",
        "cov_17",
        "cov_18",
        "cov_19",
        "cov_20"
    ]

    return (
        <div>
            <HeatMap data={data} size={[800, 500]}/>
        </div>
    );
}

export default App;