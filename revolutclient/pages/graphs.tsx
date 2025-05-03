import { Anchor, AppShell, Burger, Button, Container, Group, Highlight, NavLink, Paper, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../components/NavBar";
import { AreaChart, LineChart } from "@mantine/charts";
import '@mantine/charts/styles.css';
import { BarChart } from "recharts";


const categories =[ 
'Groceries'
,'Dining'
,'Transport'
,'Shopping'
,'Clothing'
,'Utilities'
,'Health'
,'Entertainment'
,'Travel'
,'Home'
,'Betting'
,'Education'
,'Luxuries'
,'Investment'
] as const;

type category = typeof categories[number];
interface transaction {
  year: number;
  month: number;
  vendor: string;
  category: category;
  amount: number;
}
export default function IndexPage() {
  const [opened, { toggle }] = useDisclosure();

  const data: transaction[] = [
    {
      "year": 2023,
      "month": 11,
      "vendor": "Mercadona",
      "category": "Groceries",
      "amount": 68.21
    },
    {
      "year": 2023,
      "month": 11,
      "vendor": "Restaurante Sol",
      "category": "Dining",
      "amount": 45.50
    },
    {
      "year": 2023,
      "month": 11,
      "vendor": "Zara",
      "category": "Clothing",
      "amount": 59.95
    },
    {
      "year": 2023,
      "month": 11,
      "vendor": "Metro Madrid",
      "category": "Transport",
      "amount": 12.50
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Amazon.es",
      "category": "Shopping",
      "amount": 34.99
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Endesa",
      "category": "Utilities",
      "amount": 72.80
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Farmacia Central",
      "category": "Health",
      "amount": 18.65
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Cines Yelmo",
      "category": "Entertainment",
      "amount": 19.80
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Iberia",
      "category": "Travel",
      "amount": 185.40
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Leroy Merlin",
      "category": "Home",
      "amount": 42.15
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Peluquería Estilo",
      "category": "Luxuries",
      "amount": 25.00
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Librería Papel",
      "category": "Education",
      "amount": 29.99
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "El Corte Inglés",
      "category": "Shopping",
      "amount": 75.00
    },
    {
      "year": 2023,
      "month": 12,
      "vendor": "Correos",
      "category": "Home",
      "amount": 5.50
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "Carrefour",
      "category": "Groceries",
      "amount": 88.10
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "Bar Tapas Frias",
      "category": "Dining",
      "amount": 22.00
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "Repsol",
      "category": "Transport",
      "amount": 55.00
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "FNAC",
      "category": "Shopping",
      "amount": 65.70
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "Mango",
      "category": "Clothing",
      "amount": 39.99
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "Movistar",
      "category": "Utilities",
      "amount": 50.99
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "Gimnasio Fit",
      "category": "Health",
      "amount": 40.00
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "Netflix",
      "category": "Entertainment",
      "amount": 12.99
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "Booking.com",
      "category": "Travel",
      "amount": 110.00
    },
    {
      "year": 2024,
      "month": 1,
      "vendor": "IKEA",
      "category": "Home",
      "amount": 120.55
    },
    {
      "year": 2024,
      "month": 2,
      "vendor": "Sephora",
      "category": "Luxuries",
      "amount": 48.30
    },
    {
      "year": 2024,
      "month": 2,
      "vendor": "Udemy",
      "category": "Education",
      "amount": 14.99
    },
    {
      "year": 2024,
      "month": 2,
      "vendor": "Floristería",
      "category": "Luxuries",
      "amount": 35.00
    },
    {
      "year": 2024,
      "month": 2,
      "vendor": "Parking Centro",
      "category": "Transport",
      "amount": 8.50
    },
    {
      "year": 2024,
      "month": 2,
      "vendor": "Lidl",
      "category": "Groceries",
      "amount": 41.75
    },
    {
      "year": 2024,
      "month": 2,
      "vendor": "Taller AutoFix",
      "category": "Home",
      "amount": 95.20
    },    {
      "year": 2024,
      "month": 4,
      "vendor": "Taller AutoFix",
      "category": "Home",
      "amount": 91.20
    }
  ]

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

  const biggestExpense = data.reduce((prev, current) => {
    return (prev.amount > current.amount) ? prev : current
  });

  
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
  'Betting': 'gray.5', // Assign colors even if current data is 0
  'Education': 'green.6',
  'Luxuries': 'violet.6',
  'Investment': 'dark.5',
};
const chartData = totalExpensePerMonth
    .map(item => ({
        ...item,
        Shopping: parseFloat(item.Shopping.toFixed(2)),
        Luxuries: parseFloat(item.Luxuries.toFixed(2)),
        monthLabel: monthNames[item.month]
    }))
    .sort((a, b) => {
        const monthOrder = [11, 12, 1, 2];
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });

const chartSeries = categories
    .filter(cat => chartData.some(monthData => monthData[cat] > 0)) // Check if category has > 0 value in any month
    .map(cat => ({
        name: cat as string,
        color: categoryColors[cat],
    }));



  return (
    <AppShell
    header={{height: 60, }}
    navbar={{width: 300, breakpoint: 'sm', collapsed: { mobile: !opened}}}>

<AppShell.Header>
        <Title variant="gradient" order={1} fw={900} p={10}>Graphs</Title>
      </AppShell.Header>
        <NavBar/>
      <AppShell.Main p="md">

      <Group mt={50} justify="center">
      <Container m={10}  >
        <Title>Biggest expense</Title>
        <Highlight
      ta="center"
      highlight={biggestExpense.vendor}
      highlightStyles={{
        backgroundImage:
          'linear-gradient(45deg, var(--mantine-color-cyan-5), var(--mantine-color-indigo-5))',
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        
      }}
    >
          {`Your biggest expense through the year has been of ${biggestExpense.amount}€ in ${biggestExpense.vendor}.`}
          </Highlight>
{JSON.stringify(totalExpensePerMonth, null, 2)}


<Paper withBorder shadow="sm" p="md" radius="md" mt="xl">
            <Title order={4} ta="center" mb="lg">Monthly Expenses Breakdown</Title>
            <LineChart
                h={450} // Adjust height as needed
                data={chartData}
                dataKey="monthLabel" // Use the month name for the x-axis
                series={chartSeries as {color:string,name:string}[]}
                yAxisProps={{ // Format y-axis labels as currency
                    tickFormatter: (value: number) => `€${value.toFixed(0)}`, // Format as Euro, adjust precision
                    // You might want to set a domain if needed: domain={[0, 'auto']} or specific max
                }}
                xAxisProps = {{ // Add some padding to the x-axis
                    padding: { left: 30, right: 30 },
                }}
                tickLine="y" // Show tick lines on the y-axis
                withXAxis
                withYAxis
            />
        </Paper>


      </Container>
    </Group>
      </AppShell.Main>
    </AppShell>

  );
}
