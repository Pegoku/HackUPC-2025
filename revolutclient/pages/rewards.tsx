import { Anchor, AppShell, Badge, Burger, Button, Card, Group, NavLink, SimpleGrid, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../components/NavBar";

type Kind =  "Discount" 
|"Voucher"
|"Product"
|"Credit"
|"Access"
|"Trial"
|"Donation"

interface Reward {
  title: string;
  description: string;
  kind: Kind;
}
const rewards: Reward[] = [
  {
    title: "Gym 15% off",
    description: "Get 15% off on your next month's gym membership by hitting your weekly goals.",
    kind: "Discount",
  },
  {
    title: "Free Protein Shake",
    description: "Complete 5 workouts this week and redeem a voucher for a free protein shake at partner cafes.",
    kind: "Voucher",
  },
  {
    title: "Branded Water Bottle",
    description: "Achieve a 30-day activity streak and receive a free high-quality branded water bottle.",
    kind: "Product",
  },
  {
    title: "Personal Trainer Session 20% Off",
    description: "Unlock a 20% discount on a session with a certified personal trainer after completing a challenge.",
    kind: "Discount",
  },
  {
    title: "$5 Healthy Food Credit",
    description: "Log your meals for 7 consecutive days and get $5 credit towards healthy meal delivery services.",
    kind: "Credit",
  },
  {
    title: "Exclusive Workout Plan",
    description: "Reach level 10 in the app to unlock an exclusive advanced workout plan designed by experts.",
    kind: "Product",
  },
  {
    title: "Early Access to New Features",
    description: "Be among the first 100 users to complete the monthly challenge and get early access to upcoming app features.",
    kind: "Access",
  },
  {
    title: "Meditation App Trial",
    description: "Log 3 mindfulness sessions this week and get a free 1-month trial for a premium meditation app.",
    kind: "Trial",
  },
   {
    title: "Charity Donation",
    description: "Meet your quarterly fitness goal, and we'll donate $10 to a health-focused charity on your behalf.",
    kind: "Donation",
  }
];

const kindColor: Record<Kind,string> = {
  Discount: "pink",
  Voucher: "blue",
  Product: "green",
  Credit: "orange",
  Access: "teal",
  Trial: "cyan",
  Donation: "red",
}
export default function IndexPage() {
  const [opened, { toggle }] = useDisclosure();


  return (
    <AppShell
    header={{height: 60, }}
    navbar={{width: 300, breakpoint: 'sm', collapsed: { mobile: !opened}}}>

<AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
      </AppShell.Header>

           <NavBar/>
     
      <AppShell.Main>
     

<Group m={50}>
<Title order={1}  mt="md">
          Rewards
        </Title>
<SimpleGrid cols={3} spacing="lg" verticalSpacing="lg">



        {rewards.map((reward, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder style={{cursor: "not-allowed"}}>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={700}>{reward.title}</Text>
              <Badge color={kindColor[reward.kind]}>{reward.kind}</Badge>
            </Group>
            <Text size="sm" color="dimmed">
              {reward.description}
            </Text>
          </Card>
        ))}
        </SimpleGrid>

        </Group>
      </AppShell.Main>

    </AppShell>

  );
}
