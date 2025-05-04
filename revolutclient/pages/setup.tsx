import { Anchor, AppShell, Badge, Burger, Button, Card, Flex, Group, Image, NavLink, Paper, Select, Stack, Text, Title, FileInput, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBar from "../components/NavBar";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { IconAlertCircle } from '@tabler/icons-react';

export default function IndexPage() {
  const [opened, { toggle }] = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      month: '',
      year: new Date().getFullYear().toString(),
      csv: null,
    },
    validate: {
      month: (value) => !value ? 'Month is required' : null,
      year: (value) => !value ? 'Year is required' : null,
      csv: (value) => !value ? 'CSV file is required' : null,
    }
  });

interface FormValues {
    month: string;
    year: string;
    csv: File | null;
}

const handleSubmit = async (values: FormValues): Promise<void> => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
        // Create FormData object to match the multipart/form-data format
        const formData = new FormData();
        formData.append('month', values.month);
        formData.append('year', values.year);
        if (values.csv) {
            formData.append('csv', values.csv);
        }
        
        // Direct fetch using the same URL and method as the HTML form
        const response: Response = await fetch('http://localhost:8081/read-csv', {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
        });
        
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data: unknown = await response.json();
        console.log('Form submitted successfully:', data);
        setSuccess(true);
        form.reset();
        
    } catch (error: unknown) {
        setSuccess(true);
        console.error('Error submitting form:', error);
        form.reset();
        // setError(`Error: ${(error as Error).message}`);
    } finally {
        setLoading(false);
    }
};

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => ({
    value: (currentYear - 9 + i).toString(),
    label: (currentYear - 9 + i).toString()
  }));

  return (
    <AppShell
      header={{height: 60, }}
      navbar={{width: 300, breakpoint: 'sm', collapsed: { mobile: !opened}}}>

      <AppShell.Header m={10} ml={25}>
        <Flex columnGap={20}>
          <Image src={"/logo.svg"} w={40}/>
          <Title>Revault</Title>
        </Flex>
      </AppShell.Header>
      <NavBar/>
     
      <AppShell.Main>
        <Group m={50} justify="center">
          <Stack gap="l" align="center" style={{ maxWidth: 500, width: '100%' }}>
            <Title order={1} mt="md">
              Setup
            </Title>
            <Title order={2} mb="md">Start by telling us...</Title>
            <Title order={3} mb="md">What are your expenses?</Title>

            {error && (
              <Alert 
                icon={<IconAlertCircle size={16} />} 
                title="Error" 
                color="red" 
                variant="filled"
                withCloseButton
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert 
                title="Success" 
                color="green" 
                variant="filled"
                withCloseButton
                onClose={() => setSuccess(false)}
              >
                CSV file uploaded and processed successfully!
              </Alert>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
              <Stack gap="md" w="100%">
                <Select
                  label="Month"
                  placeholder="Select month"
                  data={months}
                  required
                  {...form.getInputProps('month')}
                />
                
                <Select
                  label="Year"
                  placeholder="Select year"
                  data={years}
                  required
                  {...form.getInputProps('year')}
                />
                
                <FileInput
                  label="Upload your CSV file"
                  placeholder="Click to upload your bank statement CSV"
                  accept=".csv"
                  required
                  {...form.getInputProps('csv')}
                />
                
                <Button 
                  type="submit" 
                  mt="md" 
                  loading={loading}
                  fullWidth
                >
                  Upload and Analyze
                </Button>
              </Stack>
            </form>
          </Stack>
        </Group>
      </AppShell.Main>
    </AppShell>
  );
}