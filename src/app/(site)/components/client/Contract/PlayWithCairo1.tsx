import { useEffect, useState } from 'react';
import { Account, Contract, InvokeFunctionResponse, GetTransactionReceiptResponse } from "starknet";

import { useStoreBlock } from "../Block/blockContext";
import { useStoreWallet } from '../ConnectWallet/walletContext';

import { Button, Center, Box, Grid, Spinner } from "@chakra-ui/react";
import styles from '../../../page.module.css'

import { test1Abi } from "../../../contracts/abis/test1";
import TransactionStatus from '../Transaction/TransactionStatus';
import { addrTESTCONTRACT } from '@/type/constants';

const contractAddress = addrTESTCONTRACT;

export default function PlayWithCairo1() {
    // wallet context
    const walletAccountFromContext = useStoreWallet(state => state.myWalletAccount);

    // block context
    const blockFromContext = useStoreBlock(state => state.dataBlock);

    // Component context
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [transactionResult, setTransactionResult] = useState<GetTransactionReceiptResponse | undefined>(undefined);
    const [isPolling, setIsPolling] = useState<boolean>(false);

    const [cairo1Contract, setcairo1Contract] = useState<Contract>(new Contract(test1Abi, contractAddress, walletAccountFromContext));

    async function increaseBalance(amount: number) {
        console.log("increase-Cairo1ReadContract=", cairo1Contract.functions);
        const myCall = cairo1Contract.populate("increase_balance", [amount]);
        console.log("Call=", myCall);
    
        try {
            const resp = await walletAccountFromContext?.execute(myCall);
            
            if (resp && resp.transaction_hash) {
                console.log("increaseBalance txH =", resp.transaction_hash);
                setTransactionHash(resp.transaction_hash);
    
                // Reset the transaction result to show the spinner
                setTransactionResult(undefined);
    
                // Start polling the transaction status
                setIsPolling(true);
                pollTransactionStatus(resp.transaction_hash);
            } else {
                console.error("Transaction response is undefined or doesn't contain a transaction_hash");
            }
        } catch (e: any) {
            console.log("error increase balance =", e);
        }
    }
    

    const pollTransactionStatus = (txHash: string) => {
        const intervalId = setInterval(async () => {
            if (walletAccountFromContext) {
                try {
                    const result = await walletAccountFromContext.waitForTransaction(txHash);
                    console.log("Transaction status updated:", result);
                    setTransactionResult(result);
    
                    // If the transaction is complete, stop polling
                    if (result && result.status === 'ACCEPTED_ON_L2') {
                        clearInterval(intervalId);
                        setIsPolling(false);
                    }
                } catch (error) {
                    console.error("Error while polling transaction status:", error);
                }
            } else {
                console.error("walletAccountFromContext is undefined, cannot wait for transaction");
                clearInterval(intervalId); // Stop polling if the wallet context is missing
            }
        }, 5000); // Polling interval in milliseconds
    };
    

    return (
        <Box bg='gray.100' color='black' borderWidth='1px' borderRadius='md' paddingBottom='3px'>
            <Grid
                templateColumns="repeat(3, 1fr)"
                gap={4}
                mt={4}
                p={4}
                bg="gray.300"
                borderRadius="md"
            >
                <Button onClick={() => increaseBalance(1)}>Sparkle</Button>
                <Button onClick={() => increaseBalance(2)}>Accelerandos</Button>
                <Button onClick={() => increaseBalance(3)}>Crackle</Button>
                <Button onClick={() => increaseBalance(4)}>Melody</Button>
                <Button onClick={() => increaseBalance(5)}>Boom</Button>
                <Button onClick={() => increaseBalance(6)}>Drone</Button>
                <Button onClick={() => increaseBalance(7)}>Chords</Button>
                <Button onClick={() => increaseBalance(8)}>Percussive</Button>
                <Button onClick={() => increaseBalance(9)}>Change Chords</Button>
            </Grid>
            {
                transactionResult === undefined ? (
                    <Center>
                    </Center>
                ) : (
                    <Box bg='gray.200' color='black' borderWidth='1px' borderColor='gray.200' borderRadius='md' p={1} margin={2}>
                        <TransactionStatus transactionHash={transactionHash}></TransactionStatus>
                    </Box>
                )
            }
        </Box>
    );
}
