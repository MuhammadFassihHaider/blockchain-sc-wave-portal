import hre from "hardhat";
import { WavePortal } from "../typechain-types";

const main = async () => {
    const [owner, person1] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory(
        "WavePortal"
    );
    const waveContract =
        (await waveContractFactory.deploy()) as any as WavePortal;
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;

    waveCount = await waveContract.waves(person1.address);

    console.log({ waveCount });

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveTxn = await waveContract.connect(person1).wave();
    await waveTxn.wait();

    waveCount = await waveContract.waves(person1.address);

    console.log({ waveCount });
};

const runMain = async () => {
    try {
        await main();
    } catch (error) {
        console.log(error);
    }
};

runMain();
