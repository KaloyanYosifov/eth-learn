export const solidityError = message => `Returned error: VM Exception while processing transaction: revert ${message} -- Reason given: ${message}.`;
export const getKokoBalanceFromAddress = async (token, address) => Number(web3.utils.fromWei(await token.balanceOf(address)));
