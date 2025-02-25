import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dataset, EChartsx, LineSeries, Once, Tooltip } from "@djagger/echartsx";
import Stack from "@mui/material/Stack";
import { useAnalyzeChartContext } from "../context";
import { useReversed } from "./hooks";
import { AxisBase, formatDate } from "./base";
import { Title } from "./ui";

interface LinesProps {
  title: string;
  colors?: [string, string];
  icon: React.ReactNode;
  openedText?: string;
  closedText: string;
  dayKey?: string;
  dayOpenedValueKey: string;
  dayClosedValueKey: string;
  totalOpenedValueKey: string;
  totalClosedValueKey: string;
}

const DEFAULT_COLORS: [string, string] = ['#63C16D', '#904DC9'];
export default function Lines({
                                icon,
                                title,
                                colors = DEFAULT_COLORS,
                                openedText = 'Opened',
                                closedText,
                                dayOpenedValueKey,
                                totalOpenedValueKey,
                                totalClosedValueKey,
                                dayClosedValueKey,
                                dayKey = 'current_period_day',
                              }: LinesProps) {
  const { data } = useAnalyzeChartContext();
  return (
    <Box>
      <Box minWidth={96} mb={1}>
        <Title icon={icon} title={title} />
        <Stack direction="row">
          <Box>
            <Typography color="#7C7C7C" fontSize={14}>{openedText}</Typography>
            <Typography color={colors[0]} fontWeight="bold"
                        fontSize={24}>{data.data?.data[0][totalOpenedValueKey]}</Typography>
          </Box>
          <Box ml={2}>
            <Typography color="#7C7C7C" fontSize={14}>{closedText}</Typography>
            <Typography color={colors[1]} fontWeight="bold"
                        fontSize={24}>{data.data?.data[0][totalClosedValueKey]}</Typography>
          </Box>
        </Stack>
      </Box>
      <EChartsx style={{ flex: 1 }} init={{ height: 105, renderer: 'canvas' }} theme="dark">
        <Once>
          <AxisBase />
          <Tooltip
            trigger="axis"
            axisPointer={{}}
            formatter={([p1, p2]) => [
              formatDate(p1.value[dayKey]),
              `${p1.marker} ${openedText}: <b>${p1.value[dayOpenedValueKey]}</b> ${title}`,
              `${p2.marker} ${closedText}: <b>${p2.value[dayClosedValueKey]}</b> ${title}`,
            ].join('<br>')}
          />
          <LineSeries encode={{ x: 'idx', y: dayOpenedValueKey }} color={colors[0]} showSymbol={false} smooth />
          <LineSeries encode={{ x: 'idx', y: dayClosedValueKey }} color={colors[1]} showSymbol={false} smooth />
        </Once>
        <Dataset source={useReversed(data.data?.data ?? [])} />
      </EChartsx>
    </Box>
  );
}
