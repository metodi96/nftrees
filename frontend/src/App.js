import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import AppContext from './appContext';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import About from './pages/About'
import Create from './pages/Create'
import Explore from './pages/Explore'
import {
  getGreenCollectibleContractInstance
} from './utils/contracts'
import { fetchConversionRate } from './utils/conversionRate';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MyItems from './pages/MyItems';
import Dimmer from './components/Dimmer';

function App({ web3 }) {

  const [account, setAccount] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [hasWalletAddressAfterChange, setHasWalletAddressAfterChange] = useState(false);
  const [hasAccountChanged, setHasAccountChanged] = useState(false);
  const [screenBlocked, setScreenBlocked] = useState(false);
  const [greenCollectibleContract, setGreenCollectibleContract] = useState(undefined)
  const [reasonForBlockedScreen, setReasonForBlockedScreen] = useState('TX')
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1280);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });


  useEffect(() => {
    setInterval(() => {
      fetchConversionRate();
    }, 1000 * 60 * 15);
  }, []);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const [selectedAccount] = await web3.eth.getAccounts();
        setAccount(web3.utils.toChecksumAddress(selectedAccount));
        window.ethereum.on('accountsChanged', (accounts) => {
          console.log('Account changed...')
          setHasAccountChanged(true);
          if (!accounts[0]) {
            setHasWalletAddressAfterChange(false);
          } else {
            setHasWalletAddressAfterChange(true);
            setAccount(accounts[0]);
          }
        });
        window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
      }
    };
    init();
  }, [web3.utils, web3.eth]);

  useEffect(() => {
    const runEffect = async () => {
      if (window.ethereum) {
        const networkDetected = await web3.eth.net.getId();
        setNetworkId(networkDetected);
        if (networkId !== 5777 && networkId !== 4) {
          handleBlockScreen(true, 'NETWORK')
        } else {
          handleBlockScreen(false, 'NETWORK')
        }
      } else {
        handleBlockScreen(true, 'NETWORK')
      }
    } 
    runEffect()
  }, [networkId, web3.eth.net])

  useEffect(() => {
    const greenCollectibleContract = getGreenCollectibleContractInstance(web3)
    console.log(greenCollectibleContract)
    setGreenCollectibleContract(greenCollectibleContract)
  }, [web3])

  const handleBlockScreen = (blocked, reason='TX') => {
    setReasonForBlockedScreen(reason)
    setScreenBlocked(blocked);
  };

  const handleAccountChanged = (newHasAccountChanged) => {
    setHasAccountChanged(newHasAccountChanged);
  };

  return (
    <AppContext.Provider value={{
      web3,
      handleBlockScreen,
      screenBlocked,
      account,
      hasWalletAddressAfterChange,
      hasAccountChanged,
      handleAccountChanged,
      networkId,
      greenCollectibleContract,
      isDesktop
    }}
    >
      <div className='cursive flex flex-col h-screen justify-between'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Explore} />
          <Route path='/create' exact component={Create} />
          <Route path='/my-items' exact component={MyItems} />
          <Route path='/about' exact component={About} />
        </Switch>
        <ToastContainer autoClose={5000} />
        {screenBlocked && <Dimmer reason={reasonForBlockedScreen} />}
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
