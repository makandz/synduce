<h1 align="center">Synduce / 6 Devs 1 App</h1>

- [Product Details](#product-details)
  * [Q1: What are you planning to build?](#q1-what-are-you-planning-to-build)
  * [Q2: Who are your target users?](#q2-who-are-your-target-users)
  * [Q3: Why would your users choose your product? What are they using today to solve their problem/need?](#q3-why-would-your-users-choose-your-product-what-are-they-using-today-to-solve-their-problemneed)
  * [Q4: How will you build it?](#q4-how-will-you-build-it)
    + [Tech stack and testing](#tech-stack-and-testing)
    + [Deployment](#deployment)
  * [Q5: What are the user stories that make up the MVP?](#q5-what-are-the-user-stories-that-make-up-the-mvp)
    + [Story #1](#story-1)
    + [Story #2](#story-2)
    + [Story #3](#story-3)
    + [Story #4](#story-4)
    + [Story #5](#story-5)
- [Process Details](#process-details)
  * [Q6: What are the roles & responsibilities on the team?](#q6-what-are-the-roles--responsibilities-on-the-team)
  * [Q7: What operational events will you have as a team?](#q7-what-operational-events-will-you-have-as-a-team)
    + [First Meeting Minutes](#first-meeting-minutes)
    + [Second Meeting Minutes](#second-meeting-minutes)
- [Q8: What artifacts will you use to self-organize?](#q8-what-artifacts-will-you-use-to-self-organize)
- [Q9: What are the rules regarding how your team works?](#q9-what-are-the-rules-regarding-how-your-team-works)
  * [Communications](#communications)
  * [Meetings](#meetings)
  * [Conflict Resolution](#conflict-resolution)
    + [Scenario 1: Indecision](#scenario-1-indecision)
    + [Scenario 2: Non-responsiveness](#scenario-2-non-responsiveness)
    + [Scenario 3: Failure to Complete Features](#scenario-3-failure-to-complete-features)
- [Highlights](#highlights)
- [Intellectual Property Confidentiality Agreement](#intellectual-property-confidentiality-agreement)

## Product Details
### Q1: What are you planning to build?
We will be building a web-based wrapper around Synduce, an automatic recursive function transformer. This will take the form of an online code editor that users can use to write code and send to Synduce, which will then return synthesized code completions and other diagnostic information. Diagnostic information from Synduce will be displayed in a more readable and intuitive format. The application will also feature user logins and the ability to store scripts and logs in the cloud and access them from any machine.


### Q2: Who are your target users?
Our main target users are researchers/graduate students that are currently working with Synduce or are looking to work with it in the future. However, our application will also be open to other types of users, such as hobbyists exploring the domain and others who would like to learn more about Synduce’s capabilities.


### Q3: Why would your users choose your product? What are they using today to solve their problem/need?
Currently, the Software Engineering Lab at UofT currently does not provide pre-built binaries for Synduce; hence, users wishing to utilize its capabilities must download the source, manually build it, and then use it via a command-line interface. Such a workflow is very inconvenient for users who simply want quick access to Synduce.
Our application will solve this issue by providing a simple and easy-to-access interface to users, making it simple for users to work and keep up-to-date with the latest version of Sundyce. In addition, our application will also offer extra convenience features, such as the ability to store their scripts in the cloud and access them from any machine, much more readable diagnostics and debug information, etc. Users would choose our product because of this simplicity and convenience.It makes Synduce far more accessible to those less familiar with manual building and related technologies.


### Q4: How will you build it?
#### Tech stack and testing
We have a number of technologies that we are considering for this application. Currently, we have decided to experiment with two approaches:
1. A full-stack app with our own full-fledged backend, deployed to a suitable cloud provider like Heroku. We have shortlisted the following:
    * Frontend: React
    * Backend: The Python-based FastAPI
    * Database: AWS DynamoDB or MongoDB
    * Storage: Direct storage inside MongoDB if file sizes are small enough, or AWS S3
    * Testing: pytest with FastAPI for backend unit testing and Selenium with an appropriate language for frontend testing
    * CI/CD: GitHub Actions
2. A serverless static site utilizing AWS Lambdas or similar technology from other cloud providers. We have shortlisted the following: 
    * Frontend: React on AWS Amplify
    * Backend: AWS Lambda or a related higher-level services from AWS will be used as the ‘backend’
    * Database: AWS DynamoDB or MongoDB
    * Storage: Direct storage inside MongoDB if file sizes are small enough, or AWS S3
    * Testing: pytest with FastAPI for backend unit testing and Selenium with an appropriate language for frontend testing
    * CI/CD: GitHub Actions or a similar AWS service depending on ease of integration.

The aforementioned components will be used as follows:
* The frontend will provide a user interface to the user. This will center around a code editor with syntax highlighting, etc., an output box, and a tab for diagnostic information. Different views and modals will allow the user to register for an account, login, manage their account, and view and manage their cloud scripts.
* The backend will handle running the Synduce binary on the user’s code and sending Synduce’s output back to the frontend.
* The database will be used to store authentication details, user information, and any other relevant information.
* The storage will store the user’s cloud scripts and logs.

![image](https://user-images.githubusercontent.com/25436568/136577819-6c007eec-1ebd-472f-8898-19b8b817e958.png)
<p align=center><em>Tech Stack #1</em></p>

![image](https://user-images.githubusercontent.com/25436568/136577996-90701945-1fd9-4acc-a78d-114aa9efd9fb.png)
<p align=center><em>Tech Stack #2</em></p>

#### Deployment
For deployment, we are considering the following options:
1. A standard frontend and backend deployment on a service like Heroku.
2. A serverless backend and static frontend deployment on AWS.
3. A fully managed deployment on the CSLabs compute and login servers.

Tech stack #1 will be used with options 1 and 3, while stack #2 will be used with option 2.


### Q5: What are the user stories that make up the MVP?
#### Story #1
<p align=center><b><em>As a researcher, I want to remotely run Synduce on my OCaml scripts in order to get synthesized code completions.</em></b></p>

*Acceptance criteria*:
* Available code editor that OCaml script can be written into.
* Run button that sends OCaml scripts to be analyzed by Synduce.
* Console output component to visualize the output returned from Synduce. Displays basic output.
* Console output component to visualize the advanced log output.

#### Story #2
<p align=center><b><em>As a researcher, I want to visualize log outputs in an intuitive manner in order to better understand Synduce’s output.</em></b></p>

*Acceptance Criteria*:
* Given the input from the user, the output from Synduce’s synthesis is displayed in a intuitive manner 

#### Story #3
<p align=center><b><em>As a general user I want to sign up and signin in order to access a personalized Synduce experience including personal files.</em></b></p>

*Acceptance criteria*:
* Given an account registration page, a user can sign up for an account, which then redirects them to their homepage.

#### Story #4
<p align=center><b><em>As an account owner I want to be able view all my saved files in order to manage, delete or upload them.</em></b></p>

*Acceptance criteria*: 
* Given a work management page, the users can view their saved files and then manipulate them to their liking

#### Story #5
<p align=center><b><em>As an account owner I want to be able to view my profile information to be able to update passwords, usernames, etc.</em></b></p>

*Acceptance criteria*:
* Given an account management page, the user can see their entire profile and update their personal information


## Process Details
### Q6: What are the roles & responsibilities on the team?
* **Aarya Patel**: I will be working on the frontend as well as helping in configuring cloud based services (AWS most likely) with our application. I will aid in creating the UI, help setup databases to store user information and utilize S3 buckets to store user code/log files.
* **Asadullah Ahmed**: Will work on the backend. Specifically will work on routing Synduce synthesization requests, running them through workers, and sending back results. He will also work on sending log requests as we get them.
* **Daniel Saunders**: I will be working on backend, infrastructure, and aiding in Frontend if needed. I will predominantly work on enabling Oauth and user registration. For infrastructure I will build out logging interactions of our jobs and endpoints.
* **Makan Dehizadeh**: Frontend.
* **Steven Ung**: Will be playing a more flexible role. Starting off by working on backend and databases, then transitioning to other parts as required.
* **Vedang Ashwin Naik**: I will work on the DevOps, testing, database and backend components, in that order of priority. In the initial phases, I will concentrate on exploring a static-page, serverless architecture for the app.

### Q7: What operational events will you have as a team?
We are planning to communicate mostly over Discord. We have set up a private Discord server for this purpose. All team members are very active on the platform and usually reply within 15-30 minutes. Our partners are also on this server, and can be consulted at any time.

We have decided to meet our partners “face-to-face” on Zoom every other Friday at 6 PM or Tuesday at 6 PM. These meetings will be used to demonstrate our progress, discuss changes to the project’s scope, clarify questions about functionality, etc. 

If there is any reason to meet this way outside these times, we will use Discord to coordinate a Zoom meeting with our partners.

All team members share the same CSC301 lecture and tutorial slot (M6-8, M8-9), so it is very simple for the entire team to touch base regularly. Additionally many team members share other classes, so discussions will happen on an almost-daily basis.

#### First Meeting Minutes
In our first meeting with our partner we clarified the current scope of the project (as described in the previous questions). We discussed the purpose and key elements of the application and built a mental model of what the application will look like. We also discussed further communication methods and agreed upon a schedule (as described above). This meeting lasted approximately 45 minutes.

#### Second Meeting Minutes
In our second meeting we went over a basic prototype of the web application and demonstrated key functionality. We verified that our current prototype does satisfy our partners’ interests. We also went over our user stories and clarified the different use cases for the application. One thing that we realized in the meeting was the possible long wait times for a complete Synduce synthesis. We went over our possible tech stacks with our partner. Some of the tools we may use are insufficient with free tier versions due to long computation times of synduce. We asked our partners to see if there are any solutions that the UofT labs can provide for us. Finally, we finalized a meeting schedule (Friday/Tuesday 6 PM).

## Q8: What artifacts will you use to self-organize?
We hold weekly meetings (likely in person before or after the Monday lecture) where we assign stories to members and discuss progress on stories. Weekly meetings will fit more inline with our schedules rather than daily standups since work throughout the week might be sparse. Throughout the week, we will use Discord to keep in touch and stay on track.
For organizational purposes we will be using [this Trello Board](https://trello.com/b/PyrsRJ3T/csc301-synduce-project) to manage and assign our stories. Trello will allow us to quickly identify features that are in the backlog, in development, in testing, have been released, etc. We will order tasks by using story/task points and prioritization markers such as urgent, critical, medium, high,  and low. The points and priority of the highest features will be the focus of each week’s meeting.

Team members will self-assign tasks based on their proficiency with the technologies involved. As the term progresses, members will communicate to pick up slack and/or drop work depending on their individual course load and schedules. Members will be responsible for updating the Trello board with their progress and task status in a timely manner, as well as keeping the rest of the team up-to-date via Discord.

![image](https://user-images.githubusercontent.com/25436568/136580020-e4595953-3309-4ef0-b42a-a914bb7d23ad.png)
<p align=center><em>Our Trello Board</em></p>

## Q9: What are the rules regarding how your team works?
### Communications
As mentioned before, we will mainly use Discord to communicate. Communication frequency will be at least daily, and potentially multiple times a day. Our partners can also communicate via Discord.

### Meetings
Barring exceptional circumstances, everyone is expected to attend the weekly meeting and keep in touch on Discord. If someone knows they cannot attend a meeting, they must inform the others at least 6 hours prior.

If a member does not attend meetings or contribute regularly, a meeting will be held to determine the cause of this and potential solutions. If a compromise cannot be had, the situation will be brought up with our TA.

For each meeting, a SCRUM master will rotate through all members to ensure that each member has a turn moderating the meeting.

### Conflict Resolution
#### Scenario 1: Indecision
A member has pushed a feature to the dev branch and is asking for a review. Another member responds with criticism. This leads to a possibly subjective argument (i.e. a “flame war”) of which approach is better.

*Resolution*: Other team members will be asked to give their perspectives. If the author is still steadfast in their claims, a compromise will attempt to be reached which is most in line with the application’s goals while still remaining respectful to everyone’s opinions

#### Scenario 2: Non-responsiveness
A member has been missing from meetings and/or not responding to online communication.

*Resolution*: Attempts will be made to try and catch the offender in-person. If any provided justification is judged to not be sufficient, a warning will be issued. If the member continues to behave in such a manner after this warning, the matter will be escalated to the TA.

#### Scenario 3: Failure to Complete Features
A member has not been keeping up with their work. This is causing backlogs and possibly blocking other members from completing their tasks.

*Resolution*: Based on the member’s tasks and their role, those most directly affected by the lack of the feature will attempt to talk in-person with them to sort the matter out. If no suitable reason is given, and/or the tardiness continues for a significant period beyond this meeting, the matter will be escalated to the TA.

## Highlights
The first key decision we made with our partners was the scope of the project. Our partners are extremely flexible in terms of the finished product they expect from us. During our meetings, we discussed the base requirements:  browser-based code editor, a backend that runs Synduce on a user’s code, and the history of a user’s runs. We also suggested a few extra convenience features such as cloud saves and shareable code links that we could add to improve the user experience while still keeping the scope manageable. Our partners received these positively, but reiterated that they were not mandatory whatsoever. Thus, we decided to first focus on building a MVP with only the basic requirements. If time permits, we will then add the extra features.

Our next few decisions regarded the actual deployment of the application. We discussed three approaches with our partners, detailed in Q4. Our reasonings for these are below:
1. Heroku: Heroku is easy to use, has many free add-ons like databases, message queues, etc. which makes it an attractive choice for a backend-heavy application like ours. However, its free tier is not the most generous.
2. AWS: A serverless backend with AWS is attractive because AWS automatically handles scaling, isolation of running instances, and much more, while having a much more generous free tier. Also, other AWS services for authentication, databases, etc. play well with each other. However, AWS is difficult to learn and configure correctly.
3. CSLabs: A deployment on CSLabs gives our partners the most control over the application, since they have direct access to these machines. They are also completely free to use due to our partner’s affiliation with them. However, setting up a backend with proper security, isolation of instances, etc. will be very difficult as there is no framework for this.

After debating the pros and cons of these approaches, we decided to keep all three options open. We then tentatively decided what tech stacks to use based on what these deployment options accept. Our two tech stacks are detailed in Q4 as well. Our justification for choosing them are below:
1. Standard full-stack app: We were unanimous about most components like the frontend, database, etc. due to shared experience. We only had contention regarding the choice of FastAPI over Express. We opted to choose FastAPI for our backend over Express.js despite most of our members knowing Express, because FastAPI leverages the simpler nature of Python syntax while still offering sophisticated features in its framework. Documentation is a vital component of any project; unlike Express, FastAPI automatically generates OpenAPI schemas for all endpoints, which makes it much easier for users to explore the API. Additionally, request/response validation with FastAPI is extremely intuitive, with in-built readable type annotations. However, with Express, another library would be required to do so. For our final hand-off, we believe that FastAPI would be a great option as it is quite easy to set up and deploy.
2. AWS: Since AWS services such as Lambda, Cognito, etc. all play well with each other, we decided to go with mostly AWS services for as many components as possible.

## Intellectual Property Confidentiality Agreement
After discussion with our partner, we have agreed upon Option 2:
<p align=center><em>You can upload the code to GitHub or other similar publicly available domains.</em></p>

Specifically, this will take the form of a MIT License, the same license under which Synduce is distributed at the time of writing. Enclosed below is a copy of the MIT License:

> MIT License 
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
