import {fromToCharsData} from "./fromToCharsData";

export const loopChars = (Game) => {
    return {
        BabaYaga: {
            leftVideo: 'BabaYaga_Eier',
            centerVideo: 'BabaYaga_Portal',
            rightVideo: 'BabaYaga_Main',
            leftBtnName: 'Eggs',
            leftFunction: () => {
                Game.generalFromTo(fromToCharsData.babyYagaEier)
            },
            rightBtnName: 'Chupacabra',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.babaYagaMain)
            },
        },
        Basilisk: {
            leftVideo: 'Basilisk_Wolpertinger',
            centerVideo: 'Basilisk_Portal',
            rightVideo: 'Basilisk_Yeti',
            leftBtnName: 'Wolpertinger',
            leftFunction: () => {
                Game.generalFromTo(fromToCharsData.basiliskWolpertinger)
            },
            rightBtnName: 'Yeti',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.basiliskYeti)
            },
        },
        Baum: {
            leftVideo: 'Baum_BabaYaga',
            centerVideo: 'Baum_Portal',
            rightVideo: 'Baum_Basilisk',
            leftBtnName: 'BabaYaga',
            leftFunction: () => {
                Game.generalFromTo(fromToCharsData.baumBabaYaga)
            },
            rightBtnName: 'Basilisk',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.baumBasilisk)
            },
        },
        Eier: {
            leftVideo: 'Eier_Nessie',
            centerVideo: 'Eier_Portal',
            rightVideo: 'Eier_Wolpertinger',
            leftBtnName: 'Nessie',
            leftFunction: () => {
                Game.generalFromTo(fromToCharsData.eierNessie)
            },
            rightBtnName: 'Wolpertinger',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.eierWolpertinger)
            },
        },
        Jobold: {
            leftVideo: 'Jobold_Baum',
            centerVideo: 'Jobold_Portal',
            rightVideo: 'Jobold_Yeti',
            leftBtnName: 'Tree',
            leftFunction: () => {
                Game.generalFromTo(fromToCharsData.joboldBaum)
            },
            rightBtnName: 'Yeti',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.joboldYeti)
            },
        },
        Main: {
            leftVideo: 'Main_Basilisk',
            centerVideo: 'Main_Portal',
            rightVideo: 'Main_Eier',
            leftBtnName: 'Basilisk',
            leftFunction: () => {

                Game.generalFromTo(fromToCharsData.mainBasilisk)
            },
            rightBtnName: 'Eggs',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.mainEier)
            },
        },
        Nessie: {
            leftVideo: 'Nessie_Jobold',
            centerVideo: 'Nessie_Portal',
            rightVideo: 'Nessie_Main',
            leftBtnName: 'Joblin',
            leftFunction: () => {
                Game.generalFromTo(fromToCharsData.nessieJobold)
            },
            rightBtnName: 'Chupacabra',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.nessieMain)
            },
        },
        Wolpertinger: {
            leftVideo: 'Wolpertinger_BabaYaga',
            centerVideo: 'Wolpertinger_Portal',
            rightVideo: 'Wolpertinger_Baum',
            leftBtnName: 'BabaYaga',
            leftFunction: () => {
                Game.generalFromTo(fromToCharsData.wolpertingerBabaYaga)
            },
            rightBtnName: 'Tree',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.wolpertingerBaum)
            },
        },
        Yeti: {
            leftVideo: 'Yeti_Baum',
            centerVideo: 'Yeti_Portal',
            rightVideo: 'Yeti_Nessie',
            leftBtnName: 'Tree',
            leftFunction: () => {
                Game.generalFromTo(fromToCharsData.yetiBaum)
            },
            rightBtnName: 'Nessie',
            rightFunction: () => {
                Game.generalFromTo(fromToCharsData.yetiNessie)
            },
        }
    }
}