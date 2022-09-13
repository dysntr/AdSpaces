import {
    Flex,
    Table,
    Image,
    Link,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
  } from "@chakra-ui/react";
  import React, { useMemo } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  
  // Custom components
  import Card from "components/card/Card";
  import SizeIcon from "components/domain/SizeIcon"
  import AdSpaceStatus from "components/domain/AdSpaceStatus";
import VerifiedStatusIcon from "components/domain/VerifiedStatusIcon";
  
  // Assets
  export default function UserAdSpaces(props) {
    const { columnsData, tableData } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
    } = tableInstance;
    initialState.pageSize = 5;
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='25px' justify='space-between' mb='10px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            My AdSpaces
          </Text>
          <Button>+ NEW</Button>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.id === "name") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          <Link
                            href={'/#/admin/adspace/'+row.original.id}
                            >
                            {cell.value}
                          </Link>
                        </Text>
                      );
                    } else if (cell.column.id === "size") {
                      data = (
                        <SizeIcon size={cell.value} />
                      );
                    } else if (cell.column.id === "price") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          ${cell.value}
                        </Text>
                      );
                    } else if (cell.column.id === "file") {
                      data = (
                        <Link
                            href={'https://gateway.pinata.cloud/ipfs/' + cell.value}
                            target='_blank'
                            >
                            <Image className='table-image' src={'https://gateway.pinata.cloud/ipfs/' + cell.value} />
                        </Link>
                      );
                    } else if (cell.column.id === "website") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          <Link
                            href={cell.value}
                            target='_blank'
                            >
                            {cell.value}
                          </Link>
                        </Text>
                      );
                    }else if(cell.column.id === "status") {
                        data = (
                          <AdSpaceStatus status={cell.value}  textColor={textColor}/>
                        );
                    }else if(cell.column.id === "verified") {
                      data = (
                        <VerifiedStatusIcon status={cell.value} />
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        maxH='30px !important'
                        py='8px'
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Card>
    );
  }
  