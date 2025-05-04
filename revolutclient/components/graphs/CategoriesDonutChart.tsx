import { Box, Checkbox, Collapse, Flex, Group, NumberInput, Paper, Pill, Radio, Title } from "@mantine/core";
import { categories, category, categoryColors, transaction } from "../../pages/graphs";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { BarChart, DonutChart } from "@mantine/charts";


const allMonths = Array(12).keys();
export function CategoriesDonutChart({data}: {data:transaction[]}) {
      
      const dataForChart: {name: string, value: number, color: string}[] = [];

      data.forEach((item)=>{
        if (dataForChart.find((d)=>d.name === item.category)) {
          dataForChart.find((d)=>d.name === item.category)!.value += item.amount;
        }
        else {
          dataForChart.push({
            name: item.category,
            value: item.amount,
            color: categoryColors[item.category]
          })
        }

      })

      

        return (
            <Paper withBorder shadow="sm" p="md" radius="md" mt="xl" w={700}>
            <Title order={4} ta="center" mb="lg">Monthly Expenses Breakdown</Title>
            <Flex justify="center" align="center" mb="md" gap={100}>
            <DonutChart
                data={dataForChart}
                withLabels
                size={300}
                thickness={50}
                labelsType="percent"
                tooltipDataSource="segment"
        />     
        <Group maw={100} pr={150} >
          {categories.map((cat)=>{

            return (
              <Flex 
              key={cat}
              color={categoryColors[cat]}
              fz={"sm"}
              gap={5}
              align={"center"}
                justify={"center"}
              ><Box w={12} h={12} bg={categoryColors[cat]}/>{cat}</Flex>
            )
          })}
        </Group>
        </Flex>

        </Paper>
        )
}