import { useState, useEffect } from 'react';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Skeleton
} from '@chakra-ui/react';

const columns = ['ID', 'Title', 'Body'];

const SkeletonRow = ({ columns }) => (
  <Tr>
    {columns.map((column, columnIndex) => (
      <Td key={columnIndex}>
        <Skeleton height="10px" />
      </Td>
    ))}
  </Tr>
);

const SkeletonTable = () => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {columns.map((column, columnIndex) => (
            <Th key={columnIndex}><Skeleton height="10px" width="100px" /></Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <SkeletonRow columns={columns} />
        <SkeletonRow columns={columns} />
        <SkeletonRow columns={columns} />
      </Tbody>
    </Table>
  );
};

export default SkeletonTable;
