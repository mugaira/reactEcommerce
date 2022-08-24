import { Button, Flex, FormControl, FormLabel, Heading, Input, Link, Spacer, Text } from "@chakra-ui/react";
import {
	Link as RouterLink,
} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import React from "react";

const LoginScreen = () => {

	const submitHandler = () => {

	}

	return (
		<Flex w="full" alignItems="center" justifyContent="center" py="5">
			<FormContainer>
				<Heading as="h1" mb="8" fontSize="3xl">
					Login
				</Heading>

				<form onSubmit={submitHandler}>
					<FormControl id="email">
						<FormLabel >Email address</FormLabel>
						<Input
							id='email'
							type='email'
							placeholder='username@domain.com'
						/>
					</FormControl>

					<Spacer h='3' />

					<FormControl id='password'>
						<FormLabel>Password</FormLabel>
						<Input
							id='password'
							type='password'
							placeholder='*********'
						/>

					</FormControl>

					<Button type='submit' colorScheme='teal' mt='4'>
						Login
					</Button>

				</form>

				<Flex pt='10'>
					<Text fontWeight='semibold' >
						New Customer?{' '}
						<Link as={RouterLink} to='/register'>
							Click here to register
						</Link>

					</Text>
				</Flex>
			</FormContainer>
		</Flex>
	);
};

export default LoginScreen;
