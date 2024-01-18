# Testing

It is best practice for smart contracts planned to be deployed to production to be thoroughly tested. This is especially true for smart contracts that handle user funds. A good functioning test suite is highly encouraged before sending your smart contract for security review or audits.

## Best Practices

- Test coverage of 100% is not required, but it is encouraged.The more coverage, the more confidence in the code.
- Unit tests should be written for all state-changing functions, view functions, and modifiers. Using mocks and stubs is recommended for faster testing.
- Integration tests should be written for all functions interacting with other contracts and main use cases covering the user interactions with the smart contract. Should include tests for all possible failure scenarios.
- It is recommended to have complete testing coverage on the failure scenarios of your smart contracts. As a rule of thumb the failure scenarios should have more tests than the happy paths.
- Fuzz tests should be written for all functions that handle user funds. Fuzz tests should be run on a fork of mainnet to ensure the smart contract behaves as expected in a production environment with as many inputs and states.
- Invariant tests or property tests are recommended to document and write down the important invariants your smart contract should hold in all states and validate the contract handles as expected.
- A good CI pipeline is recommended to run all tests on every commit and pull request. This ensures the code is always tested and no new code is merged without passing all tests.

## General Resources

- [Testing Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/testing)
- [Writing Tests in Foundry](https://book.getfoundry.sh/forge/writing-tests)
- [Foundry cheat codes](https://book.getfoundry.sh/forge/cheatcodes)
- [Foundry Fork Testing](https://book.getfoundry.sh/forge/fork-testing)
- [Testing with ape framework](https://docs.apeworx.io/ape/stable/userguides/testing.html)

## Fuzzing and Invariant Test Resources

Links:

- [You’re Writing Require Statements Wrong](https://www.nascent.xyz/idea/youre-writing-require-statements-wrong)
- [Invariant Testing Solidity](https://www.rareskills.io/post/invariant-testing-solidity)
- [Exploiting Precision Loss via Fuzz Testing](https://dacian.me/exploiting-precision-loss-via-fuzz-testing)
- [Foundry Fuzzing](https://book.getfoundry.sh/forge/fuzz-testing)
- [Foundry Invariant Testing](https://book.getfoundry.sh/forge/invariant-testing)

Videos:

- [Intro to Fuzz and Invariant Testing](https://www.youtube.com/watch?v=juyY-CTolac&t=300s)
- [Invariant Testing Workshop](https://www.youtube.com/watch?v=YAF79t_Sfiw)
- [TOB Playlist on Echidna](https://www.youtube.com/watch?v=QofNQxW_K08&list=PLciHOL_J7Iwqdja9UH4ZzE8dP1IxtsBXI) (helps think about testing invariants and also fuzzing)
