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
  Link,
  Badge
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import Card from "components/Card/Card.js";
import { tablesTableData } from "variables/general";
import MainTable from "../Tables/components/MainTable";
import DownloadFile from "components/Forms/DownloadFile";
import axios from "axios";
import SkeletonTable from "../Tables/components/SkeletonTable";
import { AttachmentIcon, ChevronDownIcon, DownloadIcon } from '@chakra-ui/icons'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, SetFileType] = useState('');
  const [singleRequest, setSingleRequest] = useState('');
  const [multipleleRequest, setMultipleRequest] = useState('');
  const [disableRequest, setDisableRequest] = useState(true);
  const [responseFile, setResponseFile] = useState(null)

  const textColor = useColorModeValue("gray.700", "white");

  // Get Single Product
  const getSingleProduct = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('https://run.mocky.io/v3/c26aba9b-72c2-4f59-a381-1385aa71fa5f');
      setResponseFile(res.data);
    } catch (error){
      console.error(error)
    } finally {
      setIsLoading(false);
      SetFileType('');
      setMultipleRequest('');
      setSingleRequest('');
    }
  } 
  
  // Upload File
  const inputFileRef = useRef();
  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  useEffect(()=>{
    multipleleRequest === '' && singleRequest === '' || fileType === '' ? setDisableRequest(true) : setDisableRequest(false)
    console.log(inputFileRef.current.value.split('\\').pop())
  },[multipleleRequest, singleRequest, fileType])

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <Text fontSize='lg' color={textColor} fontWeight='bold'>Get your products</Text>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.5fr 1.5fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        mt='10px'
        gap='24px'>
          <Text fontSize='md' color={textColor} fontWeight='bold'>Step 1</Text>
          <Text fontSize='md' color={textColor} fontWeight='bold'>Step 2</Text>
        </Grid>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.5fr 1.5fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        mt='16px'
        mb='24px'
        gap='24px'>
        <Card p='1.2rem'> 
          <Input placeholder='Inter product link' onChange={(e)=> setSingleRequest(e.target.value)}/>
          <Center>
            <Text fontSize='lg' color='gray.400'>- or -</Text>
          </Center>
          <Button onClick={onBtnClick} borderRadius="md" className="uplodFiless" leftIcon={<AttachmentIcon />} color={inputFileRef.current? 'green' : 'black'}>
            { inputFileRef.current ? inputFileRef.current.value.split('\\').pop() : 'Upload Your File'}</Button>
          <Input ref={inputFileRef} type="file" display='none' onChange={(e)=>setMultipleRequest(e.target.value)}/>
          <DownloadFile ms="3" right="0"/>
        </Card>
        <Card p='1.2rem'>
            <Menu ms="3">
              <MenuButton  borderRadius="md" as={Button} rightIcon={<ChevronDownIcon />}>
              { fileType === '' ? 'Select file type' : fileType }
              </MenuButton>
              <MenuList>
                <MenuItem onClick={()=>SetFileType('Excel')}>Excel</MenuItem>
                <MenuItem onClick={()=>SetFileType('Csv')}>Csv</MenuItem>
                <MenuItem onClick={()=>SetFileType('Xlsx')}>Xlsx</MenuItem>
              </MenuList>
            </Menu>
          <Button colorScheme='teal' borderRadius="md" my="4" onClick={()=>getSingleProduct()} leftIcon={<DownloadIcon />} disabled={disableRequest}>
            Download Product File
          </Button>
        </Card>
      </Grid>
      <Center>

      {
        responseFile && !isLoading ?
        <Center>
          <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            width='600px'
            mb="24px"
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              Your Products Is Ready!
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
            download your products file by <Badge colorScheme='purple'><Link href={responseFile}>Clicking Here</Link></Badge>
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
