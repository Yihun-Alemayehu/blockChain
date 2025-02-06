App = {
    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
    },

    loadWeb3: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("User denied account access", error);
            }
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    },

    loadAccount: async () => {
        const accounts = await web3.eth.getAccounts();
        App.account = accounts[0];
        console.log("Account:", App.account);
    }
};

App.load();
