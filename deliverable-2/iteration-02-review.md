# Synduce / 6 Devs 1 App

## Iteration 02 - Review & Retrospect

 * When: Friday, Oct 29
 * Where: Over Zoom

## Process - Reflection


#### Q1. Decisions that turned out well

One process-related decision that turned out quite well was how we decided to separate the work between the 6 members of the team. We were able to divide the group into subgroups of backend and frontend developers. Within each group, we divided the work into different features of the application. Keeping in mind a modular approach to the application, we were able to smoothly develop an MVP without any serious conflicts. 

Related to this, having a specific person to do DevOps was also a great decision again keeping this modular and de-coupled development system so that no one has to worry about the entire application and only perfecting their portion of the work. 

Our decision to have a Discord server as a communication platform was vital. We were able to quickly and easily have a conversation with our partners and each other if we needed to. We could quickly set up a meeting if we needed to have a more involved conversation. If something was going wrong we could have a quick conversaton with them to see if we can find a solution. Any important but short changes to the project that should be notified to our partners was also easily done with Discord. Finally, if there were any links or other artifacts that we would like to share, that could also be done easily through Discord. 

#### Q2. Decisions that did not turn out as well as we hoped

Even though we did have a pretty good idea of who was doing what, or more specifically what the different features of the application should be, sometimes we didn't actually follow through with separating the tasks between the team members. Multiple people would be working on the same feature which then slowed down development of other parts of the application. 

Another related issue was that the different tasks themselves were not distributed chronologically. That is certain features required another feature to be completed before the new one could start to be worked on properly. This slightly backlogged development and could have been made smoother.

#### Q3. Planned changes

What we plan on having is a more concrete Git workflow. We would like to separate the development work on a dev branch and the deployed product would be on the main branch. Then on top of this have multiple branches for each specific feature and so on. This makes it easier to revert changes and to separate further parts of the application that are already working to parts that still need to be completed or fixed. Our GitHub Actions jobs are quite heavy on time, so this more disciplined approach would allow us to use a fully automated dispatch without worrying about wasting minutes.

## Product - Review

#### Q4. How was your product demo?

The preparation for the demo involved making sure the application and the features we had decided to complete for this iteration were complete and actually working. Then we just followed the basic steps to start up and use the application and provided a basic overview of what is working and what is to come.

We were able to demo how to access the application, logging in, and registering for an account. Next we showed them how to open up the code editor and execute Synduce.

For the most part our partner was happy with the current state of the application as the main feature (being executing Synduce over the web), was functional. The home page look and feel was also well-received.

There were a few changes that they would like to see added. Firstly, Synduce actually has certain options that can be used in the command line. They would like to be able to select these options as well. Secondly, Synduce prints output to the console occasionally over the course of program execution. They would like to have the log output be displayed on the website in the same fashion, continuosly over the course of execution, rather than all th output bundled into one complete log at the end of execution.

What we learned from this demo was that the functionality for a product like this is more important then the looks. Having the ability to see the output continuosly and selecting the options were some things that they would like to see. However having a good looking product is appreciated simply due to it being more appealing to use in general. 
