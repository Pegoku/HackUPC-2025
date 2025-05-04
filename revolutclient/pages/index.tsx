import { Anchor, AppShell, Burger, Button, Container, Flex, Grid, Group, Image, NavLink, Paper, SimpleGrid, Stack, Text, Title, Accordion, ThemeIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChartBar, IconBulb, IconTrophy, IconVideo, IconArrowRight, IconChevronRight } from '@tabler/icons-react';
import Logo from "../logo.svg";
import NavBar from "../components/NavBar";

export default function IndexPage() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{height: 60 }}
      navbar={{width: 300, breakpoint: 'sm', collapsed: { mobile: !opened}}}>

      <AppShell.Header m={10} ml={25}>
        <Flex columnGap={20}>
          <Image src={"/logo.svg"} w={40}/>
          <Title>Revault</Title>
        </Flex>
      </AppShell.Header>
      
      <NavBar/>
      
      <AppShell.Main>
        <Container size="lg" py={60}>
          <Grid gutter={50}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xl">
                <Title order={1} size={48}>Turn your savings into a game</Title>
                <Text size="xl" c="dimmed">
                  Complete monthly missions, earn rewards, and master your financial future.
                </Text>
                
                <Group mt="md">
                  <Button size="lg" rightSection={<IconArrowRight size={18} />}>
                    Get Started
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                radius="md"
                src="demo.png"
                alt="Revault App Dashboard"
              />
            </Grid.Col>
          </Grid>
        </Container>

        {/* How It Works */}
        <Container size="lg" py={40}>
          <Title order={2} ta="center" mb={50}>How It Works</Title>
          
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
            <Paper shadow="md" p="xl" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" mb="md">
                <IconBulb size={30} />
              </ThemeIcon>
              <Title order={3} mb="xs">Pick Your Mission</Title>
              <Text>
                Choose from a variety of monthly saving goals—stretch yourself or play it safe.
                Limit spending on categories like taxis or dining to reach your goals.
              </Text>
            </Paper>
            
            <Paper shadow="md" p="xl" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" mb="md">
                <IconChartBar size={30} />
              </ThemeIcon>
              <Title order={3} mb="xs">Save & Level Up</Title>
              <Text>
                Automatically track your progress, earn XP, and build streaks as you stay under your spending limits.
                View detailed charts of your spending habits.
              </Text>
            </Paper>
            
            <Paper shadow="md" p="xl" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" mb="md">
                <IconTrophy size={30} />
              </ThemeIcon>
              <Title order={3} mb="xs">Unlock Rewards</Title>
              <Text>
                Redeem exclusive partner discounts like 20% off gym memberships, cash bonuses, or in-app power-ups.
              </Text>
            </Paper>
          </SimpleGrid>
        </Container>

        <Container size="lg" py={40}>
          <Title order={2} ta="center" mb={30}>Frequently Asked Questions</Title>
          
          <Accordion>
            <Accordion.Item value="how-missions-work">
              <Accordion.Control>
                <Text fw={500}>How do missions work?</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>
                  You select a spending category target (like taxis or dining), Revault tracks your spending throughout the month, 
                  and you earn XP and rewards when you stay under your limit. The app provides real-time updates on your progress.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            
            <Accordion.Item value="reward-types">
              <Accordion.Control>
                <Text fw={500}>What kind of rewards can I get?</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>
                  Rewards range from partner discounts (like 20% off gym memberships), in-app themes and fee discounts, 
                  to cash bonuses for consistent mission completion. The more challenging your mission, the better the rewards!
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            
            <Accordion.Item value="skip-month">
              <Accordion.Control>
                <Text fw={500}>Can I skip a month?</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>
                  Yes—youll pause your mission streak without losing your accumulated XP. We understand life happens,
                  and sometimes you need flexibility.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            
            <Accordion.Item value="is-free">
              <Accordion.Control>
                <Text fw={500}>Is this free to use?</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text>
                  Absolutely—missions and badges come at no extra cost. Revault is committed to helping you improve your
                  financial habits without charging extra fees.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>

        <Container size="md" py={60}>
          <Paper shadow="xl" p={40} radius="lg" withBorder ta="center">
            <Title order={2} mb="md">Ready to level up your finances?</Title>
            <Text size="lg" mb="xl">
              Join thousands of users who are turning their spending habits into rewards.
            </Text>
            <Button size="lg">Get Started Today</Button>
          </Paper>
        </Container>

       
      </AppShell.Main>
    </AppShell>
  );
}
