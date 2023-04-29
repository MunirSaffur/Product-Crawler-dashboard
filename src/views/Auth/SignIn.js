import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import { useHistory } from "react-router-dom";

function SignIn() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const handleUserInfo = (target) => {
    const newUseInfo = {...userInfo, [target.name]: target.value};
    setUserInfo(newUseInfo);
  };

  // LogIn Handler
  const logInHandler = () => {
    new Promise(function(resolve, reject) {
      
      // Setting 2000 ms time
      setTimeout(
        resolve(userInfo.email === "monirsaffor@gmail.com" ?
      localStorage.setItem("account_type", "demo") :
      localStorage.setItem("account_type", "live")
      ), 2000);
      }).then(function() {
        history.push("/admin/dashboard");
      })
    .catch(err=>console.log(err))
  }
  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Welcome Back
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              Enter your email and password to sign in
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Email
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='email'
                placeholder='Your email adress'
                size='lg'
                name='email'
                onChange={(e)=>{handleUserInfo(e.target)}}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Password
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                placeholder='Your password'
                size='lg'
                name='password'
                onChange={(e)=>{handleUserInfo(e.target)}}
              />
                <Button
                fontSize='16px'
                type='submit'
                bg='teal.300'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
                onClick={()=>{logInHandler()}}>
                SIGN IN
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'>
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
