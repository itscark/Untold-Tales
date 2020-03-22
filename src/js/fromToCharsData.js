const assetConfig = {
    babaYaga: {
        loopCam: 'BabaYaga',
        asset: 'BabaYaga',
        setScale: false,
        scale: '',
        setPosition: false,
        xPosition: '',
        yPosition: '',
        zPosition: '',
        setRotation: false,
        axis: '',
        rotation: '',
        boxPosition: 'left'
    },
    basilisk: {
        loopCam: 'Basilisk',
        asset: 'Basilisk',
        setScale: false,
        scale: '',
        setPosition: false,
        xPosition: '',
        yPosition: '',
        zPosition: '',
        setRotation: false,
        axis: '',
        rotation: '',
        boxPosition: 'left'
    },
    baum: {
        loopCam: 'Baum',
        asset: 'Baum',
        setScale: false,
        scale: '',
        setPosition: false,
        xPosition: '',
        yPosition: '',
        zPosition: '',
        setRotation: false,
        axis: '',
        rotation: '',
        boxPosition: 'left'
    },
    eier: {
        loopCam: 'Eier',
        asset: 'Eier',
        setScale: false,
        scale: '',
        setPosition: false,
        xPosition: '',
        yPosition: '',
        zPosition: '',
        setRotation: false,
        axis: '',
        rotation: '',
        boxPosition: 'left'
    },
    jobold:{
        loopCam: 'Jobold',
        asset: 'Jobold',
        setScale: false,
        scale: '',
        setPosition: false,
        xPosition: '',
        yPosition: '',
        zPosition: '',
        setRotation: false,
        axis: '',
        rotation: '',
        boxPosition: 'left'
    },
    main: {
        loopCam: 'Main',
        asset: 'Chupacabra',
        setScale: true,
        scale: 3,
        setPosition: true,
        xPosition: 3,
        yPosition: -2,
        zPosition: 2,
        setRotation: true,
        axis: BABYLON.Axis.Y,
        rotation: 31.5 / Math.PI,
        boxPosition: 'left'
    },
    nessie:{
        loopCam: 'Nessie',
        asset: 'Nessie',
        setScale: true,
        scale: 35,
        setPosition: true,
        xPosition: 0.5,
        yPosition: -2.4,
        zPosition: -1,
        setRotation: true,
        axis: BABYLON.Axis.Y,
        rotation: Math.PI / 3.5
    },
    wolpertinger:{
        loopCam: 'Wolpertinger',
        asset: 'Wolpertinger',
        setScale: true,
        scale: 46,
        setPosition: true,
        xPosition: -0.2,
        yPosition: -1.2,
        zPosition: -1,
        setRotation: false,
        axis: '',
        rotation: '',
        boxPosition: 'left'
    },
    yeti:{
        loopCam: 'Yeti',
        asset: 'Yeti',
        setScale: true,
        scale: 0.6,
        setPosition: true,
        xPosition: 0.5,
        yPosition: -2.4,
        zPosition: -1,
        setRotation: false,
        axis: '',
        rotation: '',
        boxPosition: 'left'
    }
};
export const fromToCharsData = {
    portalMain: {
        video: 'bgPlane',
        assetConfig: assetConfig['main']
    },
    babyYagaEier: {
        video: 'left',
        assetConfig: assetConfig['eier']
    },
    babaYagaMain: {
        video: 'right',
        assetConfig: assetConfig['main']
    },
    basiliskWolpertinger: {
        video: 'left',
        assetConfig: assetConfig['wolpertinger']
    },
    basiliskYeti: {
        video: 'right',
        assetConfig: assetConfig['yeti']
    },
    baumBabaYaga: {
        video: 'left',
        assetConfig: assetConfig['babaYaga']
    },
    baumBasilisk: {
        video: 'right',
        assetConfig: assetConfig['basilisk']
    },
    eierNessie: {
        video: 'left',
        assetConfig: assetConfig['nessie']
    },
    eierWolpertinger: {
        video: 'right',
        assetConfig: assetConfig['wolpertinger']
    },
    joboldBaum: {
        video: 'left',
        assetConfig: assetConfig['baum']
    },
    joboldYeti: {
        video: 'right',
        assetConfig: assetConfig['yeti']
    },
    mainBasilisk: {
        video: 'left',
        assetConfig: assetConfig['basilisk']
    },
    mainEier: {
        video: 'right',
        assetConfig: assetConfig['eier']
    },
    nessieJobold: {
        video: 'left',
        assetConfig: assetConfig['jobold']
    },
    nessieMain: {
        video: 'right',
        assetConfig: assetConfig['main']
    },
    wolpertingerBabaYaga: {
        video: 'left',
        assetConfig: assetConfig['babaYaga']
    },
    wolpertingerBaum: {
        video: 'right',
        assetConfig: assetConfig['baum']
    },
    yetiBaum: {
        video: 'left',
        assetConfig: assetConfig['baum']
    },
    yetiNessie: {
        video: 'right',
        assetConfig: assetConfig['nessie']
    }
};
