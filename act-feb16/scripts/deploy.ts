import { ethers } from "hardhat";

async function main() {

  const token = await ethers.deployContract("KitCat", ["0xddae93c5aE62BAf023ACd348662F13c98f8d0731"]);

  await token.waitForDeployment();

  console.log(
    `Token deployed to ${token.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
