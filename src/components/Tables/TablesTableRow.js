import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TablesTableRow(props) {
  const { id, status, date } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Text
        fontSize="md"
        color={textColor}
        fontWeight="bold"
        minWidth="100%">
          {id}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {date}
        </Text>
      </Td>
      <Td>
        <Badge
          bg={status === "Success" ? "green.400" : bgStatus}
          color={status === "Success" ? "white" : colorStatus}
          fontSize="14px"
          p="3px 10px"
          borderRadius="4px"
        >
          {status}
        </Badge>
      </Td>
      <Td>
      <Button disabled={status === "Pending"} borderRadius="md">
        Download
      </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
