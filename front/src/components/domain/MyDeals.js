import MiniStatistics from "components/card/MiniStatistics";
import { MdAddTask } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import IconBox from "components/icons/IconBox";
import { useState, useEffect } from "react";
import {
  fetchTablelandTables,
  getTableLandConfig,
} from "../_custom/tableLandHelpers";
import { connect, resultsToObjects } from "@tableland/sdk";
import { useAccount } from "wagmi";

export default function MyDeals() {
  const [incomingDeals, setIncomingDeals] = useState(0);
  const [outgoingDeals, setOutgoingDeals] = useState(0);
  const { address } = useAccount();
  const TablelandTables = fetchTablelandTables();
  // query TableLand for all deals made by the user ; the assumption that an entry in deals table = funds spent holds true
  const networkConfig = getTableLandConfig();

  const dealTable = TablelandTables["Deals"];

  const campaignTable = TablelandTables["Campaigns"];

  const adspaceTable = TablelandTables["AdSpaces"];

  async function getTotalDeals() {
    const tablelandConnection = await connect({
      network: networkConfig.testnet,
      chain: networkConfig.chain,
    });

    console.log(address);
    const outgoingDealsQuery = await tablelandConnection.read(
      `SELECT count(${dealTable}.deal_id) as outgoingDeals FROM ${adspaceTable} INNER JOIN ${dealTable}  INNER JOIN ${campaignTable} WHERE adspace_id = adspace_id_fk AND campaign_id = campaign_id_fk AND ${campaignTable}.owner like '${address}';`
    );
    const outgoingDeals = await resultsToObjects(outgoingDealsQuery);

    const incomingDealsQuery = await tablelandConnection.read(
      `SELECT count(${dealTable}.deal_id) as incomingDeals FROM ${adspaceTable} INNER JOIN ${dealTable}  INNER JOIN ${campaignTable} WHERE adspace_id = adspace_id_fk AND campaign_id = campaign_id_fk AND ${adspaceTable}.owner like '${address}';`
    );

    const incomingDeals = await resultsToObjects(incomingDealsQuery);

    return {
      incomingDeals: incomingDeals[0].incomingDeals,
      outgoingDeals: outgoingDeals[0].outgoingDeals,
    };
  }

  useEffect(() => {
    getTotalDeals()
      .then((res) => {
        console.log(res);
        setIncomingDeals(res.incomingDeals);
        setOutgoingDeals(res.outgoingDeals);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <MiniStatistics
      startContent={
        <IconBox
          w="56px"
          h="56px"
          bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
          icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
        />
      }
      name="My Deals"
      value={incomingDeals + outgoingDeals}
    />
  );
}
