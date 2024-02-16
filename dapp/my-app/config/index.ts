import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xb940b1a79367bdd645eedcbaa8328cbd1b7bd7fe",
        abi as any,
        signer
    );
}