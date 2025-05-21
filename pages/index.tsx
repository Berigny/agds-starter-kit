import type { NextPage } from 'next';
import { Box } from '@ag.ds-next/react/box';
import { Heading } from '@ag.ds-next/react/heading';
import { TextField } from '@ag.ds-next/react/text-field';
import { Button } from '@ag.ds-next/react/button';

const Home: NextPage = () => {
 return (
 <Box padding={3} border="standard" borderRadius="standard" maxWidth="300px">
 <Heading type="h2">Login</Heading>
 <TextField
 label="Email"
 id="email"
 />
 <TextField
 label="Password"
 id="password"
 type="password"
 />
 <Button block>Login</Button>
 </Box>
 );
};

export default Home;
