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

function App({ web3 }) {

  const [account, setAccount] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [hasWalletAddressAfterChange, setHasWalletAddressAfterChange] = useState(false);
  const [hasAccountChanged, setHasAccountChanged] = useState(false);
  const [screenBlocked, setScreenBlocked] = useState(false);
  const [greenCollectibleContract, setGreenCollectibleContract] = useState(undefined)

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const networkId = await web3.eth.net.getId();
        setNetworkId(networkId);
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
    const greenCollectibleContract = getGreenCollectibleContractInstance(web3)
    setGreenCollectibleContract(greenCollectibleContract)
}, [web3])

  const handleBlockScreen = (blocked) => {
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
      greenCollectibleContract
    }}
    >
      <div className='cursive flex flex-col h-screen justify-between'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Explore} />
          <Route path='/create' exact component={Create} />
          <Route path='/about' exact component={About} />
        </Switch>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
