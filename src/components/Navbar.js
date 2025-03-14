
import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

const [connected, setConnected] = useState(false);
const location = useLocation();
const [currAddress, setCurrAddress] = useState('0x');

async function connectWallet() {
  const ethereumButton = document.querySelector('.enableEthereumButton');
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      setCurrAddress(address);
      setConnected(true);
      ethereumButton.textContent = "Connected";
      ethereumButton.classList.remove("bg-blue-500");
      ethereumButton.classList.add("bg-green-500");
    } catch (error) {
      console.error("Connection error:", error);
    }
  } else {
    console.log("Please install MetaMask!");
    ethereumButton.textContent = "Connect Wallet";
    ethereumButton.classList.add("bg-blue-500");
    ethereumButton.classList.remove("bg-green-500");
  }
}
useEffect(() => {
  connectWallet();
}, [location]);

useEffect(() => {
  window.addEventListener('load', connectWallet);

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setCurrAddress(accounts[0]);
        setConnected(true);
      } else {
        setCurrAddress('0x');
        setConnected(false);
      }
    });
  }
}, []);

    return (
      <div className="">
        <nav className="w-screen">
          <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            <div className='inline-block font-bold text-xl ml-2'>
Digital Will Management
            </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/marketplace">Claim Your Inheritence</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/marketplace">Claim Your Inheritence</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">Create New Will</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">Create New Will</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>              
              }  
              <li>
                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWallet}>{connected ? "Connected" : "Connect Wallet"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div className='text-white text-bold text-right mr-10 text-sm'>
                {connected ? "Connected to" : "Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0, 15) + '...') : ""}
        </div>
      </div>
    );
  }

  export default Navbar;