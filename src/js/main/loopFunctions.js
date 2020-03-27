import {fromToFunctions} from "./fromToFunctions";
//after the from to video is playing the loop function will be loaded
//it needs to set the needed videos for the next options the user has
export const loopFunctions = (Game) => {
    return {
        BabaYaga: {
            leftVideo: 'BabaYaga_Eier',
            centerVideo: 'BabaYaga_Portal',
            rightVideo: 'BabaYaga_Main',
            leftBtnName: 'Eggs',
            leftFunction: () => {
                Game.generalFromTo(fromToFunctions.babyYagaEier)
            },
            rightBtnName: 'Chupacabra',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.babaYagaMain)
            },
        },
        Basilisk: {
            leftVideo: 'Basilisk_Wolpertinger',
            centerVideo: 'Basilisk_Portal',
            rightVideo: 'Basilisk_Yeti',
            leftBtnName: 'Wolpertinger',
            leftFunction: () => {
                Game.generalFromTo(fromToFunctions.basiliskWolpertinger)
            },
            rightBtnName: 'Yeti',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.basiliskYeti)
            },
        },
        Baum: {
            leftVideo: 'Baum_BabaYaga',
            centerVideo: 'Baum_Portal',
            rightVideo: 'Baum_Basilisk',
            leftBtnName: 'BabaYaga',
            leftFunction: () => {
                Game.generalFromTo(fromToFunctions.baumBabaYaga)
            },
            rightBtnName: 'Basilisk',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.baumBasilisk)
            },
        },
        Eier: {
            leftVideo: 'Eier_Nessie',
            centerVideo: 'Eier_Portal',
            rightVideo: 'Eier_Wolpertinger',
            leftBtnName: 'Nessie',
            leftFunction: () => {
                Game.generalFromTo(fromToFunctions.eierNessie)
            },
            rightBtnName: 'Wolpertinger',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.eierWolpertinger)
            },
        },
        Jobold: {
            leftVideo: 'Jobold_Baum',
            centerVideo: 'Jobold_Portal',
            rightVideo: 'Jobold_Yeti',
            leftBtnName: 'Tree',
            leftFunction: () => {
                Game.generalFromTo(fromToFunctions.joboldBaum)
            },
            rightBtnName: 'Yeti',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.joboldYeti)
            },
        },
        Main: {
            leftVideo: 'Main_Basilisk',
            centerVideo: 'Main_Portal',
            rightVideo: 'Main_Eier',
            leftBtnName: 'Basilisk',
            leftFunction: () => {

                Game.generalFromTo(fromToFunctions.mainBasilisk)
            },
            rightBtnName: 'Eggs',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.mainEier)
            },
        },
        Nessie: {
            leftVideo: 'Nessie_Jobold',
            centerVideo: 'Nessie_Portal',
            rightVideo: 'Nessie_Main',
            leftBtnName: 'Joblin',
            leftFunction: () => {
                Game.generalFromTo(fromToFunctions.nessieJobold)
            },
            rightBtnName: 'Chupacabra',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.nessieMain)
            },
        },
        Wolpertinger: {
            leftVideo: 'Wolpertinger_BabaYaga',
            centerVideo: 'Wolpertinger_Portal',
            rightVideo: 'Wolpertinger_Baum',
            leftBtnName: 'BabaYaga',
            leftFunction: () => {
                Game.generalFromTo(fromToFunctions.wolpertingerBabaYaga)
            },
            rightBtnName: 'Tree',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.wolpertingerBaum)
            },
        },
        Yeti: {
            leftVideo: 'Yeti_Baum',
            centerVideo: 'Yeti_Portal',
            rightVideo: 'Yeti_Nessie',
            leftBtnName: 'Tree',
            leftFunction: () => {
                Game.generalFromTo(fromToFunctions.yetiBaum)
            },
            rightBtnName: 'Nessie',
            rightFunction: () => {
                Game.generalFromTo(fromToFunctions.yetiNessie)
            },
        }
    }
};