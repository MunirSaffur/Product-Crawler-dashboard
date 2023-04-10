import React from "react";
import { downloadExcel } from "react-export-table-to-excel";
import { Link } from "@chakra-ui/react";
import { DownloadIcon } from '@chakra-ui/icons'

const DownloadFile = () => {
  const header = ["Product Link"];
  const body = [];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Example File",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: body,
      },
    });
  }

  return (
      <Link color='orange.500' mt="1" onClick={handleDownloadExcel}><DownloadIcon/> download excel</Link>
  );
};

export default DownloadFile;