"use server";

import Image from 'next/image'
import styles from './page.module.css'
import { Center, Spinner, Text, Button, Divider, Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'

import starknetjsImg from "../../public/Images/StarkNet-JS_navbar.png";
import { DisplayConnected } from './components/client/DisplayConnected';

export default async function Page() {

    return (
        <ChakraProvider>
            <Box bg="gray.300" color="black" minH="100vh" p={4}>
                <div>
                    <p className={styles.bgText}>
                        Autonomous Audio
                    </p>
                    <Center>
                        <Image src={starknetjsImg} alt='starknet.js' width={150} />
                    </Center>
                    <p className={styles.bgText}>
                        Connect to Sepolia testnet network
                    </p>
                    <div>
                        <DisplayConnected></DisplayConnected>
                    </div>
                </div>
            </Box>
        </ChakraProvider>
    )
}


