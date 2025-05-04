import { AppShell, NavLink } from "@mantine/core"

export default function NavBar() {
    return <AppShell.Navbar p="md">
    {[
      { label: "Home", href: "/" },
      { label: "insert data", href: "/setup" },
      { label: "Analyze data", href: "/graphs" },
      { label: "Goals", href: "/goals" },
      { label: "Rewards", href: "/rewards" },
    ].map((link) => (
      <NavLink
        key={link.label}
        label={link.label}
        component="a"
        href={link.href}
        mt="sm"
      />
    ))
    }


    </AppShell.Navbar>
}