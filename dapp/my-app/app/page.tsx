"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";
export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };

  const setData = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.setData("Hello Baby");
      await tx.wait();
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Transaction failed: ${decodedError?.args}`);
    }
  };

  const getData = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.data();
      alert(tx);

      setcurrentData(tx);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Transaction failed: ${decodedError?.args}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-72">
      <section>
        <button
        onClick={() => {
          connectWallet();
        }}
        className="p-4 bg-slate-800 text-white rounded"
      >
        {walletKey != "" ? walletKey : "Connect wallet"}
      </button>

      <button
        onClick={() => {
          getData();
        }}
        className="p-4 bg-slate-800 text-white rounded"
      >
        Get Data
      </button>

      <button
        onClick={() => {
          setData();
        }}
        className="p-4 bg-slate-800 text-white rounded"
      >
        Set Data
      </button>
      {currentData}
      </section>
    </main>
  );
}