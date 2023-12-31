const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    
    // We pass in "ninja" to the constructor when deploying
    const domainContract = await domainContractFactory.deploy("ninja");
    //await domainContract.deployed();

    console.log("Contract deployed to:", await domainContract.getAddress());

    
    // We're passing in a second variable - value. This is the moneyyyyyyyyyy
    let txn = await domainContract.register("mortal",  {value: hre.ethers.parseEther('0.1')});
    await txn.wait();

    const address = await domainContract.getAddress("mortal");
    console.log("Owner of domain mortal:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.getAddress());
    console.log("Contract balance:", hre.ethers.formatEther(balance));
  }

  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
