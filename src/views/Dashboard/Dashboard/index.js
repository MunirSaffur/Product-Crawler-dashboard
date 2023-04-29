// Chakra imports
import {
  Flex,
  Grid,
  useColorModeValue,
  Input,
  Button,
  Text,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CheckboxGroup,
  Checkbox,
  Stack
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Card from "components/Card/Card.js";
import { tablesTableData } from "variables/general";
import MainTable from "../Tables/components/MainTable";
import DownloadFile from "components/Forms/DownloadFile";
import axios from "axios";
import SkeletonTable from "../Tables/components/SkeletonTable";
import { AttachmentIcon, ChevronDownIcon, DownloadIcon, CloseIcon } from '@chakra-ui/icons'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, SetFileType] = useState('');
  const [platformType, SetPlatformType] = useState('');
  const [excludeOptions ,setExcludeOptions] = useState([]);
  const [singleRequest, setSingleRequest] = useState('');
  const [multipleRequest, setMultipleRequest] = useState('');
  const [multipleRequestText, setMultipleRequestText] = useState('')
  const [serquestStatus, setRequestStatus] = useState(false)

  const textColor = useColorModeValue("gray.700", "white");

  // Get Single Product
  const getSingleProduct = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post('https://run.mocky.io/v3/c26aba9b-72c2-4f59-a381-1385aa71fa5f');
      setRequestStatus(true)
    } catch (error){
      console.error(error)
    } finally {
      setIsLoading(false);
      SetFileType('');
      SetPlatformType('');
      setExcludeOptions('');
      setSingleRequest('');
      setMultipleRequest('');
    }
  } 
  useEffect(()=>{
    setMultipleRequestText(
      inputFileRef.current && inputFileRef.current.value 
      ?inputFileRef.current.value.split('\\').pop() : '')
  },[multipleRequest])
  
  // Upload File
  const inputFileRef = useRef();
  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const resetFileInput = () => {
    // 👇️ reset input value
    setMultipleRequest('');
    setMultipleRequestText('');
    inputFileRef.current.value = null;
    console.log(multipleRequestText)
    console.log(multipleRequest)
  };

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <Text fontSize='lg' color={textColor} fontWeight='bold'>Get your products</Text>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.5fr 1.5fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        mt='16px'
        mb='8px'
        gap='24px'>
        <Card p='1.2rem'> 

          {/* Single Request */}
            <Input placeholder='Inter product link' onChange={(e)=> setSingleRequest(e.target.value)} disabled={multipleRequest}/>
          {/* Single Request */}

          <Center>
            <Text fontSize='lg' color='gray.400'>- or -</Text>
          </Center>

          {/* Multiple Request */}
            <Flex>
            <Button onClick={onBtnClick} borderRadius="md" className="uplodFiless" leftIcon={<AttachmentIcon />} color={inputFileRef.current && inputFileRef.current.value ? 'green' : 'black'} disabled={singleRequest || localStorage.getItem("account_type") === 'demo'}>
              { multipleRequestText.length ? multipleRequestText : 'Upload Your File'} 
              { localStorage.getItem("account_type") === 'demo' ? <span className="ProMultipleRequest">Pro</span> : <></>}
            </Button>
            <Button onClick={()=>{resetFileInput()}} height="100%" ml="2" borderRadius="md" disabled={localStorage.getItem("account_type") === 'demo'}><CloseIcon/></Button>
            </Flex>
            <Input ref={inputFileRef} type="file" display='none' onChange={(e)=>setMultipleRequest(e.target.value)}/>
            <DownloadFile ms="3" right="0"/>
          {/* Multiple Request */}

        </Card>
        <Card p='1.2rem'>
          {/* Select File Type */}
            <Menu ms="3">
              <MenuButton  borderRadius="md" as={Button} rightIcon={<ChevronDownIcon />}>
              { fileType === '' ? 'Select file type' : fileType }
              </MenuButton>
              <MenuList>
                { ['excel', 'csv', 'xlsx'].map((item, index)=>(
                  <MenuItem key={index} onClick={()=>SetFileType(item)} style={{textTransform:'capitalize'}}>{item}</MenuItem>
                )) }
              </MenuList>
            </Menu>
          {/* Select File Type */}

          {/* Select Platform Type */}
          <Menu>
              <MenuButton my="18px" borderRadius="md" as={Button} rightIcon={<ChevronDownIcon />}>
              { platformType === '' ? 'Select Platform type' : platformType }
              </MenuButton>
              <MenuList>
                { ['shopify', 'wordpress', 'opencart'].map((item, index)=>(
                  <MenuItem key={index} onClick={()=>SetPlatformType(item)} style={{textTransform:'capitalize'}}>{item}</MenuItem>
                )) }
              </MenuList>
            </Menu>
          {/* Select File Type */}

          {/* Exclude Options */}
          <Text fontSize='lg'>Exclude: </Text>
          <CheckboxGroup colorScheme='green' onChange={(e)=>{setExcludeOptions(e)}}>
            <Stack spacing={[5, 3]} direction={['row', 'row']}>
              { ['sku', 'color', 'size'].map((item, index)=>(
                 <Checkbox key={index} value={item} style={{textTransform:'capitalize'}}>{item}</Checkbox>
              )) }
            </Stack>
          </CheckboxGroup>

        </Card>
      </Grid>
      {/* Request Action */}
        <Center>
          <Button colorScheme='teal' borderRadius="md" mt="4" mb='6' px="50px" width="fit-content" onClick={()=>getSingleProduct()} leftIcon={<DownloadIcon />} disabled={multipleRequest === '' && singleRequest === '' || fileType === '' || platformType === ''}>
            Start Proccess
          </Button>
        </Center>
      {/* Request Action */}
      <Center>

      {
        serquestStatus && !isLoading ?
        <Center>
          <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='250px'
            width='600px'
            mb="24px"
            pt="0"
          >
            <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_rwkblgnp.json"
                style={{ height: '100px', width: '100px' }}
              >
              </Player>
            <AlertTitle mb={1} fontSize='lg'>
              Proccess has ben started!
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
            We have recieved your request, the product/s file will be sent to your E-mail
            </AlertDescription>
          </Alert>
        </Center> :
        <></>
      }
      
        
      </Center>
      { isLoading ? 
      <SkeletonTable/>
       : 
      <MainTable
        title={"Your Request List"}
        captions={["Order Id", "Creating Date", "Status", "Result"]}
        data={tablesTableData}
      />

      }
    </Flex>
  );
}
