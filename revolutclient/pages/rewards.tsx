import { Anchor, AppShell, Badge, Burger, Button, Card, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../components/NavBar";

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
    
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
        <Text fw={700}>Gym 15% off</Text>
        <Badge color="pink">Discount</Badge>
      </Group>
        <Text size="sm" color="dimmed">
            Get 15% off on your gym membership if you fulfill your goals</Text>
        </Card>
        </Group>

      </AppShell.Main>
    </AppShell>

  );
}
