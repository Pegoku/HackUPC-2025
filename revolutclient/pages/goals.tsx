import { Anchor, AppShell, Badge, Burger, Button, Card, Group, NavLink, Text, Progress, Highlight, Title, Image, Flex, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../components/NavBar";

export default function IndexPage() {
  const [opened, { toggle }] = useDisclosure();


  return (
    <AppShell
    header={{height: 60, }}
    navbar={{width: 300, breakpoint: 'sm', collapsed: { mobile: !opened}}}>

      <AppShell.Header m={10} ml={25}>
        <Flex columnGap={20}>
          <Image src={"/logo.svg"} w={40}/>
          <Title>Goals</Title>
        </Flex>
      </AppShell.Header>
           <NavBar/>
     
      <AppShell.Main>

<Group m={20} align="center" justify="center" mt={60}>
    
        <Card shadow="sm" padding="lg" radius="md" withBorder h={250} w={1000}>
          <Stack gap={30}>
        <Group justify="space-between" mt="md" mb="xs">
        <Highlight highlight="Dining" highlightStyles={{fontWeight:700, outline:"none", marker: "none",         WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',backgroundImage:
        'linear-gradient(45deg, cyan, blue)',}}>Spend less in Dining </Highlight>
        <Badge color="pink">Discount</Badge>
      </Group>
      <Progress color="red" radius={"xl"} size={"xl"} value={30}/>
        <Flex justify={"space-between"}>
        <Text size="sm" color="dimmed">
            Get 15% off on your gym membership if you fulfill your goals
        </Text>
        <Text>
          30/100
        </Text>
        </Flex>

            </Stack>
        </Card>
        </Group>

      </AppShell.Main>
    </AppShell>

  );
}
