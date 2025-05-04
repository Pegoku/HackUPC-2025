import { Anchor, AppShell, Burger, Button, Checkbox, Container, Group, Highlight, NavLink, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../../components/NavBar";
import { AreaChart, LineChart } from "@mantine/charts";
import '@mantine/charts/styles.css';
import { BarChart } from "recharts";
import { useState } from "react";
import { MonthlyExpensesChart } from "./monthlyExpensesChart";
import { CategoriesComparasionExpenses } from "./CategoriesComparasionExpenses";
import { CategoriesDonutChart } from "./CategoriesDonutChart";

export     const categoryColors: Record<category, string> = {
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
export const categories =[ 
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

export type category = typeof categories[number];
export interface transaction {
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
    },{
      "year": 2024,
      "month": 5,
      "vendor": "Carrefour",
      "category": "Groceries",
      "amount": 82.30
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Restaurante La Casa",
      "category": "Dining",
      "amount": 55.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Renfe",
      "category": "Transport",
      "amount": 45.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Zara",
      "category": "Shopping",
      "amount": 70.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Nike",
      "category": "Clothing",
      "amount": 85.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Iberdrola",
      "category": "Utilities",
      "amount": 60.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Clinica Dental",
      "category": "Health",
      "amount": 50.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Cinepolis",
      "category": "Entertainment",
      "amount": 30.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Vueling",
      "category": "Travel",
      "amount": 200.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Bricorama",
      "category": "Home",
      "amount": 45.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Louis Vuitton",
      "category": "Luxuries",
      "amount": 300.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Khan Academy",
      "category": "Education",
      "amount": 0.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Decathlon",
      "category": "Shopping",
      "amount": 60.00
  },
  {
      "year": 2024,
      "month": 5,
      "vendor": "Correos",
      "category": "Home",
      "amount": 12.00
  },
  {
      "year": 2024,
      "month": 6,
      "vendor": "Supermercado Lidl",
      "category": "Groceries",
      "amount": 55.00
  },
  {
      "year": 2024,
      "month": 6,
      "vendor": "Bar El Tapeo",
      "category": "Dining",
      "amount": 40.00
  },
  {
      "year": 2024,
      "month": 6,
      "vendor": "Taxi Madrid",
      "category": "Transport",
      "amount": 25.00
  },
  {
      "year": 2024,
      "month": 6,
      "vendor": "El Corte Inglés",
      "category": "Shopping",
      "amount": 95.00
  },
  {
      "year": 2024,
      "month": 6,
      "vendor": "Adidas",
      "category": "Clothing",
      "amount": 70.00
  },
  {
      "year": 2024,
      "month": 6,
      "vendor": "Gas Natural",
      "category": "Utilities",
      "amount": 55.00
  },
  {
      "year": 2024,
      "month": 6,
      "vendor": "Hospital Universitario",
      "category": "Health",
      "amount": 120.00
  },
  {
      "year": 2024,
      "month": 6,
      "vendor": "HBO Max",
      "category": "Entertainment",
      "amount": 14.99
  }
  ]


  const biggestExpense = data.reduce((prev, current) => {
    return (prev.amount > current.amount) ? prev : current
  });

  

  return (
    <AppShell
    header={{height: 60, }}
    navbar={{width: 300, breakpoint: 'sm', collapsed: { mobile: !opened}}}>

<AppShell.Header bg="revBlack.9" color="black">
        <Title variant="gradient" order={1} fw={900} p={10}>Graphs</Title>
      </AppShell.Header>
        <NavBar/>
      <AppShell.Main p="md">

      <Group mt={50} justify="center">
      <Container m={10}>
        <Stack gap={"xl"}>
          <Paper withBorder shadow="sm" p="md" radius="md" mt="xl">
        <Title>Biggest expense</Title>
        <Highlight
      ta="center"
      highlight={biggestExpense.vendor}
      color={categoryColors[biggestExpense.category]}
      highlightStyles={{
        fontWeight: 700,

        
        textDecoration: 'underline',
         
      }}
    >
          {`Your biggest expense through the year has been of ${biggestExpense.amount}€ in ${biggestExpense.vendor}.`}
          </Highlight>
          </Paper>

          <Title>Charts</Title>

        <MonthlyExpensesChart data={data} />

<CategoriesComparasionExpenses data={data}/>
<CategoriesDonutChart data={data}/>
        </Stack>
      </Container>
    </Group>
      </AppShell.Main>
    </AppShell>

  );
}
