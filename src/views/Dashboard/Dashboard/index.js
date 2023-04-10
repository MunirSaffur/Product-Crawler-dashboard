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
  MenuItem
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import Card from "components/Card/Card.js";
import { tablesTableData } from "variables/general";
import Requests from "../Tables/components/Requests";
import DownloadFile from "components/Forms/DownloadFile";
import axios from "axios";
import SkeletonTable from "../Tables/components/SkeletonTable";
import { AttachmentIcon, ChevronDownIcon } from '@chakra-ui/icons'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const textColor = useColorModeValue("gray.700", "white");


  const getSingleProduct = async ()=>{
    setIsLoading(true)
    try {
      const res = await axios.get('https://run.mocky.io/v3/5c54fcdf-4fd9-436e-8a80-53e9b222533f')
    } catch (error){
      console.error(error)
    } finally {
      setIsLoading(false)
    }
    
  }
  
  // Upload File
  const inputFileRef = useRef();
  const onBtnClick = () => {
    inputFileRef.current.click();
  };
  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <Text fontSize='lg' color={textColor} fontWeight='bold'>Get your products</Text>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.4fr .1fr 1.4fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my='26px'
        gap='24px'>
        <Card p='1.2rem'>
          <Grid
          templateColumns={{ md: "1fr", lg: "2fr 1fr" }}
          gap='7px'>
            <Input placeholder='Inter product link' />
            <Menu ms="3">
              <MenuButton  borderRadius="md" as={Button} rightIcon={<ChevronDownIcon />}>
              Select file type
              </MenuButton>
              <MenuList>
                <MenuItem>Excel</MenuItem>
                <MenuItem>Csv</MenuItem>
                <MenuItem>Xlsx</MenuItem>
              </MenuList>
            </Menu>
          </Grid>
          <Button colorScheme='teal' borderRadius="md" mt="3" onClick={()=>getSingleProduct()}>
              Get Product
            </Button>
        </Card>
        <Center>
          <Text fontSize='lg' color='gray.400'>- or -</Text>
        </Center>
        <Card p='1.2rem'>

            <Button onClick={onBtnClick} borderRadius="md" className="uplodFiless" leftIcon={<AttachmentIcon />}>Upload Your File</Button>
            <Input ref={inputFileRef} placeholder='Inter product link' type="file" display='none'/>
            <DownloadFile ms="3" right="0"/>
        </Card>
      </Grid>
      { isLoading ? 
      <SkeletonTable/>
       : 
      <Requests
        title={"Authors Table"}
        captions={["Order Id", "Creating Date", "Status", "Result"]}
        data={tablesTableData}
      />

      }
    </Flex>
  );
}
