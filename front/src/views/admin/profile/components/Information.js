// Chakra imports
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import DAIicon from "components/domain/DAIicon";
import SizeIcon from "components/domain/SizeIcon";
import React from "react";

export default function Information(props) {
  const { title, value, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest}>
      <Box>
        <Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
          {title}
        </Text>
        <Text color={textColorPrimary} fontWeight='500' fontSize='md'>
        {rest?.pependdai && (
          <DAIicon/> 
        )}
           &nbsp;{value}
        {rest?.appendsize && (
          <SizeIcon size={value}/>
        )}
        </Text>
      </Box>
    </Card>
  );
}
