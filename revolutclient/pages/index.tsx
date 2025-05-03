import { Anchor, AppShell, Burger, Button, Group, NavLink } from "@mantine/core";
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
      
      <AppShell.Main p="md">

      <Group mt={50} justify="center">
      <Button size="xl">Welcome to Mantine!</Button>
    </Group>
      </AppShell.Main>
    </AppShell>

  );
}
