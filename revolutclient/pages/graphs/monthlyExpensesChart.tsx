import { Checkbox, Collapse, Flex, Group, NumberInput, Paper, Title } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { categories, category, transaction } from ".";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";


const allMonths = Array(12).keys();
export function MonthlyExpensesChart({data}: {data:transaction[]}) {
    const [enabledCategories, setEnabledCategories] = useState<category[]>(categories.slice(0, 5));
    const [maxSelectable, setMaxSelectable] = useState<null|number>(5);
    const [isCollapsed, {toggle}] = useDisclosure(true);
      const expensePerMonth = new Map<string, transaction[]>();
      
      data.forEach((item)=>{
    
        const key = item.year + "-" + item.month;
        if (expensePerMonth.has(key)) {
          expensePerMonth.get(key)!.push(item);
        } else {
          expensePerMonth.set(key, [item]);
        }
      })
    
      type expensePerMonthPerCategory = {
        [key in category | 'total' | 'month']: number;
      } 
      const totalExpensePerMonth: expensePerMonthPerCategory[] = [];
    
     
      expensePerMonth.forEach((value, key) => {
        const month = key.split("-")[1];
        const year = key.split("-")[0];
        const total = value.reduce((acc, curr) => acc + curr.amount, 0);
        const expensePerCategory: expensePerMonthPerCategory = {
          month: parseInt(month),
          total: total,
          ...(categories.reduce((acc, curr) => {
            acc[curr] = 0;
            return acc;
          }, {} as { [key in category]: number })),
        }
        
        value.forEach((item) => {
          expensePerCategory[item.category] += item.amount;
        })
        totalExpensePerMonth.push(expensePerCategory);
      })
      const monthNames: { [key: number]: string } = {
        1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
        7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
    };
    const categoryColors: Record<category, string> = {
      'Groceries': 'blue.6',
      'Dining': 'red.6',
      'Transport': 'orange.6',
      'Shopping': 'grape.6',
      'Clothing': 'yellow.6',
      'Utilities': 'lime.6',
      'Health': 'cyan.6',
      'Entertainment': 'pink.6',
      'Travel': 'teal.6',
      'Home': 'indigo.6',
      'Betting': 'gray.5', 
      'Education': 'green.6',
      'Luxuries': 'violet.6',
      'Investment': 'dark.5',
    };
    const chartData = totalExpensePerMonth
        .map(item => ({
            ...item,
            monthLabel: monthNames[item.month]
        }))
        .sort((a, b) => {
            const monthOrder = [11, 12, 1, 2];
            return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });
    
    const chartSeries = categories
        .filter(cat => chartData.some(monthData => monthData[cat] > 0 && enabledCategories.includes(cat))) // Check if category has > 0 value in any month
        .map(cat => ({
            name: cat as string,
            color: categoryColors[cat],
        }));


        return (
            <Paper withBorder shadow="sm" p="md" radius="md" mt="xl" w={1100}>
            <Title order={4} ta="center" mb="lg">Monthly Expenses Breakdown</Title>
            <Flex justify="space-between" align="center" mb="md" gap={40}>
            <LineChart
                h={450} 
                data={chartData}
                curveType="linear" 
                dataKey="monthLabel" 
                series={chartSeries as {color:string,name:string}[]}
                yAxisProps={{ 
                    tickFormatter: (value: number) => `€${value.toFixed(0)}`, 
                    
                }}
                xAxisProps = {{
                    padding: { left: 30, right: 30 },
                }}
                tickLine="y"
                withXAxis
                withYAxis
        />
        <Group maw={100} pr={150} >
          {categories.map((cat)=>{

            return (
              <Checkbox 
              key={cat}
              label={cat}
              color={categoryColors[cat]}
              checked={enabledCategories.includes(cat)}
              
              onChange={(event) => {
                if (event.currentTarget.checked) {
                  setEnabledCategories((prev) =>{
                     let a = [...prev, cat]
                     if (maxSelectable && a.length > maxSelectable) {
                      a.shift();
                     }
                        return a;
                    });
                }
                else {
                  setEnabledCategories((prev) => prev.filter((c) => c !== cat));
                }
              }}
              />
            )
          })}
        </Group>

        </Flex>
        <Collapse in={isCollapsed} transitionDuration={100} transitionTimingFunction={"linear"}>
        <NumberInput
      label="Max selectable categories"
      description="Select the maximum number of categories to display in the chart. Defaults to 5."
      value={maxSelectable?.toString() || 5}
      onChange={(v)=> {
        if (v) {
          setMaxSelectable(parseInt(v.toString()));
          setEnabledCategories(enabledCategories.slice(0, parseInt(v.toString())));
        }
      }}
    />
        </Collapse>
        </Paper>
        )
}