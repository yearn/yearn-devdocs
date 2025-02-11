# Decision-Making Processes

## Types of Decisions


There are two key dimensions of decision-making at yearn: on- or off-chain; gated or un-gated.

-   On-chain decisions are executed via transactions on the blockchain.
-   Off-chain decisions are executed in various ways off of the blockchain.
-   Gated decisions require specific permissions.
-   Un-gated decisions can be made by anyone, they are permissionless.

Here are some examples for the four categories of decisions that emerge from this space:

|    |on-chain|off-chain|
|----|--------|---------|
|gated|add a strategy to a vault|merge a pr|
||transfer money from the treasury|decide on a logo|
||mint YFI|add someone to telegram|
|ungated|fork our protocol|submit a pr|
||execute a signed multisig tx|write a new docs page|
||create a new vault|propose a YIP|

[Gov 2.0](https://gov.yearn.fi/t/yip-61-governance-2-0) clarifies who holds decision-making power for our most critical kinds of decisions: on-chain gated decisions. But what about the other kinds? Who decides how off-chain gated decisions are made? Are there any guidelines for un-gated decisions or are they totally open? The rest of this document aims to clarify these questions.

## Gated Decisions

### On-Chain

All possible gated on-chain decisions are organized by Gov 2.0 into discrete and transferable objects called 'Decision-Making Powers' or just 'powers' for short. These powers are objects --- abstractions just above the specific transactions that embody the actual decisions. As we use this new system, we can decide to make these objects more or less granular. Currently YFI holders have the 'Manage Powers' decision-making power, so changes to each power is decided via YFI vote. But, YFI holders could vote to delegate the 'Manage Powers' power, or a subset of it, to a yTeam in the future.

### Off-Chain

Currently gated off-chain decision-making powers are held by various members of the yearn core team and there is no overarching process defined to organize them. Here is an incomplete list of domains with off-chain gates to be organized in the future:

-   yearn twitter account admin
-   various yearn frontend admin
-   url ownership
-   github admin
-   docs admin
-   telegram group admin
-   discord admin
-   forum admin
-   design decisions
-   strategic decisions
-   naming & branding decisions

## Un-Gated Decisions

We can think about all kinds of un-gated decisions using the same organizing logic. This is the largest decision-making space at yearn, or in any organization. Every decision from how to describe your role at yearn in your twitter bio, to what kinds of jokes are appropriate in a team chat, to whether or not it's ok to get paid for external work falls into this category.

As we mature, some gated processes may colonize this open space, but also the opposite is possible---breaking superfluous locks and becoming ever more permissionless. In either case, healthy, creative coordination requires shared values and unambiguous processes.

In accordance with a shared desire for minimal viable structure, there is a very simple process we can use to empower each contributor to be self sovereign agents of yearn, making decisions for the benefit of yearn at their own discretion. It's called The **Advice Process**.

## The Advice Process


The advice process empowers people to make good decisions without bureaucracy.

> It comes in many forms, but the essence is consistent: any person can make any decision after seeking advice from 1) everyone who will be meaningfully affected, and 2) people with expertise in the matter.\
>\
> Advice received must be taken into consideration. The point is not to create a watered-down compromise that accommodates everybody's wishes. It is about accessing collective wisdom in pursuit of a sound decision. With all the advice and perspectives the decision maker has received, they choose what they believe to be the best course of action. [[RO Wiki](https://reinventingorganizationswiki.com/theory/decision-making/)]

For anything that doesn't already have a clearly defined decision-making process, use the advice process. If you are unsure about any decision, use the advice process.

Here are some examples of how to use the advice process at yearn:

## A Personal Opportunity


### The Decision

-   GQ asks Klim to model for them.
-   They will pay him and it will take roughly 10% of his time.
-   He thinks he wants to accept it, but since it would have an impact on the team, he has to use the advice process before deciding.

### Advice Process

0) Get Input (optional)

Klim talks to a few colleagues informally to get their input, they suggest he accept the offer with some limitations: he can only become a pro model for GQ as long as it doesn't cause conflict with his coworkers at yearn, and as long as GQ doesn't launch a competing yield aggregator

1) Write a Proposal

Taking this advice, Klim writes up a short proposal for exactly what he wants to do: some side modeling. It is only a couple paragraphs and explains the impact it would have and the limitations he places on it.

2) Get Advice

He shares the proposal in a the Yearn telegram group(s) with those who would be most impacted by his decision and asks their advice.

3) Make a Decision

Most of the advice is "go for it!" but after more reflection, Klim finds he doesn't care about sharing his chiseled abs with the world, he just wants to build the future of France, so he decides to decline the offer. Klim can make any decision he wants and he does not have to take any of the advice --- the only rule is that he goes through this process before deciding.

4) Share the Decision

Klim explains why he decided against side modeling to close the loop. All is well in the world.

## New Yearn Site


### The Decision

-   Daniel wants to create a new yearn-official site for baby animal content.

### Advice Process

1) Write a Proposal

Daniel writes up his plan for yearnimals.com. Although anyone can make a new site, he wants this to be yearn-official and there isn't a process or gate for doing that with new sites, so he uses the advice process.

2) Get Advice

He shares his proposal in the Yearn telegram group(s) with those who would be most impacted by his decision for advice. People don't like the idea, most tell him not to do it.

3) Make a Decision

Despite the advice, he decides to go ahead and do it.

4) Share the Decision

He makes the site and shares internally, and now it's yearn-official.

5) Conflict Resolution (optional)

Daniel's decision causes some conflict inside yearn. There has been no process to decide what is yearn-official in the off-chain space, so Daniel had the power to use the advice process and make a decision on it. No one is questioning that, but Philbert is strongly against the new site being yearn-official so he decides to start the conflict resolution process with Daniel about this decision.

During the process (described below), Daniel and Philbert talk it through and together decide to update the site to add yWaifu content, which was the main cause of Philbert's tension. And through talking, they came up with a proposal for a new gate on deciding what's yearn-official off-chain. They do the advice process on it and then implement it.

## The Conflict Resolution Process


If you make a controversial decision, then it could cause conflict. Great, then use the conflict resolution process.

> Conflict resolution is a vital piece of the system in a Teal organization. If there is no boss to act as a conflict meditator, then a new process to handle conflict is required. In a Teal organization, conflict resolution is based on peer relationships. Without this approach, the organization would find it very difficult, if not impossible, to function. [[RO Wiki](https://reinventingorganizationswiki.com/theory/conflict-resolution/)]

This process trusts in the basic goodness and wisdom of every person at yearn. It is compassionate and realistic: we all make mistakes and that's ok. What's incredible about it is how much it can empower people to act, and how much it motivates people to take responsibility for themselves and the group. When you know it's ok to make mistakes and there is a trusted and healthy process for resolving tensions and conflict, it's much easier to make decisions fluidly and get shit done.

The conflict resolution process has 3 phases:

1.  In the first phase, the two people sit together and try to sort it out privately.
1.  If they can't find a solution agreeable to both, they nominate a colleague they both trust to act as a mediator. The mediator doesn't impose a decision. Rather he or she supports the participants in coming to their own solution.
1.  If mediation fails, a panel of topic-relevant colleagues is convened. Again the panel does not impose a solution.

If no resolution is found after these three phases, the two people may call in a senior contributor they both trust to the panel to add moral weight (but again, not to impose a solution). And in the exceedingly rare case that this final step be insufficient, other yearn organs may need to get involved, such as yPeople or yOps.
